import { OtodomDistrictStat } from "@/services/api/models";

const fmt = (v: number) => (v ?? 0).toLocaleString("pl-PL");

const linReg = (xs: number[], ys: number[]) => {
    const n = xs.length;
    if (n < 2) {
        const meanY = ys.reduce((s, y) => s + y, 0) / (n || 1);
        return { m: 0, b: meanY, rmse: 0 };
    }
    let sx = 0, sy = 0, sxy = 0, sxx = 0;
    for (let i = 0; i < n; i++) { const x = xs[i], y = ys[i]; sx += x; sy += y; sxy += x * y; sxx += x * x; }
    const denom = n * sxx - sx * sx;
    if (denom === 0) {
        const meanY = sy / n;
        const rmse = Math.sqrt(ys.reduce((s, y) => s + (y - meanY) ** 2, 0) / n);
        return { m: 0, b: meanY, rmse };
    }
    const m = (n * sxy - sx * sy) / denom;
    const b = (sy - m * sx) / n;
    const yhat = xs.map(x => m * x + b);
    const rmse = Math.sqrt(ys.reduce((s, y, i) => s + (y - yhat[i]) ** 2, 0) / n);
    return { m, b, rmse };
}

export const newnessOption = (
    rows: OtodomDistrictStat[],
    opts?: { residRange?: [number, number] }
) => {
    const xs = rows.map(r => r.averageBuildingBuiltYear);
    const ys = rows.map(r => r.averagePricePerSqm);
    const { m, b, rmse } = linReg(xs, ys);

    const points = rows.map(r => {
        const yhat = m * r.averageBuildingBuiltYear + b;
        const resid = r.averagePricePerSqm - yhat;
        return { year: r.averageBuildingBuiltYear, price: r.averagePricePerSqm, resid, district: r.district };
    });

    const rMin = Math.min(...points.map(p => p.resid));
    const rMax = Math.max(...points.map(p => p.resid));
    const [vmMin, vmMax] = opts?.residRange ?? [rMin, rMax];

    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const line = [[xMin, m * xMin + b], [xMax, m * xMax + b]];
    const up = [[xMin, m * xMin + b + rmse], [xMax, m * xMax + b + rmse]];
    const down = [[xMin, m * xMin + b - rmse], [xMax, m * xMax + b - rmse]];

    return {
        dataset: [{
            dimensions: ["year", "price", "resid", "district"],
            source: points
        }],

        tooltip: {
            trigger: "item",
            formatter: (p: any) => {
                if (p.seriesType === "line") {
                    return `y = ${m.toFixed(2)}x + ${b.toFixed(0)} (±RMSE: ${fmt(rmse)})`;
                }
                const v = Array.isArray(p?.value) ? p.value : (p?.data ?? {});
                const year = Array.isArray(v) ? v[0] : v.year;
                const price = Array.isArray(v) ? v[1] : v.price;
                const resid = Array.isArray(v) ? v[2] : v.resid;
                const name = p.name ?? v.district ?? "";

                const tag = (resid ?? 0) < 0 ? "poniżej linii (bardziej opłacalne)" : "powyżej linii (mniej opłacalne)";
                return `<b>${name}</b><br/>Rok: ${year}<br/>Cena/m²: ${fmt(price)} PLN<br/>Residuum: ${fmt(resid)} – ${tag}`;
            }
        },

        toolbox: { feature: { dataZoom: {}, restore: {}, saveAsImage: {} } },
        brush: { toolbox: ["rect", "polygon", "keep", "clear"], xAxisIndex: 0, yAxisIndex: 0 },

        grid: { left: 80, right: 20, top: 30, bottom: 64, containLabel: true },

        visualMap: {
            type: "continuous",
            seriesIndex: 0,
            dimension: "resid",
            min: vmMin,
            max: vmMax,
            text: ["lepiej", "gorzej"],     // spójnie z DF
            calculable: true,
            realtime: true,
            inRange: { colorAlpha: 1 },
            outOfRange: { colorAlpha: 0.18 },
            left: 0                         
        },

        xAxis: {
            name: "Śr. rok budowy",
            type: "value",
            nameLocation: "middle",
            nameGap: 30
        },
        yAxis: {
            name: "Cena (PLN/m²)",
            type: "value",
            axisLabel: { formatter: (v: number) => fmt(v) }
        },

        series: [
            {
                type: "scatter",
                encode: { x: "year", y: "price", itemName: "district", tooltip: ["year", "price", "resid"] },
                symbolSize: 14,
                emphasis: { focus: "series" }
            },
            { type: "line", name: "Regresja", data: line, showSymbol: false, silent: true },
            { type: "line", name: "+RMSE", data: up, showSymbol: false, lineStyle: { type: "dashed" }, silent: true },
            { type: "line", name: "-RMSE", data: down, showSymbol: false, lineStyle: { type: "dashed" }, silent: true }
        ]
    };
};

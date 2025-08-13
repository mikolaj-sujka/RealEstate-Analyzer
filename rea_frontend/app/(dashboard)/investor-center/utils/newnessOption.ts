// utils/options/getNewnessPremiumProOption.ts
type Row = {
    district: string;
    averagePricePerSqm: number;
    averageBuildingBuiltYear: number;
};

const fmt = (v: number) => (v ?? 0).toLocaleString("pl-PL");

function linReg(xs: number[], ys: number[]) {
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

export function newnessOption(
    rows: Row[],
    opts?: { residRange?: [number, number] } // (opcjonalnie) preselect zakresu slidera
) {
    const xs = rows.map(r => r.averageBuildingBuiltYear);
    const ys = rows.map(r => r.averagePricePerSqm);
    const { m, b, rmse } = linReg(xs, ys);

    const points = rows.map(r => {
        const yhat = m * r.averageBuildingBuiltYear + b;
        const resid = r.averagePricePerSqm - yhat; // <0 = bardziej opłacalne
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
            // KLUCZ: jawne wymiary + encode po NAZWACH
            dimensions: ["year", "price", "resid", "district"],
            source: points
        }],

        tooltip: {
            trigger: "item",
            formatter: (p: any) => {
                if (p.seriesType === "line") {
                    return `y = ${m.toFixed(2)}x + ${b.toFixed(0)} (±RMSE: ${fmt(rmse)})`;
                }
                // BEZPIECZNY ODCZYT: z params.value (tablica) ALBO z params.data (obiekt)
                const v = p.value;
                const d = p.data;
                const year = Array.isArray(v) ? v[0] : (v?.year ?? d?.year);
                const price = Array.isArray(v) ? v[1] : (v?.price ?? d?.price);
                const resid = Array.isArray(v) ? v[2] : (v?.resid ?? d?.resid);
                const name = p.name ?? d?.district ?? "";

                const tag = (resid ?? 0) < 0 ? "poniżej linii (bardziej opłacalne)" : "powyżej linii (mniej opłacalne)";
                return `<b>${name}</b><br/>Rok: ${year}<br/>Cena/m²: ${fmt(price)} PLN<br/>Residuum: ${fmt(resid)} – ${tag}`;
            }
        },

        toolbox: { feature: { saveAsImage: {}, restore: {} } },
        brush: { toolbox: ["rect", "polygon", "keep", "clear"], xAxisIndex: 0, yAxisIndex: 0 },

        grid: { left: 60, right: 24, top: 30, bottom: 54 },

        // Slider „bardziej ↔ mniej opłacalne” po residuum (taki sam UX jak w Deal Finder)
        visualMap: {
            type: "continuous",
            seriesIndex: 0,
            dimension: "resid",
            min: rMin,
            max: rMax,
            // Uwaga: część wersji nie respektuje initial range w opcji.
            // Jeśli chcesz preset (np. tylko resid < 0), ustawisz go później przez dispatchAction('selectDataRange').
            calculable: true,
            realtime: true,
            inRange: { colorAlpha: 1 },
            outOfRange: { colorAlpha: 0.18 }
        },

        xAxis: { name: "Śr. rok budowy", type: "value" },
        yAxis: { name: "Cena (PLN/m²)", type: "value", axisLabel: { formatter: (v: number) => fmt(v) } },

        // BEZ dataZoom (tak jak prosiłeś)
        series: [
            { type: "scatter", encode: { x: "year", y: "price", itemName: "district", tooltip: ["year", "price", "resid"] }, symbolSize: 14 },
            { type: "line", name: "Regresja", data: line, showSymbol: false, silent: true },
            { type: "line", name: "+RMSE", data: up, showSymbol: false, lineStyle: { type: "dashed" }, silent: true },
            { type: "line", name: "-RMSE", data: down, showSymbol: false, lineStyle: { type: "dashed" }, silent: true }
        ]
    };
}

import { OtodomDistrictStat } from "@/services/api/models";
import { linearRegression, regressionLine } from "@/utils/regression";
import { quantiles, fmt } from "@/utils/stats";

export function getDealFinderOption(rows: OtodomDistrictStat[]) {
    const data = rows.map(r => [r.averagePricePerSqm, r.averageFlatSize, r.totalBuildingOffers, r.district]);

    const size = (offers: number) => {
        // łagodne skalowanie bąbla — sqrt i ograniczenia
        const s = Math.sqrt(Math.max(offers, 1));
        return Math.max(10, Math.min(42, s * 3.2));
    };

    return {
        tooltip: {
            trigger: "item",
            formatter: (p: any) => {
                const [x, y, offers, name] = p.data;
                return `
          <b>${name}</b><br/>
          Cena/m²: ${fmt(x)} PLN<br/>
          Śr. metraż: ${fmt(y)} m²<br/>
          Oferty: ${fmt(offers)}
        `;
            }
        },
        grid: { left: 60, right: 30, top: 30, bottom: 50 },
        xAxis: {
            name: "Cena (PLN/m²)",
            type: "value",
            axisLabel: { formatter: (v: number) => fmt(v) }
        },
        yAxis: {
            name: "Śr. metraż (m²)",
            type: "value",
            axisLabel: { formatter: (v: number) => fmt(v) }
        },
        series: [{
            type: "scatter",
            symbol: "circle",
            data,
            symbolSize: (val: any[]) => size(val[2]),
            emphasis: { focus: "series" }
        }]
    };
}

/** #2 Premia za nowość: X=rok budowy, Y=cena/m² + linia regresji */
export function getNewnessPremiumOption(rows: OtodomDistrictStat[]) {
    const pts = rows.map(r => [r.averageBuildingBuiltYear, r.averagePricePerSqm, r.district]);

    const xs = pts.map(p => p[0] as number);
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    const { m, b } = linearRegression(pts.map(p => [p[0] as number, p[1] as number]));
    const line = regressionLine(m, b, xMin, xMax);

    return {
        tooltip: {
            trigger: "item",
            formatter: (p: any) => {
                if (p.seriesType === "line") {
                    return `Linia regresji: y = ${m.toFixed(2)}x + ${b.toFixed(0)}`;
                }
                const [x, y, name] = p.data;
                return `
          <b>${name}</b><br/>
          Śr. rok budowy: ${fmt(x)}<br/>
          Cena/m²: ${fmt(y)} PLN
        `;
            }
        },
        grid: { left: 60, right: 30, top: 30, bottom: 50 },
        xAxis: { name: "Śr. rok budowy", type: "value" },
        yAxis: {
            name: "Cena (PLN/m²)",
            type: "value",
            axisLabel: { formatter: (v: number) => fmt(v) }
        },
        series: [
            {
                type: "scatter",
                data: pts.map(([x, y, label]) => [x, y, label]),
                symbolSize: 14
            },
            {
                type: "line",
                data: line,
                smooth: true,
                showSymbol: false,
                emphasis: { disabled: true }
            }
        ]
    };
}

/** #5 Rozkład ryzyka (boxplot) dla cen/m² w mieście, outliery jako scatter */
export function getRiskBoxplotOption(rows: OtodomDistrictStat[], cityName: string) {
    const prices = rows.map(r => r.averagePricePerSqm).sort((a, b) => a - b);
    const { q1, q2, q3, whiskerLow, whiskerHigh, outliers } = quantiles(prices);

    return {
        title: { left: "center" },
        tooltip: {
            trigger: "item",
            formatter: (p: any) => {
                if (p.seriesType === "scatter") return `Outlier: ${fmt(p.data[1])} PLN/m²`;
                const [low, q1v, med, q3v, high] = p.data;
                return `
          <b>${cityName}</b><br/>
          min: ${fmt(low)}<br/>
          Q1: ${fmt(q1v)}<br/>
          mediana: ${fmt(med)}<br/>
          Q3: ${fmt(q3v)}<br/>
          max: ${fmt(high)}
        `;
            }
        },
        grid: { left: 60, right: 30, top: 10, bottom: 40 },
        xAxis: { type: "category", data: [cityName] },
        yAxis: {
            name: "Cena (PLN/m²)",
            type: "value",
            axisLabel: { formatter: (v: number) => fmt(v) }
        },
        series: [
            {
                type: "boxplot",
                data: [[whiskerLow, q1, q2, q3, whiskerHigh]],
            },
            {
                type: "scatter",
                name: "Outliers",
                data: outliers.map(v => [0, v]), // kategoria 0 (jedno pudełko)
                symbolSize: 10,
                tooltip: { trigger: "item" }
            }
        ]
    };
}

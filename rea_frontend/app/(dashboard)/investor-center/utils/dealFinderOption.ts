// utils/options/getDealFinderProOption.ts

import { computeRisk, fmt, Row } from "@/utils/investorMath";

export function dealFinderProOption(rows: Row[]) {
    const risk = computeRisk(rows);
    const data = rows.map(r => ([
        r.averagePricePerSqm,     // dim 0 (X)
        r.averageFlatSize,        // dim 1 (Y)
        r.totalBuildingOffers,    // dim 2 (size)
        Number((1 - risk[r.district]).toFixed(3)), // dim 3 (kolor: im większe = lepiej)
        r.district                // dim 4 (label)
    ]));

    const size = (offers: number) => {
        const s = Math.sqrt(Math.max(offers, 1));
        return Math.max(10, Math.min(44, s * 3.2));
    };

    return {
        dataset: [{ source: data }],
        tooltip: {
            trigger: "item",
            formatter: (p: any) => {
                const [x, y, o, score, name] = p.data;
                return `<b>${name}</b><br/>Cena/m²: ${fmt(x)} PLN<br/>Śr. metraż: ${fmt(y)} m²<br/>Oferty: ${fmt(o)}<br/>Deal score: ${(score * 100 | 0)}/100`;
            }
        },
        toolbox: { feature: { dataZoom: {}, restore: {}, saveAsImage: {} } },
        brush: { toolbox: ['rect', 'polygon', 'keep', 'clear'], xAxisIndex: 0, yAxisIndex: 0 }, // interaktywna selekcja :contentReference[oaicite:5]{index=5}
        grid: { left: 60, right: 20, top: 30, bottom: 45 },
        visualMap: { // kolor wg dim 3 (score)
            type: "continuous",
            min: 0, max: 1, dimension: 3,
            text: ["lepiej", "gorzej"],
            calculable: true
        }, // visualMap mapuje wartości na kolor/rozmiar. :contentReference[oaicite:6]{index=6}
        xAxis: { name: "Cena (PLN/m²)", type: "value", axisLabel: { formatter: (v: number) => fmt(v) } },
        yAxis: { name: "Śr. metraż (m²)", type: "value", axisLabel: { formatter: (v: number) => fmt(v) } },
        series: [
            {
                type: "scatter",
                encode: { x: 0, y: 1 },
                symbolSize: (val: any[]) => size(val[2]),
                emphasis: { focus: "series" }
            },
            { // „strefa słodka” – markArea (przykład: taniej + większy metraż)
                type: "scatter",
                data: [],
                markArea: {
                    itemStyle: { opacity: 0.06 },
                    data: [[{ xAxis: 'min', yAxis: 60 }, { xAxis: 13000, yAxis: 'max' }]]
                }
            } // markArea: obszar na układzie współrzędnych. :contentReference[oaicite:7]{index=7}
        ]
    };
}

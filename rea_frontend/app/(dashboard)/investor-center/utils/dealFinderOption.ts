import { OtodomDistrictStat } from "@/services/api/models/types/otodom-listings";
import { fmt } from "@/utils";
import { computeRisk } from "@/utils/investorMath";

export const dealFinderProOption = (rows: OtodomDistrictStat[]) => {
    const risk = computeRisk(rows);
    const data = rows.map(r => ([
        r.averagePricePerSqm,
        r.averageFlatSize,
        r.totalBuildingOffers,
        Number((1 - risk[r.district]).toFixed(3)),
        r.district
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
                const v = Array.isArray(p?.value) ? p.value : (Array.isArray(p?.data) ? p.data : []);
                const [x, y, o, score, name] = v;
                return `<b>${name ?? ""}</b><br/>Cena/m²: ${fmt(x)} PLN<br/>Śr. metraż: ${fmt(y)} m²<br/>Oferty: ${fmt(o)}<br/>Deal score: ${(((score ?? 0) * 100) | 0)}/100`;
            }
        },
        toolbox: { feature: { dataZoom: {}, restore: {}, saveAsImage: {} } },
        brush: { toolbox: ['rect', 'polygon', 'keep', 'clear'], xAxisIndex: 0, yAxisIndex: 0 },
        grid: { left: 80, right: 20, top: 30, bottom: 64, containLabel: true }, // ⬅️ ważne
        visualMap: {
            type: "continuous",
            min: 0, max: 1, dimension: 3,
            text: ["lepiej", "gorzej"],
            calculable: true,
            left: 0
        },
        xAxis: {
            name: "Cena (PLN/m²)",
            type: "value",
            nameLocation: "middle",  
            nameGap: 36,             
            axisLabel: { formatter: (v: number) => fmt(v) }
        },
        yAxis: { name: "Śr. metraż (m²)", type: "value", axisLabel: { formatter: (v: number) => fmt(v) } },
        series: [
            {
                type: "scatter",
                encode: { x: 0, y: 1 },
                symbolSize: (val: any[]) => size(val[2]),
                emphasis: { focus: "series" }
            },
            {
                type: "scatter",
                data: [],
                markArea: {
                    itemStyle: { opacity: 0.06 },
                    data: [[{ xAxis: 'min', yAxis: 60 }, { xAxis: 13000, yAxis: 'max' }]]
                }
            }
        ]
    };
}

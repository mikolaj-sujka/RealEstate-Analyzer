import * as echarts from "echarts/core";

type Row = {
    district: string;
    averagePricePerSqm: number;
    averageFlatSize: number;
    totalBuildingOffers: number;
    averageBuildingBuiltYear: number;
};

function avgRisk01(rows: Row[]): number {
    if (!rows.length) return 0.5;
    const prices = rows.map(r => r.averagePricePerSqm);
    const offers = rows.map(r => r.totalBuildingOffers);
    const years = rows.map(r => r.averageBuildingBuiltYear);
    const [pMin, pMax] = [Math.min(...prices), Math.max(...prices)];
    const [oMin, oMax] = [Math.min(...offers), Math.max(...offers)];
    const [yMin, yMax] = [Math.min(...years), Math.max(...years)];
    const norm = (v: number, a: number, b: number) => b > a ? (v - a) / (b - a) : 0.5;

    const scores = rows.map(r =>
        0.5 * norm(r.averagePricePerSqm, pMin, pMax) +
        0.3 * (1 - norm(r.totalBuildingOffers, oMin, oMax)) +
        0.2 * (1 - norm(r.averageBuildingBuiltYear, yMin, yMax))
    );
    return Math.max(0, Math.min(1, scores.reduce((s, x) => s + x, 0) / rows.length));
}

export const riskGaugeOption = (rows: Row[], cityName: string) => {
    const value = Math.round(avgRisk01(rows) * 100); // 0..100

    const grad = new echarts.graphic.LinearGradient(0, 1, 1, 0, [
        { offset: 0.0, color: "#2ecc71" },
        { offset: 0.5, color: "#f1c40f" },
        { offset: 1.0, color: "#e74c3c" }
    ], true);

    return {
        tooltip: { formatter: `${cityName}<br/><b>Ryzyko: ${value}/100</b>` },
        series: [{
            type: "gauge",
            startAngle: 210,
            endAngle: -30,
            min: 0, max: 100,

            axisLine: {
                roundCap: true,
                lineStyle: { width: 14, color: [[1, "#EEF2F7"]] }
            },

            progress: {
                show: true,
                width: 14,
                roundCap: true,
                itemStyle: { color: grad }
            },

            pointer: {
                show: true,
                length: "62%",
                width: 5,
                itemStyle: { color: "#3b5bdb", shadowBlur: 6, shadowColor: "rgba(0,0,0,.12)" }
            },
            anchor: { show: true, size: 6, itemStyle: { color: "#3b5bdb" } },

            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },

            title: {
                show: true,
                offsetCenter: [0, "28%"],
                fontSize: 13,
                fontWeight: 600,
                color: "#667085",
                text: "Ryzyko"
            },
            detail: {
                offsetCenter: [0, "50%"],
                valueAnimation: true,
                formatter: (v: number) => `{b|${v}}{s|/100}`,
                rich: {
                    b: { fontSize: 36, fontWeight: 800, lineHeight: 40, color: "#101828" },
                    s: { fontSize: 14, fontWeight: 600, padding: [0, 0, 0, 4], color: "#667085" }
                }
            },
            data: [{ value }]
        }]
    };
}

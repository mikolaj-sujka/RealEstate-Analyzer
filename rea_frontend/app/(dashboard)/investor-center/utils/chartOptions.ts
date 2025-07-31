import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import {
  advancedMetricsData,
  cityTrendData,
  correlationData,
  riskAnalysisData,
} from "../models";

type CityTrendData = (typeof cityTrendData)[keyof typeof cityTrendData];
type AdvancedMetricsData =
  (typeof advancedMetricsData)[keyof typeof advancedMetricsData];
type RiskAnalysisData =
  (typeof riskAnalysisData)[keyof typeof riskAnalysisData];

export const getBasicTrendChartOption = (
  data: CityTrendData
): EChartsOption => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    textStyle: { color: "#374151" },
    axisPointer: { type: "cross", crossStyle: { color: "#999" } },
    formatter: (params: any) => {
      let tooltip = `${params[0].axisValue}<br/>`;
      params.forEach((p: any) => {
        tooltip += `${p.marker} ${
          p.seriesName
        }: <strong>${p.value.toLocaleString("pl-PL")}</strong><br/>`;
      });
      return tooltip;
    },
  },
  legend: {
    data: ["Ceny", "Transakcje", "Zapasy", "Indeks Popytu"],
    top: 10,
    textStyle: { color: "#6b7280" },
  },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    data: data.map((item) => item.month),
    axisLine: { lineStyle: { color: "#e5e7eb" } },
    axisLabel: { color: "#6b7280" },
  },
  yAxis: [
    {
      type: "value",
      name: "Ceny",
      position: "left",
      axisLine: { lineStyle: { color: "#3b82f6" } },
      axisLabel: { color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
    },
    {
      type: "value",
      name: "Liczba/Indeks",
      position: "right",
      axisLine: { lineStyle: { color: "#10b981" } },
      axisLabel: { color: "#6b7280" },
    },
  ],
  series: [
    {
      name: "Ceny",
      type: "line",
      yAxisIndex: 0,
      data: data.map((item) => item.avgPrice),
      smooth: true,
      lineStyle: { color: "#3b82f6", width: 3 },
      itemStyle: { color: "#3b82f6", borderWidth: 2, borderColor: "#fff" },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#3b82f620" },
          { offset: 1, color: "#3b82f605" },
        ]),
      },
      emphasis: {
        focus: "series",
        lineStyle: { width: 4 },
        itemStyle: { borderWidth: 3, shadowBlur: 10, shadowColor: "#3b82f6" },
      },
      animationDelay: 0,
      animationDuration: 1500,
    },
    {
      name: "Transakcje",
      type: "bar",
      yAxisIndex: 1,
      data: data.map((item) => item.listings),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#10b981" },
          { offset: 1, color: "#10b98180" },
        ]),
      },
      emphasis: {
        focus: "series",
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      animationDelay: (idx: number) => idx * 100,
      animationDuration: 1000,
    },
    {
      name: "Zapasy",
      type: "line",
      yAxisIndex: 1,
      data: data.map((item) => item.sales),
      smooth: true,
      lineStyle: { color: "#f59e0b", width: 2, type: "dashed" },
      itemStyle: { color: "#f59e0b" },
      emphasis: {
        focus: "series",
        lineStyle: { width: 3 },
        itemStyle: { borderWidth: 2, shadowBlur: 8, shadowColor: "#f59e0b" },
      },
      animationDelay: 300,
      animationDuration: 1200,
    },
    {
      name: "Indeks Popytu",
      type: "line",
      yAxisIndex: 1,
      data: data.map((item) => item.inventory),
      smooth: true,
      lineStyle: { color: "#8b5cf6", width: 2 },
      itemStyle: { color: "#8b5cf6" },
      emphasis: {
        focus: "series",
        lineStyle: { width: 3 },
        itemStyle: { borderWidth: 2, shadowBlur: 8, shadowColor: "#8b5cf6" },
      },
      animationDelay: 600,
      animationDuration: 1200,
    },
  ],
  animationEasing: "cubicOut",
});

export const getAdvancedMetricsChartOption = (
  data: AdvancedMetricsData
): EChartsOption => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    textStyle: { color: "#374151" },
    formatter: (params: any) => {
      let tooltip = `${params[0].axisValue}<br/>`;
      params.forEach((p: any) => {
        const unit = p.seriesName.includes("Czas")
          ? " dni"
          : p.seriesName.includes("ROI")
          ? "%"
          : p.seriesName.includes("Pustostany")
          ? "%"
          : "";
        tooltip += `${p.marker} ${p.seriesName}: <strong>${p.value}${unit}</strong><br/>`;
      });
      return tooltip;
    },
  },
  legend: {
    data: [
      "Wskaźnik Cena/Dochód",
      "Czas Sprzedaży",
      "ROI",
      "Aktywność Deweloperów",
    ],
    top: 10,
    textStyle: { color: "#6b7280" },
    type: "scroll",
  },
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    data: data.map((item) => item.month),
    axisLine: { lineStyle: { color: "#e5e7eb" } },
    axisLabel: { color: "#6b7280" },
  },
  yAxis: [
    {
      type: "value",
      name: "Wskaźniki",
      position: "left",
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
    },
    {
      type: "value",
      name: "Dni/Indeksy",
      position: "right",
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280" },
    },
  ],
  series: [
    {
      name: "Wskaźnik Cena/Dochód",
      type: "line",
      yAxisIndex: 0,
      data: data.map((item) => item.priceToIncome),
      smooth: true,
      lineStyle: { color: "#ef4444", width: 2 },
      itemStyle: { color: "#ef4444" },
    },
    {
      name: "Czas Sprzedaży",
      type: "line",
      yAxisIndex: 1,
      data: data.map((item) => item.avgSaleTime),
      smooth: true,
      lineStyle: { color: "#f59e0b", width: 2 },
      itemStyle: { color: "#f59e0b" },
    },
    {
      name: "ROI",
      type: "line",
      yAxisIndex: 0,
      data: data.map((item) => item.roi),
      smooth: true,
      lineStyle: { color: "#10b981", width: 2 },
      itemStyle: { color: "#10b981" },
    },
    {
      name: "Aktywność Deweloperów",
      type: "bar",
      yAxisIndex: 1,
      data: data.map((item) => item.devActivity),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#3b82f6" },
          { offset: 1, color: "#3b82f680" },
        ]),
      },
    },
  ],
  animationEasing: "cubicOut",
});

export const getRiskAnalysisChartOption = (
  data: RiskAnalysisData
): EChartsOption => ({
  backgroundColor: "transparent",
  series: [
    {
      type: "gauge",
      center: ["50%", "60%"],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      splitNumber: 10,
      itemStyle: {
        color: "#FFAB91",
      },
      progress: {
        show: true,
        width: 30,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 30,
        },
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: "#999",
        },
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: "#999",
        },
      },
      axisLabel: {
        distance: -20,
        color: "#999",
        fontSize: 14,
      },
      anchor: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        width: "60%",
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, "-15%"],
        fontSize: 24,
        fontWeight: "bolder",
        formatter: "{value}",
        color: "inherit",
      },
      data: [
        {
          value: data.riskScore,
        },
      ],
    },
  ],
});

export const getCorrelationChartOption = (): EChartsOption => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    textStyle: { color: "#374151" },
    formatter: (params: any) => {
      const data = correlationData[params[0].dataIndex];
      return `
        <strong>${data.metric}</strong><br/>
        Korelacja: <strong>${data.correlation.toFixed(2)}</strong><br/>
        Zmiana: <strong style="color: ${
          data.change.startsWith("+") ? "#10b981" : "#ef4444"
        }">${data.change}</strong>
      `;
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: correlationData.map((item) => item.metric),
    axisLine: { lineStyle: { color: "#e5e7eb" } },
    axisLabel: { color: "#6b7280", rotate: 45 },
  },
  yAxis: {
    type: "value",
    min: -1,
    max: 1,
    axisLine: { lineStyle: { color: "#e5e7eb" } },
    axisLabel: { color: "#6b7280" },
    splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
  },
  series: [
    {
      type: "bar",
      data: correlationData.map((item) => ({
        value: item.correlation,
        itemStyle: {
          color:
            item.correlation > 0
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#10b981" },
                  { offset: 1, color: "#10b98180" },
                ])
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ef4444" },
                  { offset: 1, color: "#ef444480" },
                ]),
        },
      })),
      barWidth: "60%",
      emphasis: {
        focus: "series",
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      animationDelay: (idx: number) => idx * 150,
      animationDuration: 1000,
    },
  ],
  animationEasing: "cubicOut",
});

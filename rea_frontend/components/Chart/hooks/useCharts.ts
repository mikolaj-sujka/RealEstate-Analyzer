import { useLayoutEffect } from "react";
import * as echarts from "echarts";
import type { SeriesOption } from "echarts";

export type ChartProps = {
  data: any[];
  height?: number;
  showPrediction?: boolean;
  accentColor?: string;
  secondaryColor?: string;
  showDetailedTooltip?: boolean;
  series?: SeriesOption[];
};

export const useEcharts = (
  ref: React.RefObject<HTMLDivElement | null>,
  {
    data,
    height = 300,
    showPrediction = false,
    accentColor = "#3b82f6",
    secondaryColor = "#818cf8",
    series,
    showDetailedTooltip = false,
  }: ChartProps
) => {
  useLayoutEffect(() => {
    if (!ref.current) return;

    // Ustawiamy wysokość kontenera
    ref.current.style.height = `${height}px`;

    const chart = echarts.init(ref.current);

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      grid: { left: "3%", right: "4%", bottom: "18%", containLabel: true },
      tooltip: showDetailedTooltip
        ? {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          textStyle: { color: "#374151" },
          axisPointer: { type: "cross", crossStyle: { color: "#999" } },
        }
        : { trigger: "axis" },
      legend: {
        show: true,
        data: (series || []).length
          ? series.map((s) => s.name as string)
          : ["Actual Price", ...(showPrediction ? ["Prediction"] : [])],
        top: "5%",
        left: "center",
        textStyle: { color: "#6b7280" },
        itemGap: 20,
      },
      dataZoom: [
        { type: "inside", zoomOnMouseWheel: true, throttle: 50 },
        {
          type: "slider",
          bottom: "8%",
          height: 20,
          handleSize: "80%",
          handleStyle: { borderColor: "#888" },
        },
      ],
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => item.month),
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
        splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
      },
      series:
        series && series.length
          ? series
          : [
            {
              name: "Actual Price",
              type: "line",
              data: data.map((item) => item.price),
              smooth: true,
              lineStyle: { color: accentColor, width: 3 },
              itemStyle: {
                color: accentColor,
                borderWidth: 2,
                borderColor: "#fff",
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: `${accentColor}20` },
                  { offset: 1, color: `${accentColor}05` },
                ]),
              },
              emphasis: { focus: "series" },
            },
            ...(showPrediction
              ? [
                {
                  name: "Prediction",
                  type: "line",
                  data: data.map((item) => item.prediction),
                  smooth: true,
                  lineStyle: {
                    color: secondaryColor,
                    width: 2,
                    type: "dashed",
                  },
                  itemStyle: {
                    color: secondaryColor,
                    borderWidth: 2,
                    borderColor: "#fff",
                  },
                  emphasis: { focus: "series" },
                },
              ]
              : []),
          ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [
    ref,
    data,
    height,
    showPrediction,
    accentColor,
    secondaryColor,
    series,
    showDetailedTooltip,
  ]);
};

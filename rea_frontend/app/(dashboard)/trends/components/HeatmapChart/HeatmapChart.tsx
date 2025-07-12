"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { HeatmapData } from "../../models";

type HeatmapChartProps = {
  data: HeatmapData[];
};

export const HeatmapChart = ({ data }: HeatmapChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      backgroundColor: "transparent",
      tooltip: { position: "top" },
      grid: { height: "50%", top: "10%" },
      xAxis: {
        type: "category",
        data: ["Price", "Transactions", "Inventory", "Demand"],
        splitArea: { show: true },
      },
      yAxis: {
        type: "category",
        data: ["Price", "Transactions", "Inventory", "Demand"],
        splitArea: { show: true },
      },
      visualMap: {
        min: -1,
        max: 1,
        orient: "horizontal",
        left: "center",
        bottom: "15%",
        inRange: { color: ["#ef4444", "#ffffff", "#10b981"] },
      },
      series: [
        {
          name: "Correlation",
          type: "heatmap",
          data,
          label: { show: true },
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" },
          },
        },
      ],
    });
    window.addEventListener("resize", () => chart.resize());
    return () => chart.dispose();
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: "400px" }} />;
};

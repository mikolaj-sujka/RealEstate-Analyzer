// src/features/analytics/components/MarketChart.tsx
"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MarketData } from "../../models";

interface MarketChartProps {
  data: MarketData[];
  height?: number;
}

export const MarketChart = ({ data, height = 400 }: MarketChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    const option = {
      backgroundColor: "transparent",
      tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
      legend: {
        data: ["Average Price", "New Listings", "Sales Volume", "Inventory"],
      },
      xAxis: { type: "category", data: data.map((d) => d.month) },
      yAxis: [
        { type: "value", name: "Price (PLN)" },
        { type: "value", name: "Count", position: "right" },
      ],
      series: [
        {
          name: "Average Price",
          type: "line",
          yAxisIndex: 0,
          data: data.map((d) => d.averagePrice),
          smooth: true,
        },
        {
          name: "New Listings",
          type: "bar",
          yAxisIndex: 1,
          data: data.map((d) => d.listings),
        },
        {
          name: "Sales Volume",
          type: "line",
          yAxisIndex: 1,
          data: data.map((d) => d.sales),
          smooth: true,
        },
        {
          name: "Inventory",
          type: "line",
          yAxisIndex: 1,
          data: data.map((d) => d.totalInventory),
          smooth: true,
          lineStyle: { type: "dashed" },
        },
      ],
    };
    chart.setOption(option);
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: `${height}px` }} />;
}

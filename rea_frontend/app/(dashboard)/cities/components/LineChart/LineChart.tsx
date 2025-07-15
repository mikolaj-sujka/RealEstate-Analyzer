"use client";
import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { PriceHistoryData } from "../../models";

type LineChartProps = {
  months: PriceHistoryData[];
  cities: string[];
  colors: Record<string, string>;
};

export function LineChart({ months, cities, colors }: LineChartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: months.map((m) => m.month) },
      yAxis: { type: "value" },
      series: cities.map((city, i) => ({
        name: city,
        type: "line",
        data: months.map((m) => m[city]),
        lineStyle: { color: colors[city] },
      })),
    });

    window.addEventListener("resize", () => chart.resize());
    return () => chart.dispose();
  }, [months, cities, colors]);

  return <div ref={ref} style={{ width: "100%", height: 400 }} />;
}

"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { PriceHistoryData } from "../../models";

type LineChartProps = {
  data: PriceHistoryData[];
  height?: number;
}

export const LineChart = ({ data, height = 400 }: LineChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cities = data.length
    ? Object.keys(data[0]).filter((k) => k !== "month")
    : [];

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      legend: { data: cities, top: 10 },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((d) => d.month),
      },
      yAxis: { type: "value" },
      series: cities.map((city, idx) => ({
        name: city,
        type: "line",
        smooth: true,
        data: data.map((d) => d[city as keyof PriceHistoryData] as number),
      })),
    });
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [data, cities]);

  return <div ref={ref} style={{ width: "100%", height: `${height}px` }} />;
}

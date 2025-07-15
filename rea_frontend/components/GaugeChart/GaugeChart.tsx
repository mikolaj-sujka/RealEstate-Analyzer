"use client";
import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

type GaugeChartProps = {
  score: number;
}

export const GaugeChart = ({ score }: GaugeChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      series: [{ type: "gauge", min: 0, max: 100, data: [{ value: score }] }],
    });
    window.addEventListener("resize", () => chart.resize());
    return () => chart.dispose();
  }, [score]);
  return <div ref={ref} style={{ width: "100%", height: 350 }} />;
}

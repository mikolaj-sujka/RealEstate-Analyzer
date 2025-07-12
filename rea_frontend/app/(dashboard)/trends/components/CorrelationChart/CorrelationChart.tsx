"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { CorrelationData } from "../../models";

interface CorrelationChartProps {
  data: CorrelationData[];
}

export const CorrelationChart = ({ data }: CorrelationChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      backgroundColor: "transparent",
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: data.map((d) => d.metric),
        axisLabel: { rotate: 45 },
      },
      yAxis: { type: "value", min: -1, max: 1 },
      series: [{ type: "bar", data: data.map((d) => d.correlation) }],
    });
    window.addEventListener("resize", () => chart.resize());
    return () => chart.dispose();
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: 300 }} />;
}

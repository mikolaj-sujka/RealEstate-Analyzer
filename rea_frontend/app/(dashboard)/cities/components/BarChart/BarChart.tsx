"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { CityData } from "../../models";

type BarChartProps = {
  data: CityData[];
  height?: number;
}

export const BarChart = ({ data, height = 400 }: BarChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      legend: { data: ["Średnia Cena", "Transakcje"], top: 10 },
      xAxis: {
        type: "category",
        data: data.map(d => d.city),
      },
      yAxis: [
        { type: "value", name: "Cena" },
        { type: "value", name: "Transakcje", position: "right" },
      ],
      series: [
        {
          name: "Średnia Cena",
          type: "bar",
          yAxisIndex: 0,
          data: data.map(d => d.averagePrice),
        },
        {
          name: "Transakcje",
          type: "bar",
          yAxisIndex: 1,
          data: data.map(d => d.totalTransactions),
        },
      ],
    });
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: `${height}px` }} />;
}

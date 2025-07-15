"use client";
import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { CityComparisonData } from "../../models";

type BarChartProps = {
  data: CityComparisonData[];
  selectedCities: string[];
};

export const BarChart = ({ data, selectedCities }: BarChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const chartData = data.filter((d) => selectedCities.includes(d.name));

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: chartData.map((d) => d.name) },
      yAxis: [{ type: "value" }, { type: "value" }],
      series: [
        {
          name: "Cena",
          type: "bar",
          data: chartData.map((d) => d.averagePrice),
        },
        {
          name: "Transakcje",
          type: "bar",
          data: chartData.map((d) => d.totalTransactions),
        },
      ],
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, selectedCities]);

  return <div ref={ref} style={{ width: "100%", height: 400 }} />;
};

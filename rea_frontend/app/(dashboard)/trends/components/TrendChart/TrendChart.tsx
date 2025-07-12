"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MarketData } from "../../models";

type TrendChartProps = {
  data: MarketData[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    const option = {
      backgroundColor: "transparent",
      tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
      legend: {
        data: ["Prices", "Transactions", "Inventory", "Demand Index"],
        top: 10,
      },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: { type: "category", data: data.map((d) => d.month) },
      yAxis: [
        { type: "value", name: "Prices" },
        { type: "value", name: "Count/Index", position: "right" },
      ],
      series: [
        {
          name: "Prices",
          type: "line",
          yAxisIndex: 0,
          data: data.map((d) => d.prices),
          smooth: true,
        },
        {
          name: "Transactions",
          type: "bar",
          yAxisIndex: 1,
          data: data.map((d) => d.totalTransactions),
        },
        {
          name: "Inventory",
          type: "line",
          yAxisIndex: 1,
          data: data.map((d) => d.inventory),
          smooth: true,
          lineStyle: { type: "dashed" },
        },
        {
          name: "Demand Index",
          type: "line",
          yAxisIndex: 1,
          data: data.map((d) => d.demand),
          smooth: true,
        },
      ],
    };
    chart.setOption(option);
    window.addEventListener("resize", () => chart.resize());
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: 400 }} />;
}

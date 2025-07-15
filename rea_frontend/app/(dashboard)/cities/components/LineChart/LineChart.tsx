"use client";

import { useRef } from "react";
import {
  cityColors,
  cityNameMap,
  extendedPriceHistoryData,
} from "../../models";
import { useECharts } from "@/hooks";

type LineChartProps = {
  selectedCities: string[];
};

export function LineChart({ selectedCities }: LineChartProps) {
  const ref = useRef<HTMLDivElement>(null!);

  useECharts(
    ref,
    () => ({
      backgroundColor: "transparent",
      tooltip: {},
      legend: { data: selectedCities.map((c) => cityNameMap[c]), top: 10 },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: extendedPriceHistoryData.map((i) => i.month),
      },
      yAxis: {
      },
      series: selectedCities.map((city, idx) => ({
        name: cityNameMap[city],
        type: "line",
        data: extendedPriceHistoryData.map((i) => i[city]),
        smooth: true,
        lineStyle: { color: cityColors[city], width: 3 },
        animationDelay: idx * 200,
      })),
      animationEasing: "cubicOut",
    }),
    [selectedCities]
  );

  return <div ref={ref} style={{ width: "100%", height: 400 }} />;
}

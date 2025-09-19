"use client";
import { useECharts } from "@/hooks";
import { useRef } from "react";
import { MapRow } from "@/services/api/models";

export const elegantColors = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];

type MapChartProps = {
  data: MapRow[];
};

export const MapChart = ({ data }: MapChartProps) => {
  const ref = useRef<HTMLDivElement>(null!);

  useECharts(
    ref,
    () => ({
      backgroundColor: "transparent",
      color: elegantColors,
      tooltip: {},
      series: [
        {
          name: "Dzielnica",
          type: "pie",
          radius: ["30%", "75%"],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {},
          label: {},
          data: data.map((item) => ({
            value: item.properties,
            name: item.label,
            price: item.averagePrice,
          })),
        },
      ],
    }),
    [data]
  );

  return <div ref={ref} style={{ width: "100%", height: 450 }} />;
};

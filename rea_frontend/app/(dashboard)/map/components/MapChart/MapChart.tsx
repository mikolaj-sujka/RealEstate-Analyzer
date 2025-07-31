"use client";
import { useECharts } from "@/hooks";
import { DistrictData } from "@/models";
import { elegantColors } from "../../models";
import { useRef } from "react";

type MapChartProps = {
  data: DistrictData[];
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
          name: "Dzielnice",
          type: "pie",
          radius: ["30%", "75%"],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {},
          label: {},
          data: data.map((item) => ({
            value: item.properties,
            name: item.district,
            price: item.averagePrice,
            trend: item.trend,
            change: item.change,
          })),
        },
      ],
    }),
    [data]
  );

  return <div ref={ref} style={{ width: "100%", height: 450 }} />;
};

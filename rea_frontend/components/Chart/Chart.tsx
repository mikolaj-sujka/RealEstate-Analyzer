import { useRef } from "react";
import { ChartProps, useEcharts } from "./hooks";

export const Chart = ({
  data,
  height = 300,
  showPrediction,
  accentColor,
  secondaryColor,
}: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEcharts(chartRef, { data, showPrediction, accentColor, secondaryColor });

  return (
    <div ref={chartRef} style={{ width: "100%", height: `${height}px` }} />
  );
};

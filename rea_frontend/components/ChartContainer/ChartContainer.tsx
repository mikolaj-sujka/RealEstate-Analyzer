import { useEffect, useRef } from "react";
import type * as echarts from "echarts";
import { useECharts } from "@/hooks";

type ChartContainerProps = {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
  onChartInit?: (instance: echarts.ECharts | null) => void;
}

export const ChartContainer = ({
  option,
  style = { width: "100%", height: "400px" },
  onChartInit,
}: ChartContainerProps) => {
  const chartRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const chartInstance = useECharts(chartRef, () => option) as unknown as echarts.ECharts | null;

  useEffect(() => {
    if (onChartInit) {
      onChartInit(chartInstance);
    }
  }, [onChartInit, chartInstance]);

  return <div ref={chartRef} style={style} />;
}

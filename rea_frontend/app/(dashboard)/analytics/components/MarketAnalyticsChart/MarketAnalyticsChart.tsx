"use client";

import * as React from "react";
import type { ECharts } from "echarts";
import { useMarketAnalyticsChart } from "./hooks";
import { MarketAnalyticsData } from "../../models/types/MarketAnalyticsData";

type MarketAnalyticsChartProps = {
  data: MarketAnalyticsData[];
  regionName: string;
  onChartReady?: (chart: ECharts) => void;
};

export const MarketAnalyticsChart = ({
  regionName,
  data,
  onChartReady,
}: MarketAnalyticsChartProps) => {
  const { containerRef, chartInstance } = useMarketAnalyticsChart(
    regionName,
    data,
    (chart) => {
      onChartReady?.(chart);
    }
  );

  React.useEffect(() => {
    if (chartInstance) {
      onChartReady?.(chartInstance);
    }
  }, [chartInstance, onChartReady]);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      style={{
        width: "100%",
        height: 400,
        minHeight: 300,
      }}
    />
  );
};

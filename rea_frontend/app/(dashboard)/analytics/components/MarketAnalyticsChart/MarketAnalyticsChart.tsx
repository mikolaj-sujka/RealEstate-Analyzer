"use client";
import { MarketAnalyticsData } from "../../models/types/MarketAnalyticsData";
import { useMarketAnalyticsChart } from "./hooks";

type MarketAnalyticsChartProps = {
  data: MarketAnalyticsData[];
};

export const MarketAnalyticsChart = ({ data }: MarketAnalyticsChartProps) => {
  const chartRef = useMarketAnalyticsChart(data);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: 400,
        minHeight: 300,
      }}
    />
  );
};

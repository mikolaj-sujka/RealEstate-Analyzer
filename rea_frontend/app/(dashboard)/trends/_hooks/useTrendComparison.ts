import { useState, useEffect } from "react";
import {
  correlationData,
  CorrelationData,
  heatmapData,
  HeatmapData,
  MarketData,
  trendData,
} from "../models";

export function useTrendComparison() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [corrData, setCorrData] = useState<CorrelationData[]>([]);
  const [heatmap, setHeatmap] = useState<HeatmapData[]>([]);

  useEffect(() => {
    // tutaj możesz fetchać z API
    setMarketData(trendData);
    setCorrData(correlationData);
    setHeatmap(heatmapData);
  }, []);

  return { marketData, corrData, heatmap };
}

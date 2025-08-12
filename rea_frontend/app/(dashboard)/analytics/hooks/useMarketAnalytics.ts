import { useEffect, useState } from "react";
import { voivodeshipMarketData } from "../models";
import { MarketAnalyticsData } from "../models/types/MarketAnalyticsData";


export function useMarketAnalytics(selectedVoivodeship: string) {
  const [marketData, setMarketData] = useState<MarketAnalyticsData[]>([]);

  useEffect(() => {
    setMarketData(voivodeshipMarketData[selectedVoivodeship] || []);
  }, [selectedVoivodeship]);

  const last = marketData[marketData.length - 1];

  return {
    marketData,
    data: last
  };
}

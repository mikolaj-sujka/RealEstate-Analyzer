import { useEffect, useState } from "react";
import { MarketData, voivodeshipMarketData } from "../models";
import { MarketAnalyticsData } from "../models/types/MarketAnalyticsData";


export function useMarketAnalytics(selectedVoivodeship: string) {
  const [marketData, setMarketData] = useState<MarketAnalyticsData[]>([]);

  useEffect(() => {
    setMarketData(voivodeshipMarketData[selectedVoivodeship] || []);
  }, [selectedVoivodeship]);

  const getChange = (current: number, previous: number) => {
    if (previous === 0) return { percentage: 0, isPositive: true };
    const pct = ((current - previous) / previous) * 100;
    return { percentage: +pct.toFixed(1), isPositive: pct >= 0 };
  };

  const last = marketData[marketData.length - 1];
  const prev = marketData[marketData.length - 2] || last;

  return {
    marketData,
    lastMonth: last,
    changes: {
      price: getChange(last?.averagePrice ?? 0, prev?.averagePrice ?? 0),
      listings: getChange(last?.listings ?? 0, prev?.listings ?? 0),
      sales: getChange(last?.sales ?? 0, prev?.sales ?? 0),
      inventory: getChange(last?.totalInventory ?? 0, prev?.totalInventory ?? 0),
    },
  };
}

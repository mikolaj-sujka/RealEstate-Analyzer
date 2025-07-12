// src/features/analytics/hooks/useMarketData.ts
import { useState, useEffect } from "react";
import { MarketData } from "../models";

export function useMarketData() {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // tutaj możesz podmienić na prawdziwe zapytanie do API
    const mock: MarketData[] = [
      {
        month: "Jan",
        averagePrice: 8200,
        listings: 1240,
        sales: 890,
        totalInventory: 2100,
      },
      {
        month: "Feb",
        averagePrice: 8350,
        listings: 1180,
        sales: 920,
        totalInventory: 2050,
      },
      {
        month: "Mar",
        averagePrice: 8500,
        listings: 1320,
        sales: 1050,
        totalInventory: 1980,
      },
      {
        month: "Apr",
        averagePrice: 8650,
        listings: 1450,
        sales: 1180,
        totalInventory: 1920,
      },
      {
        month: "May",
        averagePrice: 8800,
        listings: 1380,
        sales: 1220,
        totalInventory: 1850,
      },
      {
        month: "Jun",
        averagePrice: 8950,
        listings: 1520,
        sales: 1350,
        totalInventory: 1780,
      },
    ];
    setTimeout(() => {
      setData(mock);
      setLoading(false);
    }, 500);
  }, []);

  return { data, loading };
}

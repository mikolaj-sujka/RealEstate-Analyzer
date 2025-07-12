import { useState, useEffect } from "react";
import { CityData, PriceHistoryData } from "../models";

export function useCityData() {
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [historyData, setHistoryData] = useState<PriceHistoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // tutaj możesz zastąpić mock prawdziwym API call
    const mockCity: CityData[] = [
      { city: "Warsaw", averagePrice: 12500, totalTransactions: 2340, growthOfTotalTransactions: 8.5 },
      { city: "Krakow", averagePrice: 9800, totalTransactions: 1890, growthOfTotalTransactions: 12.3 },
      { city: "Gdansk", averagePrice: 8900, totalTransactions: 1456, growthOfTotalTransactions: 15.7 },
      { city: "Wroclaw", averagePrice: 8200, totalTransactions: 1234, growthOfTotalTransactions: 9.8 },
      { city: "Poznan", averagePrice: 7800, totalTransactions: 1123, growthOfTotalTransactions: 7.2 },
    ];
    const mockHistory: PriceHistoryData [] = [
      {
        month: "Jan",
        Warsaw: 12000,
        Krakow: 9200,
        Gdansk: 8100,
        Wroclaw: 7800,
        Poznan: 7400,
      },
      {
        month: "Feb",
        Warsaw: 12100,
        Krakow: 9350,
        Gdansk: 8250,
        Wroclaw: 7850,
        Poznan: 7450,
      },
      {
        month: "Mar",
        Warsaw: 12200,
        Krakow: 9500,
        Gdansk: 8400,
        Wroclaw: 7900,
        Poznan: 7500,
      },
      {
        month: "Apr",
        Warsaw: 12350,
        Krakow: 9650,
        Gdansk: 8550,
        Wroclaw: 7950,
        Poznan: 7550,
      },
      {
        month: "May",
        Warsaw: 12450,
        Krakow: 9750,
        Gdansk: 8700,
        Wroclaw: 8100,
        Poznan: 7650,
      },
      {
        month: "Jun",
        Warsaw: 12500,
        Krakow: 9800,
        Gdansk: 8900,
        Wroclaw: 8200,
        Poznan: 7800,
      },
    ];
    setCityData(mockCity);
    setHistoryData(mockHistory);
    setLoading(false);
  }, []);

  return { cityData, historyData, loading };
}

import { useEffect, useState } from "react";
import { voivodeshipMarketData } from "../models";
import { MarketAnalyticsData } from "../models/types/MarketAnalyticsData";

export interface RecentTransaction {
  id: string
  property: string
  location: string
  date: string
  price: number
  status: "Sprzedane" | "W trakcie" | "Rezerwacja"
  area: number
  pricePerSqm: number
}

export function useMarketAnalytics(selectedVoivodeship: string) {
  const [marketData, setMarketData] = useState<MarketAnalyticsData>();

  useEffect(() => {
    const data = voivodeshipMarketData[selectedVoivodeship];
    setMarketData(data);
  }, [selectedVoivodeship]);

  const generateRecentTransactions = (voivodeship: string): RecentTransaction[] => {
    const cities = {
      Mazowieckie: ["Warszawa", "Radom", "Płock", "Siedlce"],
      Małopolskie: ["Kraków", "Tarnów", "Nowy Sącz", "Oświęcim"],
      Śląskie: ["Katowice", "Częstochowa", "Sosnowiec", "Gliwice"],
      Dolnośląskie: ["Wrocław", "Wałbrzych", "Legnica", "Jelenia Góra"],
      Wielkopolskie: ["Poznań", "Kalisz", "Konin", "Piła"],
      Pomorskie: ["Gdańsk", "Gdynia", "Słupsk", "Sopot"],
      Łódzkie: ["Łódź", "Piotrków Trybunalski", "Pabianice", "Tomaszów Mazowiecki"],
      Zachodniopomorskie: ["Szczecin", "Koszalin", "Stargard", "Świnoujście"],
    }

    const propertyTypes = [
      "Mieszkanie 2-pokojowe",
      "Mieszkanie 3-pokojowe",
      "Mieszkanie 4-pokojowe",
      "Kawalerka",
      "Dom szeregowy",
      "Apartament",
    ]

    const statuses: RecentTransaction["status"][] = ["Sprzedane", "W trakcie", "Rezerwacja"]

    const cityList = cities[voivodeship as keyof typeof cities] || ["Miasto A", "Miasto B", "Miasto C"]
    const basePrice = marketData?.averagePrice || 8000

    return Array.from({ length: 8 }, (_, i) => {
      const area = Math.floor(Math.random() * 60) + 30 // 30-90 m²
      const pricePerSqm = basePrice + (Math.random() - 0.5) * 2000 // ±1000 od średniej
      const totalPrice = Math.floor(area * pricePerSqm)

      return {
        id: `tx-${i + 1}`,
        property: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
        location: cityList[Math.floor(Math.random() * cityList.length)],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // ostatnie 30 dni
        price: totalPrice,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        area,
        pricePerSqm: Math.floor(pricePerSqm),
      }
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // sortuj od najnowszych
  }

  const recentTransactions = marketData ? generateRecentTransactions(selectedVoivodeship) : []


  return {
    marketData,
    recentTransactions
  };
}

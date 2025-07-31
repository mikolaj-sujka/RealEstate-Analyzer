import {
  IconCurrencyZloty,
  IconChartLine,
  IconBuildingEstate,
  IconBuildingStore,
  IconBuildingWarehouse,
} from "@tabler/icons-react";
import { ChartData } from "@/models/types";

export type HistoricalData = ChartData & {
  listings: number;
  sales: number;
  inventory: number;
}

export const cityBasePrices: { [key: string]: number } = {
  warszawa: 15000,
  krakow: 13000,
  gdansk: 12000,
  wroclaw: 11500,
  poznan: 11000,
  lodz: 9000,
  szczecin: 8500,
  bydgoszcz: 8000,
}

export const cities = [
  { value: "warszawa", label: "Warszawa" },
  { value: "krakow", label: "Kraków" },
  { value: "gdansk", label: "Gdańsk" },
  { value: "wroclaw", label: "Wrocław" },
  { value: "poznan", label: "Poznań" },
  { value: "lodz", label: "Łódź" },
  { value: "szczecin", label: "Szczecin" },
  { value: "bydgoszcz", label: "Bydgoszcz" },
];

export const timeRanges = [
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1R", value: "1y" },
  { label: "2L", value: "2y" },
  { label: "3L", value: "3y" },
  { label: "5L", value: "5y" },
  { label: "Wszystko", value: "all" },
  { label: "Niestandardowy", value: "custom" },
];

export type MetricData = {
  label: string;
  value: string;
  icon: any;
  color: string;
}

export const metrics: MetricData[] = [
  { label: "Cena", value: "price", icon: IconCurrencyZloty, color: "#4c6ef5" },
  { label: "Prognoza", value: "forecast", icon: IconChartLine, color: "#20c997" },
  { label: "Nowe Oferty", value: "new_listings", icon: IconBuildingEstate, color: "#fab005" },
  { label: "Wolumen Sprzedaży", value: "sales_volume", icon: IconBuildingStore, color: "#be4bdb" },
  { label: "Zasoby Rynkowe", value: "market_inventory", icon: IconBuildingWarehouse, color: "#15aabf" },
];


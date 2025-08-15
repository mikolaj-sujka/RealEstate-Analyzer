export type GusHousingListingData = {
  cityCode: string;
  quarter: number; // 1..4
  year: number;
  medianPricePerSqm: number;
  averagePricePerSqm: number;
  flatsCompleted: number;
  flatsSold: number;
  totalValueSold: number;
  averageTotalPrice: number;
}

export type HistoricalPoint = {
  date: string; // YYYY-MM-01 (koniec kwartału)
  month: string; // np. "2025-Q2"
  price: number; // = averagePricePerSqm (zachowujemy kompatybilność)
  forecast?: number; // prosty SMA(3) na "price" (opcjonalnie)
  medianPricePerSqm: number;
  averagePricePerSqm: number;
  flatsCompleted: number;
  flatsSold: number;
  totalValueSold: number;
  averageTotalPrice: number;
}

export type RangeKey =
  | "3m"
  | "6m"
  | "1y"
  | "2y"
  | "3y"
  | "5y"
  | "10y"
  | "all"
  | "custom";


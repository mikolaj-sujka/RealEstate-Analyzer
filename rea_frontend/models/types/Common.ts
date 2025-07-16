export type SparklineData = {
  value: number;
}

export type ChartData = {
  month: string;
  price: number;
  prediction?: number;
}

export type MarketData = {
  month: string;
  avgPrice: number;
  listings: number;
  sales: number;
  inventory: number;
  demand?: number;
}

export type CityData = {
  city: string;
  avgPrice: number;
  transactions: number;
  growth: number;
}

export type PriceHistoryData = {
  month: string;
  Warsaw: number;
  Krakow: number;
  Gdansk: number;
  Wroclaw: number;
  Poznan: number;
}

export type CorrelationData = {
  metric: string;
  correlation: number;
  change: string;
}

export type TransactionData = {
  id: number;
  property: string;
  location: string;
  date: string;
  price: string;
  pricePerM2: number;
  type: string;
  status: string;
}

export type PropertyTypeData = {
  name: string;
  value: number;
  color: string;
  icon: any;
}

export type DistrictData = {
  district: string;
  averagePrice: number;
  properties: number;
  trend: "up" | "down";
  change: string;
}

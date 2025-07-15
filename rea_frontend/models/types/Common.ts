export interface SparklineData {
  value: number;
}

export interface ChartData {
  month: string;
  price: number;
  prediction?: number;
}

export interface MarketData {
  month: string;
  avgPrice: number;
  listings: number;
  sales: number;
  inventory: number;
  demand?: number;
}

export interface CityData {
  city: string;
  avgPrice: number;
  transactions: number;
  growth: number;
}

export interface PriceHistoryData {
  month: string;
  Warsaw: number;
  Krakow: number;
  Gdansk: number;
  Wroclaw: number;
  Poznan: number;
}

export interface CorrelationData {
  metric: string;
  correlation: number;
  change: string;
}

export interface TransactionData {
  id: number;
  property: string;
  location: string;
  date: string;
  price: string;
  pricePerM2: number;
  type: string;
  status: string;
}

export interface PropertyTypeData {
  name: string;
  value: number;
  color: string;
  icon: any;
}

export interface DistrictData {
  district: string;
  averagePrice: number;
  properties: number;
  trend: "up" | "down";
  change: string;
}

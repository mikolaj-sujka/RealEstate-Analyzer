export type CityComparisonData = {
  name: string;
  averagePrice: number;
  totalTransactions: number;
  trend: 'up' | 'down';
  growth: number;
};

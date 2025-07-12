"use client";

import { Container } from "@mantine/core";
import { SummaryCard } from "./components/SummaryCard";
import { MarketChart } from "./components/MarketChart";
import { DollarSign, Home, BarChart3, Users } from "lucide-react";
import { useMarketData } from "./_hooks";

export default function AnalyticsPage() {
  const { data, loading } = useMarketData();

  if (loading) return <p>Loading market analytics…</p>;

  // obliczenia statystyk dla kafelków
  const latest = data[data.length - 1];
  const prev = data[data.length - 2] || latest;
  const delta = (current: number, previous: number) =>
    (((current - previous) / previous) * 100).toFixed(1) + "%";

  return (
    <Container size="xl" className="space-y-6">
      <h1 className="text-2xl font-bold">Market Analytics</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Average Price"
          value={`${latest.averagePrice} PLN/m²`}
          delta={delta(latest.averagePrice, prev.averagePrice)}
          deltaPositive={latest.averagePrice >= prev.averagePrice}
          Icon={DollarSign}
        />
        <SummaryCard
          title="New Listings"
          value={latest.listings.toString()}
          delta={delta(latest.listings, prev.listings)}
          deltaPositive={latest.listings >= prev.listings}
          Icon={Home}
        />
        <SummaryCard
          title="Sales Volume"
          value={latest.sales.toString()}
          delta={delta(latest.sales, prev.sales)}
          deltaPositive={latest.sales >= prev.sales}
          Icon={BarChart3}
        />
        <SummaryCard
          title="Market Inventory"
          value={latest.totalInventory.toString()}
          delta={delta(latest.totalInventory, prev.totalInventory)}
          deltaPositive={latest.totalInventory >= prev.totalInventory}
          Icon={Users}
        />
      </div>

      <MarketChart data={data} height={400} />
    </Container>
  );
}

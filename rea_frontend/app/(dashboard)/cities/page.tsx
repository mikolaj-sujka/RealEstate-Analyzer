"use client";

import { BarChart } from "./components/BarChart";
import { LineChart } from "./components/LineChart";
import { ComparisonCard } from "./components/ComparisonCard";
import { Stack } from "@mantine/core";
import { useCityData } from "./_hooks";

export default function CityComparison() {
  const { cityData, historyData, loading } = useCityData();
  if (loading) return <p>Loading…</p>;

  return (
    <Stack gap="lg">
      <ComparisonCard title="City comparison" description="Average price vs. transactions">
        <BarChart data={cityData} />
      </ComparisonCard>

      <ComparisonCard title="Price History by City">
        <LineChart data={historyData} />
      </ComparisonCard>
    </Stack>
  );
}

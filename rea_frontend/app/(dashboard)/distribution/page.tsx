"use client";

import { usePropertyDistribution } from "./_hooks";
import { DistributionCard } from "./components";

export default function PropertyDistribution() {
  const { data } = usePropertyDistribution();
  return <DistributionCard data={data} />;
}

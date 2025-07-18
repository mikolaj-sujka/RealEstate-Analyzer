"use client";
import React from "react";
import { Text } from "@mantine/core";
import { useCityComparison } from "./hooks";
import { BarChart, FiltersWrapper, LineChart } from "./components";
import { useTranslate } from "@/hooks";
import { DashboardSection } from "@/components/DashboardSection/DashboardSection";
import { TitleSection } from "@/components/UI/TitleSection";

export default function CityComparison() {
  const {
    filteredData,
    selectedCities,
    extendedPriceHistoryData,
    cityColors,
    filterConfig,
    handleFilterChange,
  } = useCityComparison();

  const { t } = useTranslate();

  return (
    <DashboardSection>
      <TitleSection title={t("CityComparison.porównanieMiast")} />
      <Text size="sm" c="dimmed" mb="md">
        {t("CityComparison.opisPorównania")}
      </Text>
      <FiltersWrapper config={filterConfig} onChange={handleFilterChange} />

      <BarChart data={filteredData} selectedCities={selectedCities} />

      <TitleSection title={t("CityComparison.historiaCenWedlugMiast")} />
      <LineChart
        months={extendedPriceHistoryData}
        cities={selectedCities}
        colors={cityColors}
      />
    </DashboardSection>
  );
}

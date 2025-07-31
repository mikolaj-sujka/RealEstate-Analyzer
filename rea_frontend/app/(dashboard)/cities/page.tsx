"use client";
import React from "react";
import { useCityComparison } from "./hooks";
import { BarChart, FiltersWrapper, LineChart } from "./components";
import { useTranslate } from "@/hooks";
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TitleSection } from "@/components/UI/TitleSection";
import { TextDescription } from "@/components/UI/TextDescription";

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
    <ContainerSection>
      <TitleSection title={t("CityComparison.porównanieMiast")} />
      <TextDescription description={t("CityComparison.opisPorównania")} />
      <FiltersWrapper config={filterConfig} onChange={handleFilterChange} />

      <BarChart data={filteredData} selectedCities={selectedCities} />

      <TitleSection title={t("CityComparison.historiaCenWedlugMiast")} />
      <LineChart
        months={extendedPriceHistoryData}
        cities={selectedCities}
        colors={cityColors}
      />
    </ContainerSection>
  );
}

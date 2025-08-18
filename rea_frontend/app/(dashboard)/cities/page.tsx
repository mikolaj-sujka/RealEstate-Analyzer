"use client";
import React from "react";
import { useCityComparison } from "./hooks/useCityComparison";
import { BarChart, FiltersWrapper } from "./components";
import { useTranslate } from "@/hooks";
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TitleSection } from "@/components/UI/TitleSection";
import { TextDescription } from "@/components/UI/TextDescription";

export default function CityComparison() {
  const {
    filteredData,
    selectedCities,
    filterConfig,
    handleFilterChange,
    loading,
    error,
    filtersKey,
  } = useCityComparison();

  const { t } = useTranslate();

  return (
    <ContainerSection>
      <TitleSection title={t("CityComparison.porównanieMiast")} />
      <TextDescription description={t("CityComparison.opisPorównania")} />

      <FiltersWrapper
        key={filtersKey}
        config={filterConfig}
        onChange={handleFilterChange}
      />

      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      {/* spinner itp. */}
      <BarChart data={filteredData} selectedCities={selectedCities} />
    </ContainerSection>
  );
}

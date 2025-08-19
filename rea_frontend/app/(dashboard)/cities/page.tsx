"use client";
import React from "react";
import { useCityComparison } from "./hooks/useCityComparison";
import { BarChart, FiltersWrapper } from "./components";
import { useTranslate } from "@/hooks";
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TitleSection } from "@/components/UI/TitleSection";
import { TextDescription } from "@/components/UI/TextDescription";
import { EmptyState } from "@/components/EmptyPage/EmptyPage";
import { Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

export default function CityComparison() {
  const {
    filteredData,
    selectedCities,
    filterConfig,
    handleFilterChange,
    filtersKey,
  } = useCityComparison();

  const { t } = useTranslate();

  const showEmpty = !filteredData || filteredData.length === 0;

  return (
    <ContainerSection>
      <TitleSection title={t("CityComparison.porównanieMiast")} />
      <TextDescription description={t("CityComparison.opisPorównania")} />

      {showEmpty ? (
        <EmptyState
          title={t("Brak danych")}
          description={t(
            "Dla wybranego miasta nie ma jeszcze danych lub nie można ich poprawnie zinterpretować. Zmień filtr lub spróbuj ponownie później."
          )}
        >
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={() => window.location.reload()}
          >
            {t("Odśwież")}
          </Button>
        </EmptyState>
      ) : (
        <>
          <FiltersWrapper
            key={filtersKey}
            config={filterConfig}
            onChange={handleFilterChange}
          />

          <BarChart data={filteredData} selectedCities={selectedCities} />
        </>
      )}
    </ContainerSection>
  );
}

"use client";

import React from "react";
import { Button, Grid } from "@mantine/core";
import { Filter } from "@/components/Filters";
import { DistrictCard, MapChart } from "./components";
import { useTranslate } from "@/hooks";
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TextDescription, TitleSection } from "@/components/UI";
import { useDistrictMap } from "./hooks/useDistrictMap";
import { EmptyState } from "@/components/EmptyPage/EmptyPage";
import { IconRefresh } from "@tabler/icons-react";

export default function PropertyMap() {
  const {
    setSelectedCity,
    setPriceRange,
    setPropertiesRange,
    filteredData,
    filterConfig,
    priceConfig,
    propertiesConfig,
  } = useDistrictMap();

  const { t } = useTranslate();

  const handleFilters = (vals: Record<string, any>) => {
    if (vals.selectedCity) setSelectedCity(vals.selectedCity);
    if (vals.priceRange) setPriceRange(vals.priceRange);
    if (vals.propertiesRange) setPropertiesRange(vals.propertiesRange);
  };

  const showEmpty = filteredData.length === 0;

  return (
    <ContainerSection>
      <TitleSection title={t("CityMap.mapaNieruchomościDzielnice")} />
      <TextDescription description={t("CityMap.mapaNieruchomosciOpis")} />
      {filterConfig ? (
        <Filter
          key={`${priceConfig.min}-${priceConfig.max}-${propertiesConfig.min}-${propertiesConfig.max}`}
          config={filterConfig}
          onFilterChange={handleFilters}
          defaultExpanded
        />
      ) : null}

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
          <MapChart data={filteredData} />

          <Grid>
            {filteredData.map((d) => (
              <Grid.Col key={d.label} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <DistrictCard district={d} />
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
    </ContainerSection>
  );
}

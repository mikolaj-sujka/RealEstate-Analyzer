"use client";

import React from "react";
import { Grid, Text } from "@mantine/core";
import { usePropertyMap } from "./hooks/usePropertyMap";
import { Filter } from "@/components/Filters";
import { DistrictCard, MapChart } from "./components";
import { useTranslate } from "@/hooks";
import { DashboardSection } from "@/components/DashboardSection/DashboardSection";
import { TitleSection } from "@/components/UI/TitleSection";

export default function PropertyMap() {
  const {
    setSelectedCity,
    setPriceRange,
    setPropertiesRange,
    filteredData,
    filterConfig,
  } = usePropertyMap();

  const { t } = useTranslate();

  const handleFilters = (vals: Record<string, any>) => {
    if (vals.selectedCity) setSelectedCity(vals.selectedCity);
    if (vals.priceRange) setPriceRange(vals.priceRange);
    if (vals.propertiesRange) setPropertiesRange(vals.propertiesRange);
  };

  return (
    <DashboardSection>
      <TitleSection title={t("CityMap.mapaNieruchomościDzielnice")} />
      <Text c="dimmed" size="sm">
        {t("CityMap.mapaNieruchomosciOpis")}
      </Text>
      <Filter
        config={filterConfig}
        onFilterChange={handleFilters}
        defaultExpanded
      />

      <MapChart data={filteredData} />

      <Grid>
        {filteredData.length > 0 ? (
          filteredData.map((d) => (
            <Grid.Col key={d.district} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <DistrictCard district={d} />
            </Grid.Col>
          ))
        ) : (
          <Grid.Col span={12}>
            <Text style={{ textAlign: "center" }}>
              {t("CityMap.brakDanych")}
            </Text>
          </Grid.Col>
        )}
      </Grid>
    </DashboardSection>
  );
}

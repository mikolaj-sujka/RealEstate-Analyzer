"use client";

import React from "react";
import { Grid, Text } from "@mantine/core";
import { Filter } from "@/components/Filters";
import { DistrictCard, MapChart } from "./components";
import { useTranslate } from "@/hooks";
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TextDescription, TitleSection } from "@/components/UI";
import * as classes from "./styles";
import { useDistrictMap } from "./hooks/useDistrictMap";

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

      <MapChart data={filteredData} />

      <Grid>
        {filteredData.length > 0 ? (
          filteredData.map((d) => (
            <Grid.Col key={d.label} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <DistrictCard district={d} />
            </Grid.Col>
          ))
        ) : (
          <Grid.Col span={12}>
            <Text className={classes.cityMapNoDataText}>
              {t("CityMap.brakDanych")}
            </Text>
          </Grid.Col>
        )}
      </Grid>
    </ContainerSection>
  );
}

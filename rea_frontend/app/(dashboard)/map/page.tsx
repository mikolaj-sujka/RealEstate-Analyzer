"use client";

import React from "react";
import { Container, Paper, Title, Grid, Text } from "@mantine/core";
import { usePropertyMap } from "./hooks/usePropertyMap";
import { Filter } from "@/components/Filters";
import { DistrictCard, MapChart } from "./components";
import { useTranslate } from "@/hooks";

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
    <Container size="xl" py="xl">
      <Paper shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <Title mb="md" order={2}>
          {t("CityMap.mapaNieruchomościDzielnice")}
        </Title>

        <Filter
          config={filterConfig}
          onFilterChange={handleFilters}
          defaultExpanded
        />

        <MapChart data={filteredData} />
      </Paper>

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
    </Container>
  );
}

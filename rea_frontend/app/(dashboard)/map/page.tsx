'use client'
import React from "react";
import { Container, Paper, Title, Grid } from "@mantine/core";
import { usePropertyMap } from "./hooks";
import { cityMapData } from "./models";
import { Filters } from "@/components/Filters";
import { DistrictCard, MapChart } from "./components";

export default function PropertyMap() {
  const {
    selectedCity,
    setSelectedCity,
    priceConfig,
    propertiesConfig,
    priceRange,
    setPriceRange,
    propertiesRange,
    setPropertiesRange,
    filteredData,
  } = usePropertyMap();

  const cityOptions = Object.keys(cityMapData).map((city) => ({
    value: city,
    label: city,
  }));

  return (
    <Container size="xl" py="xl">
      <Paper shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <Title order={2}>Mapa Nieruchomości - Dzielnice</Title>
        <Filters
          cityOptions={cityOptions}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          priceConfig={priceConfig}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          propertiesConfig={propertiesConfig}
          propertiesRange={propertiesRange}
          onPropertiesChange={setPropertiesRange}
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
            <Paper p="xl" withBorder style={{ textAlign: "center" }}>
              Brak danych spełniających wybrane kryteria filtrowania.
            </Paper>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}

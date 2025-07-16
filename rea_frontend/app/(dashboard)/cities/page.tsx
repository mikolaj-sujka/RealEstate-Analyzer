"use client";
import React from "react";
import { Container, Paper, Title, Text } from "@mantine/core";
import { useCityComparison } from "./hooks";
import { BarChart, FiltersWrapper, LineChart } from "./components";
import { useTranslate } from "@/hooks";

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
    <Container size="xl" py="xl">
      <Paper shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <Title order={2}>{t("CityComparison.porównanieMiast")}</Title>
        <Text size="sm" c="dimmed" mb="md">
          {t("CityComparison.opisPorównania")}
        </Text>
        <FiltersWrapper config={filterConfig} onChange={handleFilterChange} />

        <BarChart data={filteredData} selectedCities={selectedCities} />
      </Paper>

      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={3}>{t("CityComparison.historiaCenWedlugMiast")}</Title>
        <LineChart
          months={extendedPriceHistoryData}
          cities={selectedCities}
          colors={cityColors}
        />
      </Paper>
    </Container>
  );
}

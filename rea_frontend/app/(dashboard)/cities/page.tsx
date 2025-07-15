"use client";

import { Container, MultiSelect, Paper, Text, Title } from "@mantine/core";
import { BarChart } from "./components/BarChart";
import { LineChart } from "./components/LineChart";
import { useCityComparison } from "./hooks";
import { cityNameMap } from "./models";
import { useTranslation } from "react-i18next";

type CityComparisonProps = {
  title?: string;
  description?: string;
};

export default function CityComparison({
  title = "Porównanie miast",
  description,
}: CityComparisonProps) {
  const { selectedCities, setSelectedCities, filteredCityData } =
    useCityComparison();

  const { t } = useTranslation();

  const options = Object.entries(cityNameMap).map(([value, label]) => ({
    value,
    label: label
  }));

  return (
    <Container size="xl" py="xl">
      <Paper shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <Title order={2}>{title}</Title>
        {description && (
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        )}
        <MultiSelect
          label={t("CityComparison.wybierzMiasta")}
          placeholder={t("CityComparison.wybierzMiasta")}
          data={options}
          value={selectedCities}
          onChange={setSelectedCities}
          searchable
          clearable
        />
        <BarChart data={filteredCityData} />
      </Paper>
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={3}>{t("CityComparison.historiaCenWedlugMiast")}</Title>
        <LineChart selectedCities={selectedCities} />
      </Paper>
    </Container>
  );
}

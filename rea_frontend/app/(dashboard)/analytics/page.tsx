"use client";
import { useState } from "react";
import { Grid, Select, Title, Group, Paper, Text, Flex } from "@mantine/core";
import {
  IconCurrencyDollar,
  IconHome,
  IconChartBar,
  IconUsers,
} from "@tabler/icons-react";
import { useMarketAnalytics } from "./hooks";
import { StatisticsCardData } from "@/components/StatisticsCardData";
import { MarketAnalyticsChart } from "./components";
import { voivodeshipMarketData } from "./models";
import { useTranslation } from "react-i18next";
import { ReportGenerator } from "@/components/ReportGenerator/ReportGenerator";
import { DashboardSection } from "@/components/DashboardSection/DashboardSection";
import { TitleSection } from "@/components/UI/TitleSection";

export default function AnalyticsPage() {
  const [voivodeship, setVoivodeship] = useState("Cała Polska");
  const { marketData, lastMonth, changes } = useMarketAnalytics(voivodeship);
  const { t } = useTranslation();

  const cards = [
    {
      label: "Średnia Cena",
      value: lastMonth?.averagePrice.toLocaleString("pl-PL") + " PLN/m²",
      change: changes.price,
      icon: (
        <IconCurrencyDollar size={16} color="var(--mantine-color-dimmed)" />
      ),
    },
    {
      label: "Nowe Oferty",
      value: lastMonth?.listings.toLocaleString("pl-PL") || "–",
      change: changes.listings,
      icon: <IconHome size={16} color="var(--mantine-color-dimmed)" />,
    },
    {
      label: "Wolumen Sprzedaży",
      value: lastMonth?.sales.toLocaleString("pl-PL") || "–",
      change: changes.sales,
      icon: <IconChartBar size={16} color="var(--mantine-color-dimmed)" />,
    },
    {
      label: "Zapasy Rynkowe",
      value: lastMonth?.totalInventory.toLocaleString("pl-PL") || "–",
      change: changes.inventory,
      icon: <IconUsers size={16} color="var(--mantine-color-dimmed)" />,
    },
  ];

  return (
    <DashboardSection>
      <Group justify="space-between" align="center">
        <Flex direction="column">
          <TitleSection title={t("Analytics.analitykaRynku")}></TitleSection>
          <Text c="dimmed" size="sm">
            {t("Analytics.analitykaRynkuOpis")}
          </Text>
        </Flex>
        <Select
          label={t("Analytics.wybierzWojewództwo")}
          data={Object.keys(voivodeshipMarketData)}
          value={voivodeship}
          onChange={(v) => setVoivodeship(v!)}
        />
      </Group>

      <Grid mb="xl" mt="xl">
        {cards.map((c) => (
          <Grid.Col key={c.label} span={{ base: 12, sm: 6, lg: 3 }}>
            <StatisticsCardData {...c} />
          </Grid.Col>
        ))}
      </Grid>

      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={3} mb="md">
          {t("Analytics.stanRynku")}
        </Title>
        <MarketAnalyticsChart data={marketData} />
      </Paper>

      {/* To add data visualization and report generation */}
      <ReportGenerator
        chartInstance={null}
        transactions={[]}
        selectedCities={[]}
        title={t("ReportGenerator.tytułGeneratoraRaportów")}
        description={t("ReportGenerator.opisRaportu")}
      />
    </DashboardSection>
  );
}

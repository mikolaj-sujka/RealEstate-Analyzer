"use client";

import { useEffect, useState, useRef } from "react";
import {
  Container,
  Paper,
  Text,
  Grid,
  Group,
  Box,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { IconShieldCheck, IconChartBar } from "@tabler/icons-react";
import type * as echarts from "echarts";
import { cityTrendData } from "./models";
import {
  CorrelationChart,
  InvestmentSimulator,
  MainAnalysisChart,
  RiskAnalysisChart,
  TrendComparisonHeader,
} from "./components";
import { ReportGenerator } from "@/components/ReportGenerator";
import { recentTransactions } from "../dashboard/models/consts";
import { useTranslate } from "@/hooks/useTranslate";

type TrendComparisonProps = {
  title?: string;
  description?: string;
};

export default function TrendComparison({
  title = "Porównanie trendów",
  description,
}: TrendComparisonProps) {
  const [selectedCity, setSelectedCity] = useState("Warszawa");
  const [analysisType, setAnalysisType] = useState<
    "basic" | "advanced" | "investment"
  >("basic");
  const [isSwitching, setIsSwitching] = useState(false);
  const trendChartInstanceRef = useRef<echarts.ECharts | null>(null);

  const { t } = useTranslate();

  const handleAnalysisTypeChange = (value: string) => {
    setIsSwitching(true);
    setTimeout(() => {
      setAnalysisType(value as "basic" | "advanced" | "investment");
      setIsSwitching(false);
    }, 400);
  };

  const cityOptions = Object.keys(cityTrendData).map((city) => ({
    value: city,
    label: city,
  }));

  const handleChartInit = (instance: echarts.ECharts | null) => {
    if (analysisType === "basic") {
      trendChartInstanceRef.current = instance;
    }
  };

  return (
    <Container size="xl" py="xl">
      <Paper shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <TrendComparisonHeader
          title={title}
          analysisType={analysisType}
          onAnalysisTypeChange={handleAnalysisTypeChange}
          selectedCity={selectedCity}
          onCityChange={(value) => setSelectedCity(value || "Warszawa")}
          cityOptions={cityOptions}
        />
        {description && (
          <Text size="sm" c="dimmed" mb="md">
            {description}
          </Text>
        )}

        <Box pos="relative" style={{ minHeight: "400px" }}>
          <LoadingOverlay
            visible={isSwitching}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Box
            style={{
              opacity: isSwitching ? 0 : 1,
              transition: "opacity 300ms ease",
            }}
          >
            <MainAnalysisChart
              type={analysisType}
              city={selectedCity}
              onChartInit={handleChartInit}
            />
          </Box>
        </Box>
      </Paper>

      <InvestmentSimulator />

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder h="100%">
            <Group mb="md">
              <IconShieldCheck size={20} />
              <Title order={3}>{t("Trends.analizaRyzykaInwestycyjnego")}</Title>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              {t("Trends.ogólnyWskaźnikRyzykaDla", { city: selectedCity })}.{" "}
              {t("Trends.nizszaWartośćOznaczaMniejszeRyzyko")}
            </Text>
            <RiskAnalysisChart city={selectedCity} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder h="100%">
            <Group mb="md">
              <IconChartBar size={20} />
              <Title order={3}>{t("Trends.analizaKorelacji")}</Title>
            </Group>
            <CorrelationChart />
          </Paper>
        </Grid.Col>
      </Grid>

      <ReportGenerator
        chartInstance={trendChartInstanceRef.current}
        transactions={recentTransactions}
        selectedCities={[selectedCity]}
        title={t("ReportGenerator.generujRaport")}
        description={t("ReportGenerator.opisRaportu")}
      />
    </Container>
  );
}

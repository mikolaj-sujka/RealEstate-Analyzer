"use client";
import { useRef, useState } from "react";
import { Grid, Select, Title, Group, Paper, Flex, Button } from "@mantine/core";
import { StatisticsCardData } from "@/components/StatisticsCardData";
import { MarketAnalyticsChart } from "./components";
import { useTranslation } from "react-i18next";
import { ReportGenerator } from "@/components/ReportGenerator/ReportGenerator";
import { TitleSection } from "@/components/UI/TitleSection";
import { ContainerSection } from "@/components/ContainerSection";
import { TextDescription } from "@/components/UI/TextDescription";
import { getCitiesAnalyticsCards } from "./utils";
import * as styles from "./styles";
import { useLocationReportDefinition } from "@/hooks";
import { ECharts } from "echarts/types/dist/echarts";
import { useVoivodeshipAnalytics } from "./hooks/useVoivodeshipAnalytics";
import { useVoivodeshipOptions } from "./hooks";
import { EmptyState } from "@/components/EmptyPage/EmptyPage";
import { IconRefresh } from "@tabler/icons-react";

export default function AnalyticsPage() {
  const {
    options: voivodeshipOptions,
    selected: voivodeship,
    setSelected: setVoivodeship,
    loading: loadingVoivodeships,
  } = useVoivodeshipOptions("Mazowieckie");
  const { marketData } = useVoivodeshipAnalytics(voivodeship);

  const { t } = useTranslation();

  const chartRef = useRef<ECharts>(null!);

  const reportDefinition = useLocationReportDefinition({
    locationName: voivodeship,
    isCity: false,
    chartInstance: chartRef,
    voivodeshipMarketData: marketData!,
  });

  const cards = getCitiesAnalyticsCards(marketData!).map((card) => {
    const CardIcon = card.icon;
    return {
      ...card,
      icon: <CardIcon />,
    };
  });

  const cardsHaveValidValues =
    cards.length > 0 &&
    cards.every(
      (c: any) =>
        c?.value !== undefined && c?.value !== null && !Number.isNaN(c.value)
    );

  const showEmpty = !marketData || cards.length === 0 || !cardsHaveValidValues;

  return (
    <ContainerSection>
      <Group className={styles.analyticsHeader}>
        <Flex className={styles.headerCol}>
          <TitleSection title={t("Analytics.analitykaRynku")}></TitleSection>
          <TextDescription description={t("Analytics.analitykaRynkuOpis")} />
        </Flex>
        <Select
          label={t("Analytics.wybierzWojewództwo")}
          data={voivodeshipOptions}
          value={voivodeship}
          onChange={(v) => v && setVoivodeship(v)}
          searchable
          clearable={false}
          disabled={loadingVoivodeships || voivodeshipOptions.length === 0}
          placeholder={loadingVoivodeships ? t("Wczytywanie...") : t("Wybierz")}
        />
      </Group>

      {showEmpty ? (
        <EmptyState
          title={t("Brak danych")}
          description={t(
            "Dla wybranego województwa nie ma jeszcze danych lub nie można ich poprawnie zinterpretować. Zmień filtr lub spróbuj ponownie później."
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
          <Grid className={styles.analyticsGrid}>
            {cards.map((c) => (
              <Grid.Col key={c.label} span={{ base: 12, sm: 6, lg: 3 }}>
                <StatisticsCardData {...c} />
              </Grid.Col>
            ))}
          </Grid>

          <Paper className={styles.analyticsPaper}>
            <Title order={3} className={styles.analyticsPaperTitle}>
              {t("Analytics.stanRynku")}
            </Title>
            <MarketAnalyticsChart
              regionName={voivodeship}
              data={marketData!}
              onChartReady={(chart) => {
                chartRef.current = chart;
              }}
            />
          </Paper>
          <ReportGenerator report={reportDefinition} />
        </>
      )}
    </ContainerSection>
  );
}

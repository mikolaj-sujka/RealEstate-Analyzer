"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { HistoricalAnalysisChart } from "./components";
import { DataTable } from "@/components/DataTable";
import { ContainerSection } from "@/components/ContainerSection";
import { TitleSection } from "@/components/UI/TitleSection";
import { TextDescription } from "@/components/UI/TextDescription/TextDescription";
import { useLatestTransactionsTable } from "./hooks/useLatestTransactionsTable";
import { Loader, Center, Alert, Button, Group } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { useHistoricalAnalysisChartState } from "./components/HistoricalAnalysisChart/hooks";

export default function DashboardPage() {
  const { t } = useTranslate();
  const { dataTable, columns, loading, error, refetch } =
    useLatestTransactionsTable();

  const {
    city,
    setCity,
    range,
    setRange,
    selectedMetrics,
    setSelectedMetrics,
    customRange,
    setCustomRange,
    data,
    series,
    showPrediction,
    accentColor,
    secondaryColor,
    showDetailedTooltip,
    height,
    cityOptions,
    loadingHistorical,
    errorHistorical,
    refetchHistorical,
  } = useHistoricalAnalysisChartState();

  return (
    <ContainerSection>
      <HistoricalAnalysisChart
        city={city}
        setCity={setCity}
        range={range}
        setRange={setRange}
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
        customRange={customRange}
        setCustomRange={setCustomRange}
        data={data}
        series={series}
        showPrediction={showPrediction!}
        accentColor={accentColor!}
        secondaryColor={secondaryColor!}
        showDetailedTooltip={showDetailedTooltip!}
        height={height!}
        cityOptions={cityOptions}
        loading={loadingHistorical}
        error={!!errorHistorical}
        refetch={refetchHistorical}
        t={t}
      />

      <TitleSection title={t("Dashboard.ostatnieTransakcje")} />
      <TextDescription description={t("Dashboard.ostatnieTransakcjeOpis")} />

      {loading && (
        <Center my="md">
          <Loader />
        </Center>
      )}

      {!loading && error && (
        <Alert color="red" my="md">
          {t("Dashboard.bladPobieraniaTransakcje")}
          <Group mt="xs">
            <Button
              leftSection={<IconReload size={16} />}
              onClick={() => refetch()}
            >
              {t("Dashboard.odswiezTransakcje")}
            </Button>
          </Group>
        </Alert>
      )}

      {!loading && !error && (
        <DataTable
          data={dataTable}
          columns={columns}
          pageSize={10}
          selectable={false}
        />
      )}
    </ContainerSection>
  );
}

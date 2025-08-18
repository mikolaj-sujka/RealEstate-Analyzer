"use client";

import React from "react";
import {
  Card,
  Group,
  Grid,
  Alert,
  Button,
  Center,
  Loader,
} from "@mantine/core";
import { CitySelect } from "@/components/CitySelect";
import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { CustomDateRangePicker } from "@/components/CustomDateRangePicker";
import { Chart } from "@/components/Chart";
import { MetricsSelector } from "@/components/MetricsMultiSelect";
import { metrics, Range, timeRanges } from "./models";
import { TitleSection, TextDescription } from "@/components/UI";
import * as classes from "./styles";
import { IconReload } from "@tabler/icons-react";
import { t, TFunction } from "i18next";

type HistoricalAnalysisChartProps = {
  city: string;
  setCity: (city: string) => void;
  range: string;
  setRange: (range: Range) => void;
  selectedMetrics: string[];
  setSelectedMetrics: (metrics: string[]) => void;
  customRange: [Date | null, Date | null];
  setCustomRange: (range: [Date | null, Date | null]) => void;
  data: any;
  series: any;
  showPrediction: boolean;
  accentColor: string;
  secondaryColor: string;
  showDetailedTooltip: boolean;
  height: number;
  cityOptions: any[];
  loading: boolean;
  error: boolean;
  refetch: () => void;
  t: TFunction<"translation", undefined>;
};

export const HistoricalAnalysisChart = ({
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
  loading,
  error,
  refetch,
}: HistoricalAnalysisChartProps) => {
  const showOnlyHeader = Boolean(error);

  return (
    <Card className={classes.card}>
      <Group className={classes.group}>
        <TitleSection title={t("Dashboard.analizaHistoryczna")} />
        <TextDescription description={t("Dashboard.analizaHistorycznaOpis")} />
      </Group>

      {loading && (
        <Center my="md">
          <Loader />
        </Center>
      )}

      {!showOnlyHeader && (
        <>
          <Grid className={classes.grid} gutter="md">
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <CitySelect
                value={city}
                onChange={setCity}
                options={cityOptions}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 8 }}>
              <TimeRangeSelector
                value={range}
                onChange={setRange}
                timeRanges={timeRanges}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <CustomDateRangePicker
                value={customRange}
                onChange={setCustomRange}
                disabled={range !== "custom"}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <MetricsSelector
                value={selectedMetrics}
                onChange={setSelectedMetrics}
                metrics={metrics}
              />
            </Grid.Col>
          </Grid>

          <Chart
            data={data}
            series={series}
            showPrediction={showPrediction}
            accentColor={accentColor}
            secondaryColor={secondaryColor}
            showDetailedTooltip={showDetailedTooltip}
            height={height}
          />
        </>
      )}
      {showOnlyHeader && !loading && (
        <>
          <Alert color="red" my="md">
            {t("Dashboard.bladPobieraniaGus")}
            <Group mt="xs">
              <Button
                leftSection={<IconReload size={16} />}
                onClick={() => refetch()}
              >
                {t("Dashboard.odswiezDaneGus")}
              </Button>
            </Group>
          </Alert>
        </>
      )}
    </Card>
  );
};

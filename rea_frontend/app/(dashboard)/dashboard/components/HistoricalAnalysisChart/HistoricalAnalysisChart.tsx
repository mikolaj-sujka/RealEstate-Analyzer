"use client";

import React from "react";
import { Card, Group, Grid } from "@mantine/core";
import { CitySelect } from "@/components/CitySelect";
import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { CustomDateRangePicker } from "@/components/CustomDateRangePicker";
import { Chart } from "@/components/Chart";
import { useHistoricalAnalysisChartState } from "./hooks";
import { MetricsSelector } from "@/components/MetricsMultiSelect";
import { metrics, timeRanges } from "./models";
import { useTranslate } from "@/hooks";
import { TitleSection, TextDescription } from "@/components/UI";
import * as classes from "./styles";

export const HistoricalAnalysisChart = () => {
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
    loading,
    error,
  } = useHistoricalAnalysisChartState();

  const { t } = useTranslate();

  const showOnlyHeader = loading || Boolean(error);

  return (
    <Card className={classes.card}>
      <Group className={classes.group}>
        <TitleSection title={t("Dashboard.analizaHistoryczna")} />
        <TextDescription description={t("Dashboard.analizaHistorycznaOpis")} />
      </Group>

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
    </Card>
  );
};


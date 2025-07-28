"use client";

import { Grid, Box, Text } from "@mantine/core";
import { DateRangePicker } from "@/components/DateRangePicker";
import { MetricsMultiSelect } from "@/components/MetricsMultiSelect";
import { TimeRangeControl } from "../TimeRangeControl";
import { useHistoricalAnalysis } from "./hooks";
import { historicalData, allMetrics } from "./models";
import { Chart } from "@/components/Chart";
import { useTranslation } from "react-i18next";
import { TitleSection } from "@/components/UI/TitleSection";
import { TextDescription } from "@/components/UI/TextDescription";
import * as classes from "./styles";

export const HistoricalAnalysisChart = () => {
  const { range, setRange, setPreset, filtered, series, metrics, setMetrics } =
    useHistoricalAnalysis("1y", historicalData, ["price", "prediction"]);
  const { t } = useTranslation();

  return (
    <>
      <TitleSection title={t("Dashboard.analizaHistoryczna")} />
      <TextDescription description={t("Dashboard.analizaHistorycznaOpis")} />
      <Grid className={classes.controlGrid}>
        <Grid.Col span={{ base: 12, md: "auto" }}>
          <TimeRangeControl value={""} onChange={setPreset} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <DateRangePicker
            value={range as [Date | null, Date | null]}
            onChange={(dates) => {
              if (dates[0] && dates[1]) setRange([dates[0], dates[1]]);
            }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <MetricsMultiSelect
            data={allMetrics}
            value={metrics}
            onChange={setMetrics}
          />
        </Grid.Col>
      </Grid>
      <Box className={classes.chartBox}>
        <Chart data={filtered} series={series} height={300} />
      </Box>
    </>
  );
};

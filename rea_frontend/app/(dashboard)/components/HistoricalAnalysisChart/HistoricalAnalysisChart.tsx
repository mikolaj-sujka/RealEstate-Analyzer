"use client";

import { Paper, Title, Grid, Box } from "@mantine/core";
import type { EChartsOption } from "echarts";
import { useSelectedMetrics } from "@/hooks/useSelectedMetrics";
import { DateRangePicker } from "@/components/DateRangePicker";
import { MetricsMultiSelect } from "@/components/MetricsMultiSelect";
import { TimeRangeControl } from "../TimeRangeControl";
import { useDateRange } from "./hooks";
import { historicalData, allMetrics, metricColors } from "./models";
import * as echarts from "echarts";
import { Chart } from "@/components/Chart";

export const HistoricalAnalysisChart = () => {
  const { range, setPreset, setRange, filtered } = useDateRange(
    12,
    historicalData
  );
  const { selected, setSelected } = useSelectedMetrics(["price", "prediction"]);

  const chartSeries: EChartsOption["series"] = selected.map((metric) => ({
    name: allMetrics.find((m) => m.value === metric)?.label,
    type: "line",
    data: filtered.map((item) => (item as any)[metric]),
    smooth: true,
    lineStyle: {
      color: metricColors[metric],
      width: metric === "prediction" ? 2 : 3,
      type: metric === "prediction" ? "dashed" : "solid",
    },
    itemStyle: {
      color: metricColors[metric],
      borderWidth: 2,
      borderColor: "#fff",
    },
    areaStyle:
      metric === "price"
        ? {
            color: new (echarts.graphic as any).LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${metricColors.price}20` },
              { offset: 1, color: `${metricColors.price}05` },
            ]),
          }
        : undefined,
    emphasis: { focus: "series" },
  }));

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        Analiza Historyczna
      </Title>
      <Grid align="flex-end">
        <Grid.Col span={{ base: 12, md: "auto" }}>
          <TimeRangeControl
            value={(() => {
              const months =
                (new Date().getTime() - range[0].getTime()) /
                (1000 * 60 * 60 * 24 * 30);
              if (months <= 3) return "3m";
              if (months <= 6) return "6m";
              if (months <= 12) return "1y";
              return "all";
            })()}
            onChange={setPreset}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <DateRangePicker
            value={range}
            onChange={(dates) => setRange(dates as [Date, Date])}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <MetricsMultiSelect
            data={allMetrics}
            value={selected}
            onChange={setSelected}
          />
        </Grid.Col>
      </Grid>
      <Box h={300} mt="xl">
        <Chart data={filtered} series={chartSeries} height={300} />
      </Box>
    </Paper>
  );
}

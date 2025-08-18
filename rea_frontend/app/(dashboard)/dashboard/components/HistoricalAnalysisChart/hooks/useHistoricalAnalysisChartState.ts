"use client";

import { useEffect, useMemo, useState } from "react";
import { rem } from "@mantine/core";
import type { SeriesOption } from "echarts";
import type { ChartProps } from "@/components/Chart/hooks";
import { metrics, Range } from "../models";
import { useGusHistoricalAnalysis } from "./useHistoricalAnalysis";
import { useGusCities } from "@/hooks";

export const useHistoricalAnalysisChartState = (): {
  city: string;
  setCity: (city: string | null) => void;
  range: string;
  setRange: (range: Range) => void;
  selectedMetrics: string[];
  setSelectedMetrics: (m: string[]) => void;
  customRange: [Date | null, Date | null];
  setCustomRange: (r: [Date | null, Date | null]) => void;
  cityOptions: { value: string; label: string }[];
  loadingHistorical: boolean;
  errorHistorical: string | null;
  refetchHistorical: () => void;
} & ChartProps => {
  const [city, setCity] = useState<string | null>("Warszawa");
  const [range, setRange] = useState<Range>("3y");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "averagePricePerSqm",
    "medianPricePerSqm",
  ]);
  const [customRange, setCustomRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const { options: cityOptions } = useGusCities();

  useEffect(() => {
    if (!cityOptions || cityOptions.length === 0) return;

    const hasCurrent =
      city != null && cityOptions.some((o) => o.value === city);

    if (!hasCurrent) {
      const warszawa =
        cityOptions.find(
          (o) => o.value.toLocaleLowerCase("pl-PL") === "powiat m. st. warszawa"
        )?.value ?? null;

      setCity(warszawa);
    }
  }, [cityOptions, city]);

  const safeCity = city ?? "Warszawa";

  const { data, loadingHistorical, errorHistorical, refetchHistorical } = useGusHistoricalAnalysis(
    safeCity,
    range,
    customRange
  );

  const accentColor = "#3b82f6";
  const secondaryColor = "#818cf8";
  const showDetailedTooltip = false;

  const isDarkMode =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-mantine-color-scheme") ===
      "dark";
  const itemBorderColor = isDarkMode ? "#1a1b1e" : "#fff";

  const series: SeriesOption[] = useMemo(
    () =>
      selectedMetrics.map((key) => {
        const m = metrics.find((x) => x.value === key)!;
        return {
          name: m.label!,
          type: "line",
          smooth: true,
          data: data.map((d: any) => d[key as keyof typeof d]),
          lineStyle: {
            color: m.color,
            width: key === "forecast" ? 2 : 3,
            type: key === "forecast" ? "dashed" : "solid",
          },
          itemStyle: {
            color: m.color,
            borderWidth: 2,
            borderColor: itemBorderColor,
          },
          areaStyle: {
            opacity: 0.2,
            color: new (require("echarts").graphic.LinearGradient)(0, 0, 0, 1, [
              { offset: 0, color: `${m.color}20` },
              { offset: 1, color: `${m.color}05` },
            ]),
          },
        } as SeriesOption;
      }),
    [data, selectedMetrics, itemBorderColor]
  );

  const height = parseInt(rem(400), 10);

  return {
    data,
    series,
    accentColor,
    secondaryColor,
    showDetailedTooltip,
    height,
    city: safeCity, // zawsze niepuste w górę
    setCity,
    range,
    setRange,
    selectedMetrics,
    setSelectedMetrics,
    customRange,
    setCustomRange,
    cityOptions,
    loadingHistorical,
    errorHistorical,
    refetchHistorical,
  };
};


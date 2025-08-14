// src/hooks/useHistoricalAnalysisChartState.ts
import { useState, useMemo } from "react";
import { rem } from "@mantine/core";
import type { SeriesOption } from "echarts";
import type { ChartProps } from "@/components/Chart/hooks";
import { useHistoricalData } from "./useHistoricalAnalysis";
import { metrics, Range } from "../models";

export const useHistoricalAnalysisChartState = (): {
    city: string | null;
    setCity: (city: string | null) => void;
    range: string;
    setRange: (range: Range) => void;
    selectedMetrics: string[];
    setSelectedMetrics: (m: string[]) => void;
    customRange: [Date | null, Date | null];
    setCustomRange: (r: [Date | null, Date | null]) => void;
} & ChartProps => {
    const [city, setCity] = useState<string | null>("warszawa");
    const [range, setRange] = useState<Range>("1y");
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
        "price",
        "forecast",
    ]);
    const [customRange, setCustomRange] = useState<[Date | null, Date | null]>([
        null,
        null,
    ]);

    const data = useHistoricalData(city, range, customRange) || [];

    const showPrediction = selectedMetrics.includes("forecast");
    const accentColor = "#3b82f6";
    const secondaryColor = "#818cf8";
    const showDetailedTooltip = false;

    // Detect dark mode for dynamic border colors
    const isDarkMode = typeof document !== 'undefined' && 
        document.documentElement.getAttribute('data-mantine-color-scheme') === 'dark';
    const itemBorderColor = isDarkMode ? '#1a1b1e' : '#fff';

    const series: SeriesOption[] = useMemo(
        () =>
            selectedMetrics.map((key) => {
                const m = metrics.find((x) => x.value === key)!;
                return {
                    name: m.label,
                    type: "line" as const,
                    smooth: true,
                    data: data.map((d) => d[key as keyof typeof d]),
                    lineStyle: {
                        color: m.color,
                        width: key === "forecast" ? 2 : 3,
                        type: key === "forecast" ? ("dashed" as const) : ("solid" as const),
                    },
                    itemStyle: {
                        color: m.color,
                        borderWidth: 2,
                        borderColor: itemBorderColor,
                    },
                    areaStyle: {
                        opacity: 0.2,
                        color: new (require("echarts").graphic.LinearGradient)(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: `${m.color}20` },
                                { offset: 1, color: `${m.color}05` },
                            ]
                        ),
                    },
                } as SeriesOption;
            }),
        [data, selectedMetrics, itemBorderColor]
    );

    const height = parseInt(rem(400), 10); 

    return {
        data,
        series,
        showPrediction,
        accentColor,
        secondaryColor,
        showDetailedTooltip,
        height,
        city,
        setCity,
        range,
        setRange,
        selectedMetrics,
        setSelectedMetrics,
        customRange,
        setCustomRange
    };
}

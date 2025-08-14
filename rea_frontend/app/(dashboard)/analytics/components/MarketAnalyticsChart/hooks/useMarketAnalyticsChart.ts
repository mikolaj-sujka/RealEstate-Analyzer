"use client";
import { useEffect, useRef, useCallback } from "react";
import * as echarts from "echarts";
import type { ECharts, EChartsOption } from "echarts";
import { VoivodeshipMarketData } from "@/services/api/models";

const EMPTY: VoivodeshipMarketData = {
  averagePricePerSqm: 0,
  averageFlatSize: 0,
  totalOffers: 0,
  developerMarketShare: 0,
  primaryMarketShare: 0,
  medianPricePerSqm: 0,
  averageBuildingsBuiltYear: 0,
};

export const useMarketAnalyticsChart = (
  regionName: string,
  series: VoivodeshipMarketData | undefined | null,
  onReady?: (chart: ECharts) => void
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ECharts | null>(null);

  const buildOption = useCallback(
    (last: VoivodeshipMarketData): EChartsOption => {
      const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
      const yearNow = new Date().getFullYear();

      const s = {
        avgAreaMax: 80,
        offersMax: Math.max(1000, last.totalOffers || 0),
        yearMin: 1950,
        yearMax: yearNow,
        priceMax: Math.max(
          15000,
          Math.max(last.medianPricePerSqm || 0, last.averagePricePerSqm || 0)
        ),
      };

      const nArea = clamp01((last.averageFlatSize || 0) / s.avgAreaMax);
      const nList = clamp01((last.totalOffers || 0) / s.offersMax);
      const nYear = clamp01(
        ((last.averageBuildingsBuiltYear || s.yearMin) - s.yearMin) /
          Math.max(1, s.yearMax - s.yearMin)
      );
      const nDev = clamp01(last.developerMarketShare || 0);
      const nMedian = clamp01((last.medianPricePerSqm || 0) / s.priceMax);
      const nPrim = clamp01(last.primaryMarketShare || 0);

      const data = [
        {
          key: "Śr. metraż",
          value: nArea,
          abs: `${Math.round(last.averageFlatSize || 0)} m²`,
        },
        {
          key: "Liczba ofert",
          value: nList,
          abs: (last.totalOffers || 0).toLocaleString("pl-PL"),
        },
        {
          key: "Śr. rok budowy",
          value: nYear,
          abs: `${last.averageBuildingsBuiltYear || 0}`,
        },
        {
          key: "Udział deweloperów",
          value: nDev,
          abs: `${Math.round(last.developerMarketShare || 0)}%`,
        },
        {
          key: "Mediana ceny",
          value: nMedian,
          abs: `${(last.medianPricePerSqm || 0).toLocaleString("pl-PL")} PLN`,
        },
        {
          key: "Udział pierwotny",
          value: nPrim,
          abs: `${Math.round(last.primaryMarketShare || 0)}%`,
        },
      ];

      return {
        backgroundColor: "transparent",
        color: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
        title: {
          text: regionName,
          left: "center",
          top: "45%",
          textStyle: {
            fontSize: 16,
            fontWeight: 600,
            color: "#111827",
            align: "center",
          },
          subtext: "KPI rynku ",
          subtextStyle: { color: "#6b7280", fontSize: 12 },
        },
        tooltip: {
          trigger: "item",
          formatter: (p: any) => {
            const d = data[p.dataIndex];
            return `<b>${d.key}</b><br/>Wartość: <b>${
              d.abs
            }</b><br/>Udział (norm.): ${(d.value * 100).toFixed(0)}%`;
          },
        },
        legend: { bottom: 0, type: "scroll" },
        series: [
          {
            name: "Region KPIs",
            type: "pie",
            radius: ["48%", "72%"],
            center: ["50%", "50%"],
            clockwise: false,
            padAngle: 2,
            avoidLabelOverlap: true,
            label: {
              show: true,
              alignTo: "edge",
              edgeDistance: 10,
              formatter: (p: any) => {
                const d = data[p.dataIndex];
                return `{name|${d.key}}\n{val|${d.abs}}`;
              },
              rich: {
                name: {
                  fontSize: 12,
                  color: "#111827",
                  lineHeight: 18,
                  fontWeight: 600,
                },
                val: { fontSize: 12, color: "#6b7280" },
              },
            },
            labelLine: { show: true, length: 12, length2: 10 },
            data: data.map((d) => ({
              name: d.key,
              value: +(d.value * 100).toFixed(2),
            })),
          },
        ],
      };
    },
    [regionName]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current);
      onReady?.(chartRef.current);
    }
    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [onReady]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    if (!series || Object.keys(series).length === 0) {
      chart.setOption(buildOption(EMPTY), { notMerge: true });
      return;
    }

    chart.setOption(buildOption(series!), { notMerge: true });
  }, [series, buildOption]);

  // resize
  useEffect(() => {
    const onResize = () => chartRef.current?.resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { containerRef, chartInstance: chartRef.current };
};

"use client";

import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Box } from "@mantine/core";
import { useTranslate } from "@/hooks/useTranslate";
import { buildHistogram } from "../../utils";
import { TitleSection } from "@/components/UI";

type ResultsChartProps = {
  distribution: number[];
};

export const ResultsChart: React.FC<ResultsChartProps> = ({ distribution }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslate();

  useEffect(() => {
    if (!distribution.length || !chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    const bins = buildHistogram(distribution, 20);
    const categories = bins.map(
      (b) => `${b.start.toFixed(1)}–${b.end.toFixed(1)}`
    );
    const counts = bins.map((b) => b.count);

    const option = {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: categories,
        name: "ROI (%)",
        nameLocation: "middle",
        nameGap: 30,
      },
      yAxis: { type: "value", name: "Liczba scenariuszy" },
      series: [
        { type: "bar", name: "Rozkład ROI", data: counts, barWidth: "90%" },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [distribution]);

  return (
    <>
      <TitleSection
        title={t("InvestmentCalculator.rozkładPrawdopodobieństwaROI")}
      />
      <Box ref={chartRef} style={{ width: "100%", height: "350px" }} />
    </>
  );
};

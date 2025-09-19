"use client";
import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { CityComparisonData } from "@/services/api/models";

type Props = {
  data: CityComparisonData[];
  selectedCities: string[];
};

const fmtInt = (v: number) => (v ?? 0).toLocaleString("pl-PL");
const fmtPln = (v: number) =>
  (v ?? 0).toLocaleString("pl-PL", { maximumFractionDigits: 0 });

export const BarChart: React.FC<Props> = ({ data, selectedCities }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);

    const src = data
      .filter((d) => selectedCities.includes(d.city))
      .map((d) => ({
        city: d.city,
        price: d.averagePrice,
        offers: d.totalOffers,
        share: d.primaryMarketShare, // %
      }));

    const shareMin = src.length ? Math.min(...src.map((s) => s.share)) : 0;
    const shareMax = src.length ? Math.max(...src.map((s) => s.share)) : 100;

    const avg = (arr: number[]) =>
      arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    const avgPrice = avg(src.map((s) => s.price));
    const avgOffers = avg(src.map((s) => s.offers));

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      grid: { left: 64, right: 115, top: 36, bottom: 64, containLabel: true },
      legend: { top: 4 },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params: any) => {
          const p = Array.isArray(params) ? params : [params];
          const row = p[0]?.data ?? {};
          const price = src.find((s) => s.city === row?.city)?.price ?? 0;
          const offers = src.find((s) => s.city === row?.city)?.offers ?? 0;
          const share = src.find((s) => s.city === row?.city)?.share ?? 0;
          return `
            <div style="min-width:180px">
              <b>${row.city ?? ""}</b><br/>
              Cena: <b>${fmtPln(price)} PLN/m²</b><br/>
              Oferty: <b>${fmtInt(offers)}</b><br/>
              Udział pierw.: <b>${share.toFixed(1)}%</b>
            </div>`;
        },
      },
      dataset: { source: src },
      xAxis: {
        type: "category",
        axisLabel: {
          interval: 0,
          rotate: src.length > 8 ? 30 : 0,
        },
      },
      yAxis: [
        {
          type: "value",
          name: "Cena (PLN/m²)",
          axisLabel: { formatter: (v: number) => fmtPln(v) },
        },
        {
          type: "value",
          name: "Oferty",
          axisLabel: { formatter: (v: number) => fmtInt(v) },
        },
      ],
      dataZoom: [
        { type: "inside", xAxisIndex: 0 },
        { type: "slider", xAxisIndex: 0, height: 16, bottom: 8 },
      ],
      toolbox: {
        feature: {
          saveAsImage: {},
        },
        right: 8,
      },
      series: [
        {
          type: "bar",
          name: "Cena",
          encode: { x: "city", y: "price" },
          yAxisIndex: 0,
          barMaxWidth: 36,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            shadowBlur: 6,
            shadowColor: "rgba(0,0,0,.08)",
            color: (p: any) => {
              const s = p.data?.share ?? 0; // 0..100
              const hue = 210 + (Math.min(Math.max(s, 0), 100) / 100) * 130;
              return `hsl(${hue},70%,55%)`;
            },
          },
          label: {
            show: true,
            position: "top",
            formatter: (p: any) => fmtPln(p.value?.price ?? p.data?.price),
          },
          markLine: {
            symbol: "none",
            label: { formatter: `Śr. cena: ${fmtPln(avgPrice)} PLN/m²` },
            lineStyle: { type: "dashed", opacity: 0.7 },
            data: [{ yAxis: avgPrice }],
          },
          emphasis: { focus: "series" },
          universalTransition: true,
        },
        {
          type: "line",
          name: "Transakcje / Oferty",
          encode: { x: "city", y: "offers" },
          yAxisIndex: 1,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { width: 3, opacity: 0.9 },
          itemStyle: { borderWidth: 2 },
          markLine: {
            symbol: "none",
            label: { formatter: `Śr. oferty: ${fmtInt(avgOffers)}` },
            lineStyle: { type: "dashed", opacity: 0.7 },
            data: [{ yAxis: avgOffers }],
          },
          emphasis: { focus: "series" },
          universalTransition: true,
        },
      ],
    };

    chart.setOption(option);

    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [data, selectedCities]);

  return <div ref={ref} style={{ width: "100%", height: 420 }} />;
};

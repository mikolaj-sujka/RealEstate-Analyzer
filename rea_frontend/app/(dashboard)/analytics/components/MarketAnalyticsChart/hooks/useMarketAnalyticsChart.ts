"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { MarketAnalyticsData } from "../../../models/types/MarketAnalyticsData";

export const useMarketAnalyticsChart = (data: MarketAnalyticsData[]) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        chartRef.current = echarts.init(containerRef.current);
        return () => {
            chartRef.current?.dispose();
        };
    }, []);

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart || data.length === 0) return;

        const months = data.map((d) => d.month);
        const avgPrices = data.map((d) => d.averagePrice);
        const listings = data.map((d) => d.listings);
        const sales = data.map((d) => d.sales);
        const inventory = data.map((d) => d.totalInventory);

        const option: echarts.EChartsOption = {
            backgroundColor: "transparent",
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                textStyle: { color: "#374151" },
                axisPointer: { type: "cross", crossStyle: { color: "#999" } },
                formatter: (params) => {
                    if (Array.isArray(params)) {
                        let html = `${params[0].name}<br/>`;
                        params.forEach((p) => {
                            html += `${p.marker} ${p.seriesName}: <strong>${Number(p.value).toLocaleString("pl-PL")}</strong><br/>`;
                        });
                        return html;
                    } else {
                        return `${params.marker} ${params.seriesName}: <strong>${Number(params.value).toLocaleString("pl-PL")}</strong>`;
                    }
                },
            },
            legend: {
                data: ["Średnia Cena", "Nowe Oferty", "Wolumen Sprzedaży", "Zapasy"],
                top: 10,
                textStyle: { color: "#6b7280" },
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "category",
                data: months,
                axisLine: { lineStyle: { color: "#e5e7eb" } },
                axisLabel: { color: "#6b7280" },
            },
            yAxis: [
                {
                    type: "value",
                    name: "Cena (PLN)",
                    position: "left",
                    axisLine: { lineStyle: { color: "#3b82f6" } },
                    axisLabel: { color: "#6b7280" },
                    splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
                },
                {
                    type: "value",
                    name: "Liczba",
                    position: "right",
                    axisLine: { lineStyle: { color: "#10b981" } },
                    axisLabel: { color: "#6b7280" },
                },
            ],
            series: [
                {
                    name: "Średnia Cena",
                    type: "line",
                    yAxisIndex: 0,
                    data: avgPrices,
                    smooth: true,
                    lineStyle: { color: "#3b82f6", width: 3 },
                    itemStyle: { color: "#3b82f6", borderColor: "#fff", borderWidth: 2 },
                    areaStyle: {
                        opacity: 0.2,
                        color: "#3b82f6",
                    },
                },
                {
                    name: "Nowe Oferty",
                    type: "bar",
                    yAxisIndex: 1,
                    data: listings,
                    barWidth: 60,
                    itemStyle: { color: "#10b981" },
                },
                {
                    name: "Wolumen Sprzedaży",
                    type: "line",
                    yAxisIndex: 1,
                    data: sales,
                    smooth: true,
                    lineStyle: { color: "#f59e0b", width: 2 },
                    itemStyle: { color: "#f59e0b" },
                },
                {
                    name: "Zapasy",
                    type: "line",
                    yAxisIndex: 1,
                    data: inventory,
                    smooth: true,
                    lineStyle: { color: "#ef4444", width: 2, type: "dashed" },
                    itemStyle: { color: "#ef4444" },
                },
            ],
            animationEasing: "cubicOut",
        };

        chart.setOption(option);
    }, [data]);

    useEffect(() => {
        const onResize = () => chartRef.current?.resize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return containerRef;
}

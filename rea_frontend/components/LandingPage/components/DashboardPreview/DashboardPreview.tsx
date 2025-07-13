"use client";

import { useEffect, useRef } from "react";
import { Box, Paper, SimpleGrid, Text, Group, ThemeIcon } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { motion } from "framer-motion";
import { IconTrendingUp, IconHome, IconChartBar } from "@tabler/icons-react";
import * as echarts from "echarts";

const LiveChart = ({
  title,
  icon: Icon,
  color,
}: {
  title: string;
  icon: any;
  color: string;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const data = Array.from({ length: 12 }, (_, i) => ({
      month: [
        "Sty",
        "Lut",
        "Mar",
        "Kwi",
        "Maj",
        "Cze",
        "Lip",
        "Sie",
        "Wrz",
        "Paź",
        "Lis",
        "Gru",
      ][i],
      value: Math.floor(Math.random() * 5000) + 8000 + i * 200,
    }));

    const option = {
      backgroundColor: "transparent",
      grid: { left: "5%", right: "5%", top: "15%", bottom: "15%" },
      xAxis: {
        type: "category",
        data: data.map((d) => d.month),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "rgba(255,255,255,0.6)", fontSize: 10 },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          data: data.map((d) => d.value),
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: { color, width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${color}40` },
              { offset: 1, color: `${color}00` },
            ]),
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [color]);

  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        height: 140,
      }}
    >
      <Group justify="space-between" mb="xs">
        <Text size="sm" c="rgba(255,255,255,0.8)" fw={500}>
          {title}
        </Text>
        <ThemeIcon variant="light" color={color.replace("#", "")} size="sm">
          <Icon size={14} />
        </ThemeIcon>
      </Group>
      <div ref={chartRef} style={{ width: "100%", height: "80px" }} />
    </Paper>
  );
};

const MainChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const months = [
      "Sty",
      "Lut",
      "Mar",
      "Kwi",
      "Maj",
      "Cze",
      "Lip",
      "Sie",
      "Wrz",
      "Paź",
      "Lis",
      "Gru",
    ];
    const priceData = months.map(
      (_, i) => 12000 + i * 150 + Math.random() * 500
    );
    const volumeData = months.map(
      (_, i) => 1500 + i * 50 + Math.random() * 200
    );

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderColor: "rgba(255,255,255,0.2)",
        textStyle: { color: "#fff" },
      },
      legend: {
        data: ["Średnia Cena", "Wolumen Transakcji"],
        textStyle: { color: "rgba(255,255,255,0.8)" },
        top: 10,
      },
      grid: { left: "5%", right: "5%", top: "20%", bottom: "15%" },
      xAxis: {
        type: "category",
        data: months,
        axisLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
        axisLabel: { color: "rgba(255,255,255,0.6)" },
      },
      yAxis: [
        {
          type: "value",
          name: "Cena (PLN)",
          nameTextStyle: { color: "rgba(255,255,255,0.6)" },
          axisLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
          axisLabel: { color: "rgba(255,255,255,0.6)" },
          splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
        },
        {
          type: "value",
          name: "Transakcje",
          nameTextStyle: { color: "rgba(255,255,255,0.6)" },
          axisLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
          axisLabel: { color: "rgba(255,255,255,0.6)" },
        },
      ],
      series: [
        {
          name: "Średnia Cena",
          type: "line",
          yAxisIndex: 0,
          data: priceData,
          smooth: true,
          lineStyle: { color: "#228be6", width: 3 },
          itemStyle: { color: "#228be6" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#228be640" },
              { offset: 1, color: "#228be600" },
            ]),
          },
        },
        {
          name: "Wolumen Transakcji",
          type: "bar",
          yAxisIndex: 1,
          data: volumeData,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#0ca678" },
              { offset: 1, color: "#0ca67880" },
            ]),
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        height: 220,
      }}
    >
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </Paper>
  );
};

export const DashboardPreview = () => {
  const reduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <Box
      style={{
        width: "100%",
        maxWidth: "1000px",
        position: "relative",
        zIndex: 3,
        marginTop: "-2rem",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={reduceMotion ? {} : variants}
      >
        <Paper
          shadow="xl"
          radius="lg"
          p="lg"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <SimpleGrid cols={3} spacing="md" mb="md">
            <LiveChart title="Ceny Mieszkań" icon={IconHome} color="#228be6" />
            <LiveChart
              title="Wolumen Sprzedaży"
              icon={IconChartBar}
              color="#0ca678"
            />
            <LiveChart
              title="Trend Wzrostowy"
              icon={IconTrendingUp}
              color="#f76707"
            />
          </SimpleGrid>
          <MainChart />
        </Paper>
      </motion.div>
    </Box>
  );
}

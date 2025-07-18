"use client";

import React, { useState, useRef, useEffect } from "react";
import * as echarts from "echarts";
import {
  Paper,
  Title,
  Text,
  Grid,
  Group,
  Slider,
  Button,
  NumberInput,
  Box,
  LoadingOverlay,
  Card,
} from "@mantine/core";
import {
  IconChartHistogram,
  IconPercentage,
  IconPigMoney,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useTranslate } from "@/hooks/useTranslate";

/**
 * Build histogram bins for numeric data.
 */
function buildHistogram(data: number[], binCount = 20) {
  if (!data.length) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const width = (max - min) / binCount || 1;
  const bins = Array.from({ length: binCount }, (_, i) => ({
    start: min + i * width,
    end: min + (i + 1) * width,
    count: 0,
  }));
  data.forEach((val) => {
    const idx = val === max ? binCount - 1 : Math.floor((val - min) / width);
    bins[idx].count += 1;
  });
  return bins;
}

const runMonteCarloSimulation = (
  initial: number,
  years: number,
  annualContribution: number,
  meanPriceGrowth: number,
  stdDevPriceGrowth: number,
  meanRentYield: number,
  stdDevRentYield: number,
  simulations = 1000
) => {
  const results: number[] = [];
  for (let i = 0; i < simulations; i++) {
    let value = initial;
    for (let y = 0; y < years; y++) {
      const priceGrowth =
        meanPriceGrowth + stdDevPriceGrowth * (Math.random() * 2 - 1);
      const rentYield =
        meanRentYield + stdDevRentYield * (Math.random() * 2 - 1);
      value *= 1 + priceGrowth / 100;
      value += value * (rentYield / 100);
      value += annualContribution;
    }
    results.push(value);
  }
  return results;
};

export const InvestmentSimulator: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [initialInvestment, setInitialInvestment] = useState(500000);
  const [years, setYears] = useState(10);
  const [priceGrowth, setPriceGrowth] = useState(5);
  const [rentYield, setRentYield] = useState(4);
  const [inflation, setInflation] = useState(3);
  const [interestRate, setInterestRate] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    roi: number;
    npv: number;
    irr: number;
    distribution: number[];
  } | null>(null);

  const handleSimulation = () => {
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const finals = runMonteCarloSimulation(
        initialInvestment,
        years,
        0,
        priceGrowth,
        2,
        rentYield,
        1
      );
      const total = initialInvestment;
      const rois = finals.map((v) => ((v - total) / total) * 100);
      const avgFinal = finals.reduce((a, b) => a + b, 0) / finals.length;
      const avgRoi = ((avgFinal - total) / total) * 100;
      const discount = (interestRate - inflation) / 100;
      const cashFlows = [-initialInvestment];
      for (let i = 0; i < years - 1; i++)
        cashFlows.push(initialInvestment * (rentYield / 100));
      cashFlows.push(initialInvestment * (rentYield / 100) + avgFinal);
      const npv = cashFlows.reduce(
        (acc, v, i) => acc + v / Math.pow(1 + discount, i),
        0
      );
      setResult({ roi: avgRoi, npv, irr: avgRoi / years, distribution: rois });
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!result || !chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    const bins = buildHistogram(result.distribution, 20);
    const categories = bins.map(
      (b) => `${b.start.toFixed(1)}–${b.end.toFixed(1)}`
    );
    const counts = bins.map((b) => b.count);
    chart.setOption({
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
    });
    window.addEventListener("resize", () => chart.resize());
    return () => {
      window.removeEventListener("resize", () => chart.resize());
      chart.dispose();
    };
  }, [result]);

  const { t } = useTranslate();

  return (
    <>
      <Title order={3}>{t("InvestmentCalculator.symulatorOpłacalnościInwestycji")}</Title>

      <Text c="dimmed" size="sm" mb="xl">
        {t("InvestmentCalculator.analizaWhatIf")}
      </Text>

      {/* PARAMS ------------------------------------------------------------- */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Title order={5} mb="sm">
            Parametry Inwestycji
          </Title>
          <NumberInput
            label="Wartość inwestycji (PLN)"
            value={initialInvestment}
            onChange={(v) => setInitialInvestment(Number(v))}
            step={50_000}
            min={100_000}
            mb="sm"
          />
          <NumberInput
            label="Horyzont inwestycyjny (lata)"
            value={years}
            onChange={(v) => setYears(Number(v))}
            min={1}
            max={30}
            mb="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Title order={5} mb="sm">
            Scenariusze Makroekonomiczne
          </Title>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm">Śr. roczny wzrost cen (%)</Text>
              <Slider
                min={-5}
                max={15}
                step={0.5}
                value={priceGrowth}
                onChange={setPriceGrowth}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">Roczny zysk z najmu (%)</Text>
              <Slider
                min={1}
                max={10}
                step={0.25}
                value={rentYield}
                onChange={setRentYield}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">Inflacja (%)</Text>
              <Slider
                min={0}
                max={10}
                step={0.25}
                value={inflation}
                onChange={setInflation}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">Stopa procentowa kredytu (%)</Text>
              <Slider
                min={2}
                max={12}
                step={0.25}
                value={interestRate}
                onChange={setInterestRate}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Group justify="center" mt="lg">
        <Button size="lg" onClick={handleSimulation} loading={isLoading}>
          Uruchom Symulację
        </Button>
      </Group>

      {/* RESULTS ------------------------------------------------------------ */}
      <Box mt="xl" style={{ minHeight: "400px", position: "relative" }}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        {result && !isLoading && (
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={4} mb="md">
                Rozkład Prawd. Stopy Zwrotu (ROI)
              </Title>
              <div ref={chartRef} style={{ width: "100%", height: "350px" }} />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Title order={4} mb="md">
                Kluczowe Wskaźniki
              </Title>

              <Card withBorder p="md" radius="md" mb="sm">
                <Group>
                  <IconTrendingUp
                    size={32}
                    color="var(--mantine-color-green-6)"
                  />
                  <Box>
                    <Text c="dimmed" size="sm">
                      Średnie ROI
                    </Text>
                    <Text fw={700} size="xl">
                      {result.roi.toFixed(2)}%
                    </Text>
                  </Box>
                </Group>
              </Card>

              <Card withBorder p="md" radius="md" mb="sm">
                <Group>
                  <IconPigMoney size={32} color="var(--mantine-color-blue-6)" />
                  <Box>
                    <Text c="dimmed" size="sm">
                      NPV
                    </Text>
                    <Text fw={700} size="xl">
                      {result.npv.toLocaleString("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                      })}
                    </Text>
                  </Box>
                </Group>
              </Card>

              <Card withBorder p="md" radius="md">
                <Group>
                  <IconPercentage
                    size={32}
                    color="var(--mantine-color-violet-6)"
                  />
                  <Box>
                    <Text c="dimmed" size="sm">
                      IRR
                    </Text>
                    <Text fw={700} size="xl">
                      {result.irr.toFixed(2)}%
                    </Text>
                  </Box>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
        )}
      </Box>
    </>
  );
};

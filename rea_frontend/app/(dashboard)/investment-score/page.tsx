"use client";

import React from "react";
import {
  Paper,
  Title,
  Text,
  Group,
  Button,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { WeightsSliders, PartialScores } from "./components";
import { useInvestmentCalculator } from "./hooks";
import { cityInvestmentData } from "./models";
import { ParameterForm } from "@/components/ParameterForm";
import { GaugeChart } from "@/components/GaugeChart";
import { useTranslate } from "@/hooks/useTranslate";

export default function InvestmentScoreCalculator() {
  const {
    cities,
    selectedCity,
    setSelectedCity,
    propertyType,
    setPropertyType,
    propertySize,
    setPropertySize,
    weights,
    setWeights,
    result,
    loading,
    calculate,
  } = useInvestmentCalculator(cityInvestmentData);

  const { t } = useTranslate();

  return (
    <Paper shadow="sm" p="lg" withBorder>
      <Group justify="space-between" mb="sm">
        <Title order={2}>{t("InvestmentScore.kalkulatorPotencjałuInwestycyjnego")}</Title>
      </Group>
      <Text mb="md" c="dimmed">
        {t("InvestmentScore.narzędzieAHP")}
      </Text>

      <ParameterForm
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        propertyType={propertyType}
        onTypeChange={setPropertyType}
        propertySize={propertySize}
        onSizeChange={setPropertySize}
      />

      <Box mt="lg">
        <WeightsSliders
          weights={weights}
          onChange={(key, value) =>
            setWeights((prev) => ({ ...prev, [key]: value }))
          }
        />
      </Box>

      <Group justify="center" mt="xl">
        <Button onClick={calculate} loading={loading} disabled={!selectedCity}>
          Oblicz Score
        </Button>
      </Group>

      <Box mt="xl" style={{ position: "relative", minHeight: 350 }}>
        <LoadingOverlay visible={loading} />
        {result && !loading && (
          <>
            <GaugeChart score={result.totalScore} />
            <Title order={3} mt="md" mb={"md"}>
              {t("InvestmentScore.wynikiCzastkowe")}
            </Title>
            <PartialScores partial={result.partialScores} />
          </>
        )}
      </Box>
    </Paper>
  );
}

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

// type InvestmentScoreCalculatorProps = {
//   cityInvestmentData: Record<string, CityInvestmentFactors>;
// };

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

  return (
    <Paper shadow="sm" p="lg" withBorder>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Kalkulator Potencjału Inwestycyjnego</Title>
      </Group>
      <Text mb="xl" c="dimmed">
        Narzędzie AHP do oceny atrakcyjności inwestycyjnej.
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
              Wyniki cząstkowe
            </Title>
            <PartialScores partial={result.partialScores} />
          </>
        )}
      </Box>
    </Paper>
  );
}

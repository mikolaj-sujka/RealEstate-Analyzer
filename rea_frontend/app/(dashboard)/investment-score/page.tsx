"use client";

import React from "react";
import {
  Title,
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
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TextDescription, TitleSection } from "@/components/UI";
import * as classes from "./styles";

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
    <ContainerSection>
      <TitleSection
        title={t("InvestmentScore.kalkulatorPotencjałuInwestycyjnego")}
      />
      <TextDescription description={t("InvestmentScore.narzędzieAHP")} />

      <ParameterForm
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        propertyType={propertyType}
        onTypeChange={setPropertyType}
        propertySize={propertySize}
        onSizeChange={setPropertySize}
      />

      <Box className={classes.weightsWrapper}>
        <WeightsSliders
          weights={weights}
          onChange={(key, value) =>
            setWeights((prev) => ({ ...prev, [key]: value }))
          }
        />
      </Box>

      <Group className={classes.calculateGroup}>
        <Button onClick={calculate} loading={loading} disabled={!selectedCity}>
          Oblicz Score
        </Button>
      </Group>

      <Box className={classes.resultContainer}>
        <LoadingOverlay visible={loading} />
        {result && !loading && (
          <>
            <GaugeChart score={result.totalScore} />
            <Title order={3} className={classes.partialTitle}>
              {t("InvestmentScore.wynikiCzastkowe")}
            </Title>
            <PartialScores partial={result.partialScores} />
          </>
        )}
      </Box>
    </ContainerSection>
  );
}

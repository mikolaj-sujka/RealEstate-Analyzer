"use client";

import { Paper, Grid, Group, Box, LoadingOverlay, Flex } from "@mantine/core";
import { IconShieldCheck } from "@tabler/icons-react";
import { useTranslate } from "@/hooks/useTranslate";
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TextDescription, TitleSection } from "@/components/UI";
import * as classes from "./styles/investorCenterStyles.css";

import { useInvestorCenter } from "./hooks/useInvestorCenter";
import { InvestorCenterHeader, MainAnalysisChart } from "./components";
import { RiskAnalysisChart } from "./components/RiskAnalysisChart/RiskAnalysisChart";

type InvestorCenterProps = {
  title?: string;
  description?: string;
};

export default function InvestorCenter({}: InvestorCenterProps) {
  const { t } = useTranslate();

  const {
    selectedCity,
    setSelectedCity,
    analysisType, // "basic" = Deal Finder, "advanced" = Premia za nowość
    isSwitching,
    handleAnalysisTypeChange,
    cityOptions,
    handleChartInit,
  } = useInvestorCenter();

  return (
    <ContainerSection>
      <InvestorCenterHeader
        title={t("InvestorCenter.centrumInwestora")}
        analysisType={analysisType}
        onAnalysisTypeChange={handleAnalysisTypeChange}
        selectedCity={selectedCity}
        onCityChange={(value) => setSelectedCity(value || "Warszawa")}
        cityOptions={cityOptions}
      />

      {/* Główny wykres: Deal Finder / Premia za nowość */}
      <Box className={classes.relativeBox}>
        <LoadingOverlay
          visible={isSwitching}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Box className={classes.chartWrapper}>
          <MainAnalysisChart
            type={analysisType as "basic" | "advanced"}
            city={selectedCity}
            onChartInit={handleChartInit}
          />
        </Box>
      </Box>

      {/* Sekcja: Rozkład ryzyka w mieście (boxplot) */}
      <Grid className={classes.controlGrid}>
        <Grid.Col span={{ base: 12 }}>
          <Paper className={classes.paperCard}>
            <Group className={classes.mb}>
              <IconShieldCheck size={20} />
              <TitleSection
                title={t("InvestorCenter.analizaRyzykaInwestycyjnego")}
              />
            </Group>

            <TextDescription
              description={
                t("InvestorCenter.ogólnyWskaźnikRyzykaDla", {
                  city: selectedCity,
                }) + t("InvestorCenter.nizszaWartośćOznaczaMniejszeRyzyko")
              }
              className={classes.mb}
            />
            <RiskAnalysisChart city={selectedCity} />
          </Paper>
        </Grid.Col>
      </Grid>
    </ContainerSection>
  );
}

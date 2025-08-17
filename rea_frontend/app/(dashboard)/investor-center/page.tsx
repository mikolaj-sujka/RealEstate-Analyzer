"use client";

import { Paper, Grid, Group, Box, LoadingOverlay, Flex } from "@mantine/core";
import { IconShieldCheck } from "@tabler/icons-react";
import { useTranslate } from "@/hooks/useTranslate";
import { ContainerSection } from "@/components/ContainerSection/ContainerSection";
import { TextDescription, TitleSection } from "@/components/UI";
import * as classes from "./styles/investorCenterStyles.css";

import { useInvestorCenter } from "./hooks/useInvestorCenter";
import {
  InvestorCenterHeader,
  MainAnalysisChart,
  RiskAnalysisChart,
  RiskGaugeHelp,
} from "./components";

type InvestorCenterProps = {
  title?: string;
  description?: string;
};

export default function InvestorCenter({}: InvestorCenterProps) {
  const { t } = useTranslate();

  const {
  selectedCity,
  cityOptions,
  rows,
  rowsLoading,
  rowsError,
  analysisType,
  isSwitching,
  handleAnalysisTypeChange,
  handleChartInit,
  setSelectedCity
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
            rows={rows}
            onChartInit={handleChartInit}
          />
        </Box>
      </Box>

      <Grid className={classes.controlGrid}>
        <Grid.Col span={{ base: 12 }}>
          <Paper className={classes.paperCard}>
            <Flex className={classes.flex}>
              <IconShieldCheck size={20} />
              <TitleSection
                title={t("InvestorCenter.analizaRyzykaInwestycyjnego")}
              />
              <RiskGaugeHelp absolute={false} />
            </Flex>

            <TextDescription
              description={
                t("InvestorCenter.ogólnyWskaźnikRyzykaDla", {
                  city: selectedCity,
                }) + t("InvestorCenter.nizszaWartośćOznaczaMniejszeRyzyko")
              }
              className={classes.mb}
            />

            <RiskAnalysisChart city={selectedCity} rows={rows} />
          </Paper>
        </Grid.Col>
      </Grid>
    </ContainerSection>
  );
}

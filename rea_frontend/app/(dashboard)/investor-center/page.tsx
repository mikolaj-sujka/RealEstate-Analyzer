"use client";

import {
  Paper,
  Grid,
  Box,
  LoadingOverlay,
  Flex,
  Button,
} from "@mantine/core";
import { IconRefresh, IconShieldCheck } from "@tabler/icons-react";
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
import { EmptyState } from "@/components/EmptyPage";

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
    analysisType,
    isSwitching,
    handleAnalysisTypeChange,
    handleChartInit,
    setSelectedCity,
  } = useInvestorCenter();

  const showEmpty = !rows || rows.length === 0;

  return (
    <ContainerSection>
      <InvestorCenterHeader
        title={t("InvestorCenter.centrumInwestora")}
        analysisType={analysisType}
        onAnalysisTypeChange={handleAnalysisTypeChange}
        selectedCity={selectedCity}
        onCityChange={(value) => setSelectedCity(value || "Warszawa")}
        cityOptions={cityOptions}
        disabled={showEmpty}
      />
      {showEmpty ? (
        <EmptyState
          title={t("Brak danych")}
          description={t(
            "Dla wybranego miasta nie ma jeszcze danych lub nie można ich poprawnie zinterpretować. Zmień filtr lub spróbuj ponownie później."
          )}
        >
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={() => window.location.reload()}
          >
            {t("Odśwież")}
          </Button>
        </EmptyState>
      ) : (
        <>
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
                  <RiskGaugeHelp relative={true} />
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
        </>
      )}
    </ContainerSection>
  );
}

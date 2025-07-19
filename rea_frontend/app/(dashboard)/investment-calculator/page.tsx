"use client";

import React from "react";
import { useTranslate } from "@/hooks/useTranslate";
import { useInvestmentSimulation } from "./hooks";
import { InvestmentParamsForm, SimulationResults } from "./components";
import { TextDescription, TitleSection } from "@/components/UI";
import { ContainerSection } from "@/components/ContainerSection";

const InvestmentSimulatorPage = () => {
  const { t } = useTranslate();
  const { params, setters, result, isLoading, handleSimulation } =
    useInvestmentSimulation();

  return (
    <ContainerSection>
      <TitleSection
        title={t("InvestmentCalculator.symulatorOpłacalnościInwestycji")}
      />
      <TextDescription
        description={t(
          "InvestmentCalculator.analizaWhatIf"
        )}
      />

      <InvestmentParamsForm
        params={params}
        setters={setters}
        onSimulate={handleSimulation}
        isLoading={isLoading}
      />

      <SimulationResults isLoading={isLoading} result={result} />
    </ContainerSection>
  );
};

export default InvestmentSimulatorPage;

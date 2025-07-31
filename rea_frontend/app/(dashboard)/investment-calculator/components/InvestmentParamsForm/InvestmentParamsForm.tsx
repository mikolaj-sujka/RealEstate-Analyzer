"use client";

import React from "react";
import {
  Grid,
  Title,
  NumberInput,
  Text,
  Slider,
  Group,
  Button,
} from "@mantine/core";
import { useTranslate } from "@/hooks/useTranslate";

type InvestmentParamsFormProps = {
  params: {
    initialInvestment: number;
    years: number;
    priceGrowth: number;
    rentYield: number;
    inflation: number;
    interestRate: number;
  };
  setters: {
    setInitialInvestment: (value: number | string) => void;
    setYears: (value: number | string) => void;
    setPriceGrowth: (value: number) => void;
    setRentYield: (value: number) => void;
    setInflation: (value: number) => void;
    setInterestRate: (value: number) => void;
  };
  onSimulate: () => void;
  isLoading: boolean;
}

export const InvestmentParamsForm: React.FC<InvestmentParamsFormProps> = ({
  params,
  setters,
  onSimulate,
  isLoading,
}) => {
  const { t } = useTranslate();
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Title order={5} mb="sm">
            {t("InvestmentCalculator.parametryInwestycji")}
          </Title>
          <NumberInput
            label={t("InvestmentCalculator.wartośćInwestycji")}
            value={params.initialInvestment}
            onChange={setters.setInitialInvestment}
            step={50_000}
            min={100_000}
            mb="sm"
          />
          <NumberInput
            label={t("InvestmentCalculator.horyzontInwestycyjny")}
            value={params.years}
            onChange={setters.setYears}
            min={1}
            max={30}
            mb="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Title order={5} mb="sm">
            {t("InvestmentCalculator.scenariuszeMakroekonomiczny")}
          </Title>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm">{t("InvestmentCalculator.wzrostCen")}</Text>
              <Slider
                min={-5}
                max={15}
                step={0.5}
                value={params.priceGrowth}
                onChange={setters.setPriceGrowth}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">{t("InvestmentCalculator.zyskNajmu")}</Text>
              <Slider
                min={1}
                max={10}
                step={0.25}
                value={params.rentYield}
                onChange={setters.setRentYield}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">{t("InvestmentCalculator.inflacja")}</Text>
              <Slider
                min={0}
                max={10}
                step={0.25}
                value={params.inflation}
                onChange={setters.setInflation}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">{t("InvestmentCalculator.stopaProcentowa")}</Text>
              <Slider
                min={2}
                max={12}
                step={0.25}
                value={params.interestRate}
                onChange={setters.setInterestRate}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Group justify="center" mt="lg">
        <Button size="lg" onClick={onSimulate} loading={isLoading}>
          {t("InvestmentCalculator.uruchomSymulacje")}
        </Button>
      </Group>
    </>
  );
};

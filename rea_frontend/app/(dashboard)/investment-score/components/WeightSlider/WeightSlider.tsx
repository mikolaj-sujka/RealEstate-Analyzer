"use client";

import React from "react";
import { Grid, Slider, Text, Box } from "@mantine/core";
import { CityInvestmentFactors } from "../../models";

type WeightsSlidersProps = {
  weights: CityInvestmentFactors;
  onChange: (key: keyof CityInvestmentFactors, val: number) => void;
};

const criteria: {
  key: keyof CityInvestmentFactors;
  label: string;
  description: string;
}[] = [
  {
    key: "demographics",
    label: "Demografia",
    description: "Wzrost populacji, struktura wiekowa, migracje",
  },
  {
    key: "infrastructure",
    label: "Infrastruktura",
    description: "Transport, edukacja, służba zdrowia, rozrywka",
  },
  {
    key: "marketDynamics",
    label: "Dynamika Rynku",
    description: "Tempo wzrostu cen, płynność, popyt vs podaż",
  },
  {
    key: "macroeconomic",
    label: "Makroekonomia",
    description: "Stopy procentowe, inflacja, PKB regionu",
  },
];

export const WeightsSliders = ({ weights, onChange }: WeightsSlidersProps) => {
  return (
    <Box mx="auto" maw={800} mt="lg">
      <Text size="lg" mb="md">
        Wagi Kryteriów (AHP)
      </Text>
      <Grid gutter={{ base: 10, xs: 'xl', md: 'xl', xl: 90 }}>
        {criteria.map(({ key, label, description }) => (
          <Grid.Col key={key} span={6} mb="lg">
            <Box>
              <Text fw={500}>{label}</Text>
              <Text size="xs" c="dimmed" mb="xs">
                {description}
              </Text>
              <Slider
                min={0}
                max={100}
                value={weights[key]}
                onChange={(v) => onChange(key, v)}
                marks={[
                  { value: 0, label: "Nieważne" },
                  { value: 50, label: "Standard" },
                  { value: 100, label: "Kluczowe" },
                ]}
              />
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

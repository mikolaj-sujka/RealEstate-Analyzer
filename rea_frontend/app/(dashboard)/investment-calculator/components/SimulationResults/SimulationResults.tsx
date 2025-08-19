"use client";

import React from "react";
import { Box, LoadingOverlay, Grid } from "@mantine/core";
import { ResultsChart } from "../ResultChart";
import { KeyMetrics } from "../KeyMetrics";
import { InvestmentCalculatorSimulationResult } from "../../models";

type SimulationResultsProps = {
  isLoading: boolean;
  result: InvestmentCalculatorSimulationResult | null;
}

export const SimulationResults: React.FC<SimulationResultsProps> = ({
  isLoading,
  result,
}) => {
  return (
    <Box mt="xl" style={{ minHeight: "400px", position: "relative" }}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {result && !isLoading && (
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <ResultsChart distribution={result.distribution} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <KeyMetrics result={result} />
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
};

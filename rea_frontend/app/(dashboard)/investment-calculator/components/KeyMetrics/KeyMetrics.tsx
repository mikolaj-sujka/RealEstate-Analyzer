"use client";

import React from "react";
import { Card, Group, Text, Box, Title } from "@mantine/core";
import {
  IconTrendingUp,
  IconPigMoney,
  IconPercentage,
} from "@tabler/icons-react";
import { useTranslate } from "@/hooks/useTranslate";
import { SimulationResult } from "../../models";

type KeyMetricsProps = {
  result: SimulationResult;
}

export const KeyMetrics: React.FC<KeyMetricsProps> = ({ result }) => {
  const { t } = useTranslate();
  return (
    <>
      <Title order={4} mb="md">
        {t("InvestmentCalculator.kluczoweWskaźniki")}
      </Title>

      <Card withBorder p="md" radius="md" mb="sm">
        <Group>
          <IconTrendingUp size={32} color="var(--mantine-color-green-6)" />
          <Box>
            <Text c="dimmed" size="sm">
              {t("InvestmentCalculator.średnieROI")}
            </Text>
            <Text fw={700} size="xl">
              {result.roi.toFixed(2)}%
            </Text>
          </Box>
        </Group>
      </Card>

      <Card withBorder p="md" radius="md" mb="sm">
        <Group>
          <IconPigMoney size={32} color="var(--mantine-color-blue-6)" />
          <Box>
            <Text c="dimmed" size="sm">
              NPV
            </Text>
            <Text fw={700} size="xl">
              {result.npv.toLocaleString("pl-PL", {
                style: "currency",
                currency: "PLN",
              })}
            </Text>
          </Box>
        </Group>
      </Card>

      <Card withBorder p="md" radius="md">
        <Group>
          <IconPercentage size={32} color="var(--mantine-color-violet-6)" />
          <Box>
            <Text c="dimmed" size="sm">
              IRR
            </Text>
            <Text fw={700} size="xl">
              {result.irr.toFixed(2)}%
            </Text>
          </Box>
        </Group>
      </Card>
    </>
  );
};

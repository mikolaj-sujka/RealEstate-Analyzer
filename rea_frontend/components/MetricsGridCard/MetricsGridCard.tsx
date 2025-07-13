"use client";

import { Grid, Paper, Group, Text, Box } from "@mantine/core";
import Sparkline from "../Sparkline/Sparkline";
import { MetricGridCardData } from "@/models/types";


type MetricsGridCardProps = {
  data: MetricGridCardData[];
};

export const MetricsGridCard = ({ data }: MetricsGridCardProps) => {
  return (
    <Grid mb="xl">
      {data.map((m, idx) => (
        <Grid.Col key={idx} span={{ base: 12, md: 6, lg: 3 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {m.label}
              </Text>
              <m.icon size={16} color={m.sparklineColor} />
            </Group>
            <Text size="xl" fw={700}>
              {m.value}
            </Text>
            <Text size="xs" c={m.changeColor}>
              {m.change}
            </Text>
            <Box h={40} mt="sm">
              <Sparkline data={m.sparklineData} color={m.sparklineColor} />
            </Box>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
};

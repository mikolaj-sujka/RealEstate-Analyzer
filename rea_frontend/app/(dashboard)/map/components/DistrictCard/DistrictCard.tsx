"use client";

import { Paper, Group, Text, Badge, Box } from "@mantine/core";
import { MapPin, Home, TrendingUp, TrendingDown } from "lucide-react";

type DistrictData = {
  district: string;
  avgPrice: number;
  properties: number;
  change: string;
  trend: "up" | "down";
};

type DistrictCardProps = {
  item: DistrictData;
};

export const DistrictCard = ({ item }: DistrictCardProps) => {
  const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = item.trend === "up" ? "green" : "red";

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <MapPin size={16} color="var(--mantine-color-blue-6)" />
          <Text fw={600}>{item.district}</Text>
        </Group>
        <Badge color={trendColor} variant="light">
          <Group gap={4}>
            <TrendIcon size={12} />
            <Text size="xs">{item.change}</Text>
          </Group>
        </Badge>
      </Group>

      <Box style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Avg Price:
          </Text>
          <Text fw={500}>{item.avgPrice.toLocaleString()} PLN/m²</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Properties:
          </Text>
          <Group gap="xs">
            <Home size={12} />
            <Text fw={500}>{item.properties}</Text>
          </Group>
        </Group>
      </Box>
    </Paper>
  );
};

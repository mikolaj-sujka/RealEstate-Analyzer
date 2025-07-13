"use client";
import { Group, Text, ThemeIcon, Progress } from "@mantine/core";
import { PropertyTypeData } from "../models";

export type PropertyDistributionCardItemProps = { item: PropertyTypeData };

export const PropertyDistributionCardItem = ({
  item,
}: PropertyDistributionCardItemProps) => {
  return (
    <div>
      <Group justify="space-between" mb={4}>
        <Group gap="sm">
          <ThemeIcon color={item.color} variant="light" radius="md">
            <item.icon size={18} />
          </ThemeIcon>
          <Text size="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
        <Text size="sm" c="dimmed">
          {item.value}%
        </Text>
      </Group>
      <Progress value={item.value} color={item.color} />
    </div>
  );
};

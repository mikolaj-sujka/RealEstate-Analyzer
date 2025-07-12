"use client";

import { PropertyTypeData } from "@/models/types";
import { Group, Text, Box } from "@mantine/core";

type DistributionItemProps = {
  item: PropertyTypeData;
}

export const DistributionItem = ({ item }: DistributionItemProps) => {
  const Icon = item.icon;
  return (
    <Group style={{ justifyContent: 'space-between' }}>
      <Group>
        <Box
          style={{
            width: 32,
            height: 32,
            backgroundColor: item.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={16} color="white" />
        </Box>
        <Text size="sm" style={{ fontWeight: 500 }}>
          {item.name}
        </Text>
      </Group>
      <Text size="sm" style={{ fontWeight: 600 }}>
        {item.value}%
      </Text>
    </Group>
  );
}

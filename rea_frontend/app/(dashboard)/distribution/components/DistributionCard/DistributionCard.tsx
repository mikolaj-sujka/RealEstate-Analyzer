"use client";

import { PropertyTypeData } from "@/models/types";
import { Paper, Text, Stack } from "@mantine/core";
import { DistributionItem } from "../DistributionItem";

type DistributionCardProps = {
  data: PropertyTypeData[];
  title?: string;
}

export const DistributionCard = ({
  data,
  title = "Rozkład typów nieruchomości",
}: DistributionCardProps) => {
  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Text style={{ fontWeight: 600 }} size="lg" mb="md">
        {title}
      </Text>
      <Stack gap="md">
        {data.map((item) => (
          <DistributionItem key={item.name} item={item} />
        ))}
      </Stack>
    </Paper>
  );
}

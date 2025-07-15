import { DistrictData } from "@/models";
import { Group, Paper, ThemeIcon, Text } from "@mantine/core";
import { IconHome, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

type DistrictCardProps = {
  district: DistrictData;
}

export const DistrictCard = ({ district }: DistrictCardProps) => {
  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon variant="light" radius="md">
            <IconHome size={18} />
          </ThemeIcon>
          <Text fw={500}>{district.district}</Text>
        </Group>
        {district.trend === "up" ? (
          <IconTrendingUp size={16} color="var(--mantine-color-green-6)" />
        ) : (
          <IconTrendingDown size={16} color="var(--mantine-color-red-6)" />
        )}
      </Group>
      <Text size="xl" fw={700} mb="xs">
        {district.averagePrice.toLocaleString("pl-PL")} PLN/m²
      </Text>
      <Text size="sm" c="dimmed" mb="xs">
        {district.properties} nieruchomości
      </Text>
      <Text size="sm" c={district.trend === "up" ? "green" : "red"}>
        {district.change} w tym miesiącu
      </Text>
    </Paper>
  );
}

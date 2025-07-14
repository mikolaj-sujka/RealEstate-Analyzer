import { Paper, Group, Text } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

type StatisticsCardDataProps = {
  label: string;
  value: string;
  change: { percentage: number; isPositive: boolean };
  icon: React.ReactNode;
}

export const StatisticsCardData = ({
  label,
  value,
  change,
  icon,
}: StatisticsCardDataProps) => {
  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text size="sm" fw={500} c="dimmed">
          {label}
        </Text>
        {icon}
      </Group>
      <Text size="xl" fw={700}>
        {value}
      </Text>
      <Group gap="xs" mt="xs">
        {change.isPositive ? (
          <IconTrendingUp size={12} color="var(--mantine-color-green-6)" />
        ) : (
          <IconTrendingDown size={12} color="var(--mantine-color-red-6)" />
        )}
        <Text size="xs" c={change.isPositive ? "green" : "red"}>
          {change.percentage}% od ostatniego miesiąca
        </Text>
      </Group>
    </Paper>
  );
};

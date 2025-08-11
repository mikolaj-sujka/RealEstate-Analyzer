import { Paper, Group, Text } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

type StatisticsCardDataProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export const StatisticsCardData = ({
  label,
  value,
  icon,
}: StatisticsCardDataProps) => {
  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text size="sm" fw={700}>
          {label}
        </Text>
        {icon}
      </Group>
      <Text size="xl" fw={300} c="dimmed">
        {value}
      </Text>
    </Paper>
  );
};

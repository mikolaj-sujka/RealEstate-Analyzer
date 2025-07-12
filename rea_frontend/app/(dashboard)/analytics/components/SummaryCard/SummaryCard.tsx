import { Paper, Group, Text } from "@mantine/core";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  Icon: LucideIcon;
};

export const SummaryCard = ({
  title,
  value,
  delta,
  deltaPositive,
  Icon,
}: SummaryCardProps) => {
  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500} size="sm">
          {title}
        </Text>
        <Icon size={16} />
      </Group>
      <Text size="2rem" fw={700} mb="xs">
        {value}
      </Text>
      <Group gap="xs">
        {deltaPositive ? (
          <TrendingUp size={14} color="var(--mantine-color-green-6)" />
        ) : (
          <TrendingDown size={14} color="var(--mantine-color-red-6)" />
        )}
        <Text size="xs" c={deltaPositive ? "green" : "red"}>
          {delta} from last month
        </Text>
      </Group>
    </Paper>
  );
};

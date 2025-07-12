import { Paper, Group, Text, Title } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { CorrelationData } from "../../models";

type TrendCardProps = {
  item: CorrelationData;
}

export const TrendCard = ({ item }: TrendCardProps) => {
  const Icon = item.correlation > 0 ? IconTrendingUp : IconTrendingDown;
  const color =
    item.correlation > 0
      ? "var(--mantine-color-green-6)"
      : "var(--mantine-color-red-6)";
  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Group style={{ justifyContent: "space-between" }}>
        <Text size="sm" fw={500}>
          {item.metric}
        </Text>
        <Icon size={16} color={color} />
      </Group>
      <Title order={3}>{item.correlation.toFixed(2)}</Title>
      <Group gap="xs">
        <Icon size={12} color={color} />
        <Text size="xs" c={item.change.startsWith("+") ? "green" : "red"}>
          {item.change} from last period
        </Text>
      </Group>
    </Paper>
  );
}

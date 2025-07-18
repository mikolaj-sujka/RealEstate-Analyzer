import { Card, Group, Title, Text, Badge } from "@mantine/core";

type SystemStatusProps = {
  translate: (key: string) => string;
};

export const SystemStatus = ({ translate }: SystemStatusProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <div>
          <Title order={3}>{translate("HelpCenter.statusSystemu")}</Title>
          <Text c="dimmed">{translate("HelpCenter.statusOpis")}</Text>
        </div>
        <Badge color="green" size="lg">
          {translate("HelpCenter.statusAktywny")}
        </Badge>
      </Group>
    </Card>
  );
};

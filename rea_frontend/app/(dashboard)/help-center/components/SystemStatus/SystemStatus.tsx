import { TextDescription } from "@/components/UI";
import { Card, Group, Title, Badge } from "@mantine/core";

type SystemStatusProps = {
  translate: (key: string) => string;
};

export const SystemStatus = ({ translate }: SystemStatusProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <div>
          <Title order={3}>{translate("HelpCenter.statusSystemu")}</Title>
          <TextDescription description={translate("HelpCenter.statusOpis")} />
        </div>
        <Badge color="green" size="lg">
          {translate("HelpCenter.statusAktywny")}
        </Badge>
      </Group>
    </Card>
  );
};

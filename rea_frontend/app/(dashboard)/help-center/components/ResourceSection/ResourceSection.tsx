import { Card, Title, Group, Text } from "@mantine/core";
import { Resource } from "../../models/types";

type ResourcesSectionProps = {
  resources: Resource[];
  translate: (key: string) => string;
};

export const ResourcesSection = ({
  resources,
  translate,
}: ResourcesSectionProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        {translate("HelpCenter.przydatneZasoby")}
      </Title>
      <Group grow>
        {resources.map((resource) => (
          <Card
            key={resource.title}
            padding="md"
            radius="sm"
            withBorder
            style={{ cursor: "pointer" }}
          >
            <Group>
              <resource.icon size={24} color="var(--mantine-color-blue-6)" />
              <div style={{ flex: 1 }}>
                <Text fw={500}>{resource.title}</Text>
                <Text size="sm" c="dimmed">
                  {resource.description}
                </Text>
              </div>
            </Group>
          </Card>
        ))}
      </Group>
    </Card>
  );
};

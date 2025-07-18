import { Card, Title, Group, Text } from "@mantine/core";
import { ContactOption } from "../../models/types";

type ContactSectionProps = {
  options: ContactOption[];
  translate: (key: string) => string; 
};

export const ContactSection = ({ options, translate }: ContactSectionProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        {translate("HelpCenter.kontakt")}
      </Title>
      <Group grow>
        {options.map((option) => (
          <Card key={option.title} padding="md" radius="sm" withBorder>
            <Group>
              <option.icon
                size={24}
                color={`var(--mantine-color-${option.color}-6)`}
              />
              <div style={{ flex: 1 }}>
                <Text fw={500}>{option.title}</Text>
                <Text size="sm" c="dimmed">
                  {option.description}
                </Text>
                <Text size="sm" fw={500} c={option.color}>
                  {option.contact}
                </Text>
              </div>
            </Group>
          </Card>
        ))}
      </Group>
    </Card>
  );
};

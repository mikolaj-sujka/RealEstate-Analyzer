import { Card, Title, Stack, Text, Divider } from "@mantine/core";
import { FaqItem } from "../../models/types";

type FaqSectionProps = {
  items: FaqItem[];
  translate: (key: string) => string; 
};

export const FaqSection = ({ items, translate }: FaqSectionProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} mb="md">
        {translate("HelpCenter.faq")}
      </Title>
      <Stack gap="md">
        {items.map((item, index) => (
          <div key={index}>
            <Text fw={500} mb="xs">
              {item.question}
            </Text>
            <Text c="dimmed" size="sm">
              {item.answer}
            </Text>
            {index < items.length - 1 && <Divider my="md" />}
          </div>
        ))}
      </Stack>
    </Card>
  );
};

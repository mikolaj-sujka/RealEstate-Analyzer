"use client";
import { Card, Title, Stack, Text } from "@mantine/core";
import { usePropertyDistributionData } from "./hooks";
import { PropertyDistributionCardItem } from "./components";
import { useTranslation } from "react-i18next";

export const PropertyDistributionCard = () => {
  const { data, totalValue } = usePropertyDistributionData();
  const { t } = useTranslation();

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        {t("Dashboard.rozkładTypówNieruchomości")}
      </Title>
      <Text size="sm" c="dimmed">
        {t("Dashboard.suma")} {totalValue}%
      </Text>
      <Stack gap="lg">
        {data.map((item) => (
          <PropertyDistributionCardItem key={item.name} item={item} />
        ))}
      </Stack>
    </Card>
  );
};

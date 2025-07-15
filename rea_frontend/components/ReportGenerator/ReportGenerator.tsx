import { useReportGenerator } from "@/hooks/useReportGenerator";
import { ReportParamsClient, TransactionData } from "@/models";
import { Paper, Title, Button, Group, Text } from "@mantine/core";
import { IconFileAnalytics } from "@tabler/icons-react";
import { ECharts } from "echarts";
import { useTranslation } from "react-i18next";

type ReportGeneratorProps = {
  chartInstance: ECharts | null;
  transactions: TransactionData[];
  selectedCities: string[];
  title: string;
  description: string;
};

export const ReportGenerator = ({
  chartInstance,
  transactions,
  selectedCities,
  title,
  description,
}: ReportGeneratorProps) => {
  const { generate } = useReportGenerator({
    chartInstance,
    transactions,
    selectedCities,
  } as ReportParamsClient);

  const { t } = useTranslation();

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
      <Group gap="sm">
        <IconFileAnalytics size={24} />
        <Title order={4}>{title}</Title>
      </Group>
      <Text size="sm" my="sm">
        {description}
      </Text>
      <Button onClick={generate} disabled={!chartInstance}>
        {t("ReportGenerator.generujRaport")}
      </Button>
    </Paper>
  );
};

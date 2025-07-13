"use client";

import { Container, Paper, Title, Box } from "@mantine/core";
import {
  metrics,
  recentTransactions,
  tableColumns,
} from "./models/consts/dashboard.consts";
import { DataTable } from "@/components/DataTable";
import { MetricsGridCard } from "@/components/MetricsGridCard";
import { HistoricalAnalysisChart, PropertyDistributionCard } from "./components";
import { useTranslate } from "@/hooks/useTranslate";

export default function DashboardPage() {
  const { t } = useTranslate();
  return (
    <Container fluid>
      <MetricsGridCard data={metrics} />

      <Box mt="xl">
        <HistoricalAnalysisChart />
      </Box>

      <Box mt="xl">
        <PropertyDistributionCard />
      </Box>

      <Paper mt="xl" shadow="sm" p="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          {t("Dashboard.ostatnieTransakcje")}
        </Title>
        <DataTable
          data={recentTransactions}
          columns={tableColumns}
          pageSize={5}
        />
      </Paper>
    </Container>
  );
}

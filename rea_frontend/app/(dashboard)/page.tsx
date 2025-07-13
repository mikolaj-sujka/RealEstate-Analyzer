"use client";

import { Container, Paper, Title, Box } from "@mantine/core";
import {
  metrics,
  recentTransactions,
  tableColumns,
} from "./models/consts/dashboard.consts";
import { DataTable } from "@/components/DataTable";
import { MetricsGridCard } from "@/components/MetricsGridCard";
import { HistoricalAnalysisChart } from "./components";

export default function DashboardPage() {
  return (
    <Container fluid>
      <MetricsGridCard data={metrics} />

      <Box mt="xl">
        <HistoricalAnalysisChart />
      </Box>

      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Recent Transactions
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

"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { Box, Paper, Title } from "@mantine/core";
import { recentTransactions, tableColumns } from "./models/consts";
import { HistoricalAnalysisChart } from "./components";
import { DataTable } from "@/components/DataTable";
import { DashboardSection } from "@/components/DashboardSection";

export default function DashboardPage() {
  const { t } = useTranslate();
  return (
    <DashboardSection>
      <Box mt="xl">
        <HistoricalAnalysisChart />
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
    </DashboardSection>
  );
}

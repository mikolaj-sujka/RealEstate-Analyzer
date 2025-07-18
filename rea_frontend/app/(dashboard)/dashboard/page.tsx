"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { recentTransactions, tableColumns } from "./models/consts";
import { HistoricalAnalysisChart } from "./components";
import { DataTable } from "@/components/DataTable";
import { DashboardSection } from "@/components/DashboardSection";
import { TitleSection } from "@/components/UI/TitleSection";
import { Text } from "@mantine/core";

export default function DashboardPage() {
  const { t } = useTranslate();
  return (
    <DashboardSection>
      <HistoricalAnalysisChart />

      <TitleSection title={t("Dashboard.ostatnieTransakcje")} />
      <Text c="dimmed" size="sm" mb="md">
        {t("Dashboard.ostatnieTransakcjeOpis")}
      </Text>
      <DataTable
        data={recentTransactions}
        columns={tableColumns}
        pageSize={5}
      />
    </DashboardSection>
  );
}

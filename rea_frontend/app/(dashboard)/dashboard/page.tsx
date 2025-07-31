"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { recentTransactions, tableColumns } from "./models/consts";
import { HistoricalAnalysisChart } from "./components";
import { DataTable } from "@/components/DataTable";
import { ContainerSection } from "@/components/ContainerSection";
import { TitleSection } from "@/components/UI/TitleSection";
import { TextDescription } from "@/components/UI/TextDescription/TextDescription";

export default function DashboardPage() {
  const { t } = useTranslate();
  return (
    <ContainerSection>
      <HistoricalAnalysisChart />

      <TitleSection title={t("Dashboard.ostatnieTransakcje")} />
      <TextDescription description={t("Dashboard.ostatnieTransakcjeOpis")} />
      <DataTable
        data={recentTransactions}
        columns={tableColumns}
        pageSize={5}
      />
    </ContainerSection>
  );
}

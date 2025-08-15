"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { HistoricalAnalysisChart } from "./components";
import { DataTable } from "@/components/DataTable";
import { ContainerSection } from "@/components/ContainerSection";
import { TitleSection } from "@/components/UI/TitleSection";
import { TextDescription } from "@/components/UI/TextDescription/TextDescription";
import { useLatestTransactionsTable } from "./hooks/useLatestTransactionsTable";
import { Loader, Center, Alert, Button, Group } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

export default function DashboardPage() {
  const { t } = useTranslate();
  const { data, columns, loading, error, refetch } =
    useLatestTransactionsTable();

  return (
    <ContainerSection>
      <HistoricalAnalysisChart />

      <TitleSection title={t("Dashboard.ostatnieTransakcje")} />
      <TextDescription description={t("Dashboard.ostatnieTransakcjeOpis")} />

      {loading && (
        <Center my="md">
          <Loader />
        </Center>
      )}

      {!loading && error && (
        <Alert color="red" my="md">
          {t("Dashboard.bladPobieraniaTransakcje")}
          <Group mt="xs">
            <Button
              leftSection={<IconReload size={16} />}
              onClick={() => refetch()}
            >
              {t("Dashboard.odswiezTransakcje")}
            </Button>
          </Group>
        </Alert>
      )}

      {!loading && !error && (
        <DataTable
          data={data}
          columns={columns}
          pageSize={10}
          selectable={false}
        />
      )}
    </ContainerSection>
  );
}

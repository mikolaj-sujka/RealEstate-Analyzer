"use client";

import { useMemo } from "react";
import type { Column } from "@/components/DataTable/models";
import { useLatestTransactions } from "./useLatestTransactions";
import { OtodomLatestTransaction } from "@/services/api/models";

const fmtPLN = (v: number) =>
  typeof v === "number"
    ? v.toLocaleString("pl-PL", { maximumFractionDigits: 0 }) + " zł"
    : String(v);

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return iso ?? "";
  return d.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export function useLatestTransactionsTable() {
  const { rows, loading, error, refetch } = useLatestTransactions();

  const columns: Column<OtodomLatestTransaction>[] = useMemo(
    () => [
      {
        key: "transactionDate",
        label: "Data",
        sortable: true,
        width: "14%",
        render: (v: string) => fmtDate(v),
      },
      {
        key: "city",
        label: "Miasto",
        sortable: true,
        filterable: true,
        width: "16%",
      },
      {
        key: "voivodeship",
        label: "Województwo",
        sortable: true,
        filterable: true,
        width: "18%",
      },
      {
        key: "propertyType",
        label: "Typ nieruch.",
        sortable: true,
        filterable: true,
        width: "18%",
      },
      {
        key: "marketType",
        label: "Rynek",
        sortable: true,
        filterable: true,
        width: "12%",
      },
      {
        key: "price",
        label: "Cena",
        sortable: true,
        width: "16%",
        render: (v: number) => fmtPLN(v),
      },
    ],
    []
  );

  return { dataTable: rows, columns, loading, error, refetch };
}


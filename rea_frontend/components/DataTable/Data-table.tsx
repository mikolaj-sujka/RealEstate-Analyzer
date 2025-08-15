"use client";

import * as React from "react";
import {
  Table as MantineTable,
  ScrollArea,
  Paper,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { useTranslate } from "@/hooks";
import { TableProps } from "./models";
import { useTable } from "./hooks";
import * as classes from "./styles";
import { DataTableRow, TableHeader } from "./components";

export const DataTable = <Row,>({
  data,
  columns,
  pageSize = 10,
  selectable = false,
  onRowAction,
  onExport,
}: TableProps<Row>) => {
  const {
    sortKey,
    sortDir,
    page,
    setPage,
    pagedData,
    selected,
    toggleSort,
    toggleSelect,
    toggleSelectAll,
    totalPages,
    fullData,
  } = useTable<Row>({ data, defaultPageSize: pageSize });

  const { t } = useTranslate();

  return (
    <Paper className={classes.dataTablePaper}>
      <div className={classes.wrapper}>
        <ScrollArea>
          <MantineTable className={classes.table} verticalSpacing="sm">
            <TableHeader
              columns={columns}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
              selectable={!!selectable}
              allSelected={
                selected.size > 0 && selected.size === fullData.length
              }
              indeterminate={
                selected.size > 0 && selected.size < fullData.length
              }
              onToggleSelectAll={toggleSelectAll}
              hasRowActions={!!onRowAction}
            />
            <tbody>
              {pagedData.map((row, idx) => (
                <DataTableRow
                  key={idx}
                  row={row}
                  idx={idx}
                  columns={columns}
                  selectable={selectable}
                  selected={selected}
                  toggleSelect={toggleSelect}
                  page={page}
                  pageSize={pageSize}
                  onRowAction={onRowAction}
                />
              ))}
            </tbody>
          </MantineTable>
        </ScrollArea>
      </div>

      <div className={classes.paginationWrapper}>
        <Text size="sm" c="dimmed">
          {`Wyświetlane: ${Math.min(pageSize, pagedData.length)} z ${
            data.length
          }`}
        </Text>
        <Group gap="xs">
          <Button
            className={classes.paginationButton}
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            {t("DataTable.poprzednia")}
          </Button>
          <Text size="sm">
            {page} / {totalPages}
          </Text>
          <Button
            className={classes.paginationButton}
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            {t("DataTable.kolejna")}
          </Button>
        </Group>
      </div>
    </Paper>
  );
};

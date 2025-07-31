// src/components/DataTable/TableHeader.tsx
import React from "react";
import { Checkbox, Text } from "@mantine/core";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { Column } from "../../models";
import * as classes from "./../../styles";

type TableHeaderProps = {
  columns: Column[];
  sortKey: string | null;
  sortDir: "asc" | "desc";
  onSort: (key: string) => void;
  selectable: boolean;
  allSelected: boolean;
  indeterminate: boolean;
  onToggleSelectAll: () => void;
  hasRowActions: boolean;
};

export const TableHeader = ({
  columns,
  sortKey,
  sortDir,
  onSort,
  selectable,
  allSelected,
  indeterminate,
  onToggleSelectAll,
  hasRowActions,
}: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {selectable && (
          <th className={classes.thPlain}>
            <Checkbox
              checked={allSelected}
              indeterminate={indeterminate}
              onChange={onToggleSelectAll}
              aria-label="select all rows"
            />
          </th>
        )}
        {columns.map((col) => (
          <th
            key={col.key}
            className={classes.theadTh}
            onClick={col.sortable ? () => onSort(col.key) : undefined}
          >
            <div className={classes.headerButton}>
              <Text fw={500} size="sm" inline>
                {col.label}
              </Text>
              {col.sortable && sortKey === col.key && (
                <>
                  {sortDir === "asc" ? (
                    <IconArrowUp size={14} />
                  ) : (
                    <IconArrowDown size={14} />
                  )}
                </>
              )}
            </div>
          </th>
        ))}
        {hasRowActions && <th className={classes.thPlain} />}
      </tr>
    </thead>
  );
};

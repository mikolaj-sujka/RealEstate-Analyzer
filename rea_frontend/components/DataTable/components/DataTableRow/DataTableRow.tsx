// src/components/DataTable/DataTableRow.tsx
import React from "react";
import { Checkbox, Button, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { Column, RowActionType } from "../../models";
import * as classes from "../../styles/dataTableStyles.css";

type DataTableRowProps<Row = any> = {
  row: Row;
  idx: number;
  columns: Column<Row>[];
  selectable: boolean;
  selected: Set<number>;
  toggleSelect: (idx: number) => void;
  page: number;
  pageSize: number;
  onRowAction?: (action: RowActionType, row: Row) => void;
};

export const DataTableRow = <Row,>({
  row,
  idx,
  columns,
  selectable,
  selected,
  toggleSelect,
  page,
  pageSize,
  onRowAction,
}: DataTableRowProps<Row>) => {
  const globalIndex = (page - 1) * pageSize + idx;

  return (
    <tr
      className={[classes.tbodyTr, idx % 2 === 1 ? classes.evenRow : undefined]
        .filter(Boolean)
        .join(" ")}
    >
      {selectable && (
        <td className={classes.td}>
          <Checkbox
            checked={selected.has(globalIndex)}
            onChange={() => toggleSelect(idx)}
            aria-label="select row"
          />
        </td>
      )}
      {columns.map((col) => (
        <td key={col.key} className={classes.td}>
          {col.render
            ? col.render((row as any)[col.key], row)
            : (row as any)[col.key]}
        </td>
      ))}
      {onRowAction && (
        <td className={[classes.td, classes.actionsCell].join(" ")}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle" size="xs">
                <IconDots size={16} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => onRowAction("details", row)}>
                View Details
              </Menu.Item>
              <Menu.Item onClick={() => onRowAction("edit", row)}>
                Edit
              </Menu.Item>
              <Menu.Item color="red" onClick={() => onRowAction("delete", row)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      )}
    </tr>
  );
};

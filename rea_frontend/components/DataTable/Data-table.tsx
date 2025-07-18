"use client";

import * as React from "react";
import { IconArrowDown, IconArrowUp, IconDots } from "@tabler/icons-react";
import {
  Table,
  ScrollArea,
  Paper,
  Text,
  Group,
  Button,
  UnstyledButton,
  Checkbox,
  Menu,
  Pagination,
} from "@mantine/core";
import { Column, TableProps } from "@/models/types";
import { useTranslate } from "@/hooks";
import { TitleSection } from "../UI";

export function DataTable({
  data,
  columns,
  pageSize = 10,
  selectable,
  onRowAction,
  onExport,
}: TableProps) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    const sortedData = [...data].sort((a, b) => {
      if (a[sortKey] > b[sortKey]) return 1;
      if (a[sortKey] < b[sortKey]) return -1;
      return 0;
    });
    return sortDir === "asc" ? sortedData : sortedData.reverse();
  }, [data, sortKey, sortDir]);

  const pagedData = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  const toggleSelect = (idx: number) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      const dataIndex = (page - 1) * pageSize + idx;
      copy.has(dataIndex) ? copy.delete(dataIndex) : copy.add(dataIndex);
      return copy;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.map((_, i) => i)));
    }
  };

  const Th = ({ column }: { column: Column }) => (
    <Table.Th>
      {column.sortable ? (
        <UnstyledButton onClick={() => toggleSort(column.key)}>
          <Group gap="xs">
            <Text fw={500} fz="sm">
              {column.label}
            </Text>
            {sortKey === column.key &&
              (sortDir === "asc" ? (
                <IconArrowUp size={14} />
              ) : (
                <IconArrowDown size={14} />
              ))}
          </Group>
        </UnstyledButton>
      ) : (
        <Text fw={500} fz="sm">
          {column.label}
        </Text>
      )}
    </Table.Th>
  );

  const rows = pagedData.map((row, idx) => (
    <Table.Tr key={idx}>
      {selectable && (
        <Table.Td>
          <Checkbox
            checked={selected.has((page - 1) * pageSize + idx)}
            onChange={() => toggleSelect(idx)}
          />
        </Table.Td>
      )}
      {columns.map((col) => (
        <Table.Td key={col.key}>
          {col.render ? col.render(row[col.key], row) : row[col.key]}
        </Table.Td>
      ))}
      {onRowAction && (
        <Table.Td>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle" size="xs">
                <IconDots size={16} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => onRowAction?.("details", row)}>
                View Details
              </Menu.Item>
              <Menu.Item onClick={() => onRowAction?.("edit", row)}>
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                onClick={() => onRowAction?.("delete", row)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  const { t } = useTranslate();

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
      <Group justify="space-between" mb="md">
        <TitleSection title={t("Dashboard.ostatnieTransakcje")} />
        <Text c="dimmed" size="sm">
          {t("Dashboard.ostatnieTransakcjeOpis")}
        </Text>
        {onExport && (
          <Button
            size="xs"
            onClick={() => onExport([...selected].map((i) => data[i]))}
          >
            Export
          </Button>
        )}
      </Group>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              {selectable && (
                <Table.Th>
                  <Checkbox
                    checked={selected.size > 0 && selected.size === data.length}
                    indeterminate={
                      selected.size > 0 && selected.size < data.length
                    }
                    onChange={toggleSelectAll}
                  />
                </Table.Th>
              )}
              {columns.map((col) => (
                <Th key={col.key} column={col} />
              ))}
              {onRowAction && <Table.Th />}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      <Group justify="flex-end" mt="md">
        <Pagination
          total={Math.ceil(data.length / pageSize)}
          value={page}
          onChange={setPage}
        />
      </Group>
    </Paper>
  );
}

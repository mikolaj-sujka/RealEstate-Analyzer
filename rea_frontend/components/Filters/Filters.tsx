"use client";

import React from "react";
import {
  Paper,
  Grid,
  Group,
  Button,
  Collapse,
  ActionIcon,
  Text,
} from "@mantine/core";
import { IconFilter, IconChevronDown, IconX } from "@tabler/icons-react";
import { FilterConfig } from "@/models";
import { useFilters } from "@/hooks";
import { FilterItem } from "./components";

type FilterProps = {
  config: FilterConfig[];
  onFilterChange: (vals: Record<string, any>) => void;
  title?: string;
  defaultExpanded?: boolean;
}

export function Filter({
  config,
  onFilterChange,
  title = "Filtry",
  defaultExpanded = true,
}: FilterProps) {
  const { values, setFilter, clearAll, expanded, setExpanded } = useFilters({
    config,
    onChange: onFilterChange,
  });

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder mb="lg" mt="xl">
      <Group style={{ justifyContent: "space-between" }} mb={expanded ? "md" : 0}>
        <Group>
          <IconFilter size={20} />
          <Text>{title}</Text>
        </Group>
        <Group gap="xs">
          <Button
            variant="subtle"
            size="xs"
            leftSection={<IconX size={14} />}
            onClick={clearAll}
          >
            Wyczyść
          </Button>
          <ActionIcon
            variant="subtle"
            onClick={() => setExpanded(!expanded)}
            style={{
              transform: expanded ? "rotate(180deg)" : undefined,
              transition: "transform 0.2s",
            }}
          >
            <IconChevronDown size={16} />
          </ActionIcon>
        </Group>
      </Group>

      <Collapse in={expanded}>
        <Grid>
          {config.map((f, i) => (
            <Grid.Col key={f.id} span={{ base: 12, sm: 6, md: 4 }} pt="xs">
              <FilterItem
                filter={f}
                value={values[f.id]}
                onChange={(val) => setFilter(f.id, val)}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Collapse>
    </Paper>
  );
}

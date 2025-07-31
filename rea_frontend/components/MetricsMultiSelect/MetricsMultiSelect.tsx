"use client";

import React from "react";
import { MultiSelect } from "@mantine/core";
import * as classes from "./styles";

type MetricsSelectorProps = {
  value: string[];
  onChange(val: string[]): void;
  metrics: { label: string; value: string }[];
};

export function MetricsSelector({
  value,
  onChange,
  metrics,
}: MetricsSelectorProps) {
  return (
    <MultiSelect
      label="Metryki"
      placeholder="Wybierz metryki"
      data={metrics.map((m) => ({ label: m.label, value: m.value }))}
      value={value}
      onChange={onChange}
      clearable
      searchable
      size="sm"
      maxDropdownHeight={200}
      className={classes.metricsSelector}
    />
  );
}

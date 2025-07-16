"use client";

import { MultiSelect } from "@mantine/core";

type Option = {
  value: string;
  label: string;
}

type MetricsMultiSelectProps = {
  data: Option[];
  value: string[];
  onChange(vals: string[]): void;
}

export const MetricsMultiSelect = ({ data, value, onChange }: MetricsMultiSelectProps) => {
  return (
    <MultiSelect
      label="Metryki do porównania"
      placeholder="Wybierz metryki"
      data={data}
      value={value}
      onChange={onChange}
    />
  );
}

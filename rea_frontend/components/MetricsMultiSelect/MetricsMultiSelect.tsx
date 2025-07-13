"use client";

import { MultiSelect } from "@mantine/core";

interface Option {
  value: string;
  label: string;
}

interface Props {
  data: Option[];
  value: string[];
  onChange(vals: string[]): void;
}

export const MetricsMultiSelect = ({ data, value, onChange }: Props) => {
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

import React from "react";
import {
  TextInput,
  Select,
  MultiSelect,
  RangeSlider,
  Text,
  Box,
} from "@mantine/core";
import { FilterConfig } from "@/models";

type ItemProps = {
  filter: FilterConfig;
  value: any;
  onChange: (val: any) => void;
};

export const FilterItem = ({ filter, value, onChange }: ItemProps) => {
  switch (filter.type) {
    case "text":
      return (
        <TextInput
          label={filter.label}
          placeholder={filter.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      );

    case "select":
      return (
        <Select
          label={filter.label}
          placeholder={filter.placeholder}
          data={filter.options!.map((opt) => ({
            ...opt,
            value: String(opt.value),
          }))}
          value={value as string}
          onChange={onChange}
          searchable
        />
      );

    case "multiselect":
      return (
        <MultiSelect
          label={filter.label}
          placeholder={filter.placeholder}
          data={filter.options!.map((opt) => ({
            ...opt,
            value: String(opt.value),
          }))}
          value={Array.isArray(value) ? value.map((v) => String(v)) : []}
          onChange={onChange}
          searchable
        />
      );

    case "range":
      return (
        <Box>
          <Text size="sm" style={{ fontWeight: 500 }} mb="xs">
            {filter.label}
          </Text>
          <RangeSlider
            min={filter.min}
            max={filter.max}
            step={filter.step}
            marks={filter.marks}
            value={value || filter.defaultValue || [filter.min!, filter.max!]}
            onChange={onChange}
            label={(v) => String(v)}
          />
        </Box>
      );

    default:
      return null;
  }
};

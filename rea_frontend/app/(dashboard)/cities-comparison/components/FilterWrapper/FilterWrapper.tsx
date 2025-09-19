"use client";
import { Filter } from "@/components/Filters";
import { FilterConfig, FilterValues } from "@/models";
import React from "react";

type FiltersWrapperProps = {
  config: FilterConfig[];
  onChange: (vals: FilterValues) => void;
};

export const FiltersWrapper = ({ config, onChange }: FiltersWrapperProps) => {
  return <Filter config={config} defaultExpanded onFilterChange={onChange} />;
};

import React from "react";
import { Select } from "@mantine/core";

type CitySelectProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string | null) => void;
  disabled?: boolean;
};

export const CitySelect = ({ options, value, onChange, disabled }: CitySelectProps) => {
  return (
    <Select data={options} value={value} onChange={onChange} label="Miasto" disabled={disabled} />
  );
};

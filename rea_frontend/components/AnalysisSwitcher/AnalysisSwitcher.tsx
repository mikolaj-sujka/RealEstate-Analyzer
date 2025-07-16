import React from "react";
import { SegmentedControl } from "@mantine/core";

type AnalysisSwitcherProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const AnalysisSwitcher = ({
  value,
  onChange,
  disabled = false,
}: AnalysisSwitcherProps) => {
  return (
    <SegmentedControl
      data={[
        { label: "Podstawowa", value: "basic" },
        { label: "Zaawansowana", value: "advanced" },
        { label: "Inwestycyjna", value: "investment" },
      ]}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

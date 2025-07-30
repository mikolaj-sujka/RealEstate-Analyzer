"use client";

import React from "react";
import { DatePickerInput } from "@mantine/dates";
import * as classes from "./styles";

type CustomDateRangePickerProps = {
  value: [Date | null, Date | null];
  onChange(val: [Date | null, Date | null]): void;
  disabled?: boolean;
};

export const CustomDateRangePicker = ({
  value,
  onChange,
  disabled,
}: CustomDateRangePickerProps) => {
  return (
    <DatePickerInput
      type="range"
      label="Niestandardowy zakres dat"
      placeholder="Wybierz daty"
      value={value}
      onChange={(val) =>
        onChange([
          val[0] ? new Date(val[0]) : null,
          val[1] ? new Date(val[1]) : null,
        ] as [Date | null, Date | null])
      }
      clearable
      size="sm"
      className={classes.customDateRangePicker}
      disabled={disabled}
    />
  );
};

"use client";

import { DatePickerInput } from "@mantine/dates";

type DateRangePickerProps = {
  value: [Date | null, Date | null];
  onChange(dates: [Date | null, Date | null]): void;
};

export const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  return (
    <DatePickerInput
      type="range"
      label="Niestandardowy zakres"
      placeholder="Wybierz daty"
      value={value}
      onChange={(dates) => {
        onChange([
          dates[0] ? new Date(dates[0]) : null,
          dates[1] ? new Date(dates[1]) : null,
        ]);
      }}
    />
  );
};

import React from "react";
import { SegmentedControl } from "@mantine/core";
import * as classes from "./styles";

type TimeRangeSelectorProps = {
  value: string;
  onChange(val: string): void;
  timeRanges: { label: string; value: string }[];
};

export const TimeRangeSelector = ({
  value,
  onChange,
  timeRanges,
}: TimeRangeSelectorProps) => {
  return (
    <SegmentedControl
      data={timeRanges}
      value={value}
      onChange={onChange}
      fullWidth
      size="sm"
      className={classes.timeRangeSelector}
    />
  );
}

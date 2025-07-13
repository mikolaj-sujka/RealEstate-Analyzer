"use client";

import { SegmentedControl, Text } from "@mantine/core";

interface Props {
  value: string;
  onChange(range: string): void;
}

export const TimeRangeControl = ({ value, onChange }: Props) => {
  return (
    <>
      <Text size="sm" fw={500} mb={4}>
        Zakres Czasu
      </Text>
      <SegmentedControl
        value={value}
        onChange={onChange}
        data={[
          { label: "3M", value: "3m" },
          { label: "6M", value: "6m" },
          { label: "1R", value: "1y" },
          { label: "Wszystko", value: "all" },
        ]}
      />
    </>
  );
}

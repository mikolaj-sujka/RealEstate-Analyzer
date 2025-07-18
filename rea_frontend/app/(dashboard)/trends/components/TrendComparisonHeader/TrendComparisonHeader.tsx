import { Group, Title, SegmentedControl, Select } from "@mantine/core";
import { IconChartBar } from "@tabler/icons-react";

type TrendComparisonHeaderProps = {
  title: string;
  analysisType: string;
  onAnalysisTypeChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string | null) => void;
  cityOptions: { value: string; label: string }[];
}

export const TrendComparisonHeader = ({
  title,
  analysisType,
  onAnalysisTypeChange,
  selectedCity,
  onCityChange,
  cityOptions,
}: TrendComparisonHeaderProps) => {
  return (
    <Group justify="space-between" mb="md">
      <Group>
        <IconChartBar size={20} />
        <Title order={2}>{title}</Title>
      </Group>
      <Group>
        <SegmentedControl
          value={analysisType}
          onChange={onAnalysisTypeChange}
          data={[
            { label: "Podstawowa", value: "basic" },
            { label: "Zaawansowana", value: "advanced" },
          ]}
        />
        <Select
          label="Miasto"
          data={cityOptions}
          value={selectedCity}
          onChange={onCityChange}
          allowDeselect={false}
        />
      </Group>
    </Group>
  );
}

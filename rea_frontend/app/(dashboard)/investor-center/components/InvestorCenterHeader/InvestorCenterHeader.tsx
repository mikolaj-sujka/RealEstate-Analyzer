import { TitleSection, TextDescription } from "@/components/UI";
import { useTranslate } from "@/hooks/useTranslate";
import { Flex, SegmentedControl, Select } from "@mantine/core";

type InvestorCenterHeaderProps = {
  title: string;
  analysisType: string;
  onAnalysisTypeChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string | null) => void;
  cityOptions: { value: string; label: string }[];
};

export const InvestorCenterHeader = ({
  title,
  analysisType,
  onAnalysisTypeChange,
  selectedCity,
  onCityChange,
  cityOptions,
}: InvestorCenterHeaderProps) => {
  const { t } = useTranslate();
  return (
    <>
      <Flex direction="column" mb="md">
        <TitleSection title={title} />
        <TextDescription
          description={t("InvestorCenter.centrumInwestoraOpis")}
        />
      </Flex>
      <Flex justify="flex-end" align="center" mb="md" gap="xl">
        <SegmentedControl
          style={{ top: "13px" }}
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
      </Flex>
    </>
  );
};

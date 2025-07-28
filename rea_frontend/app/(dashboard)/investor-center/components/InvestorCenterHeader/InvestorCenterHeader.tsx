import { TitleSection, TextDescription } from "@/components/UI";
import { useTranslate } from "@/hooks/useTranslate";
import { Flex, SegmentedControl, Select } from "@mantine/core";
import * as classes from "./styles";

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
      <Flex className={classes.headerTop}>
        <TitleSection title={title} />
        <TextDescription
          description={t("InvestorCenter.centrumInwestoraOpis")}
        />
      </Flex>
      <Flex className={classes.headerControls}>
        <SegmentedControl
          className={classes.segmentedControl}
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

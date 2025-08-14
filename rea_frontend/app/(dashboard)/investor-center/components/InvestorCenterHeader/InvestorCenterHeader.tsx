"use client";

import { TitleSection, TextDescription } from "@/components/UI";
import { useTranslate } from "@/hooks/useTranslate";
import { Flex, SegmentedControl } from "@mantine/core";
import * as classes from "./styles";
import { CitySelect } from "@/components/CitySelect";
import { ChartMethodHelp } from "../ChartMethodHelp";

type InvestorCenterHeaderProps = {
  title: string;
  analysisType: string; // "basic" | "advanced"
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
        <ChartMethodHelp absolute={false} analysisType={analysisType as "basic" | "advanced"} />
      </Flex>
        <TextDescription
          description={t("InvestorCenter.centrumInwestoraOpis")}
        />

      <Flex className={classes.headerControls}>
        <SegmentedControl
          className={classes.segmentedControl}
          value={analysisType}
          onChange={onAnalysisTypeChange}
          data={[
            { label: "Deal Finder", value: "basic" },
            { label: "Premia za nowość", value: "advanced" },
          ]}
        />

        <CitySelect
          options={cityOptions}
          value={selectedCity}
          onChange={onCityChange}
        />
      </Flex>
    </>
  );
};

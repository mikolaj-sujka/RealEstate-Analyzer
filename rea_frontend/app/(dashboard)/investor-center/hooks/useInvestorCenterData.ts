import { useState, useRef } from "react";
import { cityTrendData } from "../models";
import { useTranslate } from "@/hooks";

export type AnalysisType = "basic" | "advanced";

export const useInvestorCenter = (defaultCity: string = "Warszawa") => {
  const [selectedCity, setSelectedCity] = useState<string>(defaultCity);
  const [analysisType, setAnalysisType] = useState<AnalysisType>("basic");
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const trendChartInstanceRef = useRef<echarts.ECharts | null>(null);

  const { t } = useTranslate();

  const handleAnalysisTypeChange = (value: string) => {
    setIsSwitching(true);
    setTimeout(() => {
      setAnalysisType(value as AnalysisType);
      setIsSwitching(false);
    }, 400);
  };

  const cityOptions = Object.keys(cityTrendData).map((city) => ({
    value: city,
    label: city,
  }));

  const handleChartInit = (instance: echarts.ECharts | null) => {
    if (analysisType === "basic") {
      trendChartInstanceRef.current = instance;
    }
  };

  return {
    selectedCity,
    setSelectedCity,
    analysisType,
    isSwitching,
    trendChartInstanceRef,
    t,
    handleAnalysisTypeChange,
    cityOptions,
    handleChartInit,
  };
}
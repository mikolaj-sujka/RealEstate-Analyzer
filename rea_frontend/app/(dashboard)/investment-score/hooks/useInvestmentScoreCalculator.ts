import { useState } from "react";
import { calculateInvestmentScore } from "../utils/calculateInvestmentScore";
import { PropertyType } from "@/models";
import { CityInvestmentFactors, InvestmentScoreResult } from "../models";

export const useInvestmentCalculator = (
  cityData: Record<string, CityInvestmentFactors> = {}
) => {
  const cities = Object.keys(cityData);

  const [selectedCity, setSelectedCity] = useState<string>(
    cities.length > 0 ? cities[0] : ""
  );
  const [propertyType, setPropertyType] = useState<PropertyType>("Mieszkanie");
  const [propertySize, setPropertySize] = useState<number>(50);
  const [weights, setWeights] = useState<CityInvestmentFactors>({
    demographics: 50,
    infrastructure: 50,
    marketDynamics: 50,
    macroeconomic: 50,
  });
  const [result, setResult] = useState<InvestmentScoreResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = () => {
    if (!selectedCity || !cityData[selectedCity]) return;

    setLoading(true);
    setTimeout(() => {
      const cityFactors = cityData[selectedCity]!;
      const res = calculateInvestmentScore(
        cityFactors,
        weights,
        propertyType,
        propertySize
      );
      setResult(res);
      setLoading(false);
    }, 1000);
  };

  return {
    cities,
    selectedCity,
    setSelectedCity,
    propertyType,
    setPropertyType,
    propertySize,
    setPropertySize,
    weights,
    setWeights,
    result,
    loading,
    calculate,
  };
};

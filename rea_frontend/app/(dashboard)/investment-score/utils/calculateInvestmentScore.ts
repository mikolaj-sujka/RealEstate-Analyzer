import { PropertyType } from "@/models";
import { CityInvestmentFactors, InvestmentScoreResult } from "../models";


export const calculateInvestmentScore = (
  cityData: CityInvestmentFactors,
  weights: CityInvestmentFactors,
  propertyType: PropertyType,
  propertySize: number
): InvestmentScoreResult => {
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const normWeights = totalWeight
    ? (Object.fromEntries(
        Object.entries(weights).map(([k, w]) => [k, w / totalWeight])
      ) as CityInvestmentFactors)
    : {
        demographics: 0,
        infrastructure: 0,
        marketDynamics: 0,
        macroeconomic: 0,
      };

  let baseScore = 0;
  (Object.keys(cityData) as (keyof CityInvestmentFactors)[]).forEach((key) => {
    baseScore += cityData[key] * normWeights[key];
  });

  let modifier = 1;
  if (propertyType === "Mieszkanie") modifier += 0.05;
  if (propertyType === "Lokal użytkowy") modifier += 0.1;
  if (propertySize > 70) modifier -= 0.05;
  if (propertySize < 40) modifier += 0.02;

  const totalScore = Math.max(0, Math.min(100, baseScore * modifier));

  return {
    totalScore: Math.round(totalScore),
    partialScores: cityData,
  };
};

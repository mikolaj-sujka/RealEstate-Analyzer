import { PropertyType } from "@/models";
import { CityInvestmentFactors, InvestmentScoreResult } from "../models";

export const calculateInvestmentScore = (
  cityData: CityInvestmentFactors,
  weights: CityInvestmentFactors,
  propertyType: PropertyType,
  propertySize: number
): InvestmentScoreResult => {

  const normFactors = {
    demographics: cityData.demographics / 100,
    infrastructure: cityData.infrastructure / 100,
    marketDynamics: cityData.marketDynamics / 100,
    macroeconomic: cityData.macroeconomic / 100,
  };

  const totalWeight =
    weights.demographics +
    weights.infrastructure +
    weights.marketDynamics +
    weights.macroeconomic;

  const normWeights: Record<keyof CityInvestmentFactors, number> = totalWeight > 0
    ? {
      demographics: weights.demographics / totalWeight,
      infrastructure: weights.infrastructure / totalWeight,
      marketDynamics: weights.marketDynamics / totalWeight,
      macroeconomic: weights.macroeconomic / totalWeight,
    }
    : {
      demographics: 0.25,
      infrastructure: 0.25,
      marketDynamics: 0.25,
      macroeconomic: 0.25,
    };

  const weightedSum =
    normFactors.demographics * normWeights.demographics +
    normFactors.infrastructure * normWeights.infrastructure +
    normFactors.marketDynamics * normWeights.marketDynamics +
    normFactors.macroeconomic * normWeights.macroeconomic;

  let typeAdjust = 1;
  switch (propertyType) {
    case "Dom":
      typeAdjust = 1.1;    
      break;
    case "Lokal użytkowy":
      typeAdjust = 0.9;    
      break;
    case "Mieszkanie":
    default:
      typeAdjust = 1;      
      break;
  }

  let sizeAdjust = 1;
  if (propertySize < 40) sizeAdjust = 0.95;  
  else if (propertySize > 80) sizeAdjust = 0.9;  

  const adjustmentFactor = typeAdjust * sizeAdjust;

  const rawScore = weightedSum * adjustmentFactor * 100;
  const totalScore = Math.max(0, Math.min(100, rawScore));

  const partialScores = {
    demographics: normFactors.demographics * normWeights.demographics * 100,
    infrastructure: normFactors.infrastructure * normWeights.infrastructure * 100,
    marketDynamics: normFactors.marketDynamics * normWeights.marketDynamics * 100,
    macroeconomic: normFactors.macroeconomic * normWeights.macroeconomic * 100,
  };

  return {
    totalScore: Math.round(totalScore),
    weightedSum,             // [0,1] – surowa ważona suma
    adjustmentFactor,        // mnożnik typ+metraż
    partialScores,           // składowe procentowe
  };
}

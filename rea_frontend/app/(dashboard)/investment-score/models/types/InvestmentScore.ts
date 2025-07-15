export type CityInvestmentFactors = {
  demographics: number;
  infrastructure: number;
  marketDynamics: number;
  macroeconomic: number;
}

export type InvestmentScoreResult = {
  totalScore: number;
  partialScores: CityInvestmentFactors;
}

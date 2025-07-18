import { useState, useEffect } from "react";
import { riskAnalysisData, RiskData } from "../models";

export const useRiskAnalysis = (city: string) => {
  const [data, setData] = useState<RiskData>({ riskScore: 0 });
  useEffect(() => {
    setData(riskAnalysisData[city] || { riskScore: 0 });
  }, [city]);
  return data;
}
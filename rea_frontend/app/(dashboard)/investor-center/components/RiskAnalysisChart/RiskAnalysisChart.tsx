import { ChartContainer } from "@/components/ChartContainer";
import { investorCityDistricts } from "../../models";
import { riskGaugeOption } from "../../utils/riskGaugOption";

export const RiskAnalysisChart = ({ city }: { city: string }) => {
  const rows = investorCityDistricts[city] ?? [];
  const option = riskGaugeOption(rows, city);
  return <ChartContainer option={option} style={{ height: 220 }} />;
};

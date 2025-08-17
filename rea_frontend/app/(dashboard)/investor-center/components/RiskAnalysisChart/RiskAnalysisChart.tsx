import { ChartContainer } from "@/components/ChartContainer";
import { riskGaugeOption } from "../../utils/riskGaugOption";
import { OtodomDistrictStat } from "@/services/api/models";

export const RiskAnalysisChart = ({ city, rows }: { city: string; rows: OtodomDistrictStat[] }) => {
  const option = riskGaugeOption(rows, city);
  return <ChartContainer option={option} style={{ height: 220 }} />;
};

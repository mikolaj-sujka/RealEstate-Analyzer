import { ChartContainer } from "@/components/ChartContainer";
import { dealFinderProOption, newnessOption } from "../../utils";
import { OtodomDistrictStat } from "@/services/api/models";

export const MainAnalysisChart = ({
  type,
  city,
  rows,
  onChartInit,
}: {
  type: "basic" | "advanced";
  city: string;
  rows: OtodomDistrictStat[];  
  onChartInit?: any;
}) => {
  const option =
    type === "basic"
      ? dealFinderProOption(rows)
      : newnessOption(rows);
  return <ChartContainer option={option} onChartInit={onChartInit} />;
};

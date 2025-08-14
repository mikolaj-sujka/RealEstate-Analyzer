import { ChartContainer } from "@/components/ChartContainer";
import { investorCityDistricts } from "../../models";
import { dealFinderProOption, newnessOption } from "../../utils";

export const MainAnalysisChart = ({
  type,
  city,
  onChartInit,
}: {
  type: "basic" | "advanced";
  city: string;
  onChartInit?: any;
}) => {
  const rows = investorCityDistricts[city] ?? [];
  const option =
    type === "basic"
      ? dealFinderProOption(rows)
      : newnessOption(rows);
  return <ChartContainer option={option} onChartInit={onChartInit} />;
};

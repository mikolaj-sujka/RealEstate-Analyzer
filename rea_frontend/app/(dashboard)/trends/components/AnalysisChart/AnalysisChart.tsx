import { ChartContainer } from "@/components/ChartContainer";
import { advancedMetricsData, cityTrendData, investmentMetrics, riskAnalysisData } from "../../models";
import { getAdvancedMetricsChartOption, getBasicTrendChartOption, getCorrelationChartOption, getInvestmentChartOption, getRiskAnalysisChartOption } from "../../utils/chartOptions";

type MainAnalysisChartProps = {
  type: "basic" | "advanced"; 
  city: string;
  onChartInit?: (chart: any) => void;
};

export const MainAnalysisChart = ({ type, city, onChartInit }: MainAnalysisChartProps) => {
  const chartOptions = {
    basic: getBasicTrendChartOption(cityTrendData[city]),
    advanced: getAdvancedMetricsChartOption(advancedMetricsData[city]),
    // investment: getInvestmentChartOption(investmentMetrics[city]),
  };

  if (!chartOptions[type]) return null;

  return (
    <ChartContainer option={chartOptions[type]} onChartInit={onChartInit} />
  );
};

type RiskAnalysisChartProps = {
  city: string;
}

export const RiskAnalysisChart = ({ city }: RiskAnalysisChartProps) => {
  const option = getRiskAnalysisChartOption(riskAnalysisData[city]);
  return (
    <ChartContainer
      option={option}
      style={{ width: "100%", height: "250px" }}
    />
  );
};

export const CorrelationChart = () => {
  const option = getCorrelationChartOption();
  return (
    <ChartContainer
      option={option}
      style={{ width: "100%", height: "300px" }}
    />
  );
};

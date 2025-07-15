import { ECharts } from "echarts";
import { TransactionData } from "./Common";

export type PdfReportParams = {
  chartDataUrl: string
  transactions: TransactionData[]
  selectedCities: string[]
};

export type ReportParamsClient  = {
  chartInstance: ECharts | null;
  transactions: TransactionData[];
  selectedCities: string[];
}
import React from "react";
import { ReportGenerator } from "../ReportGenerator/ReportGenerator";

type ReportGeneratorWrapperProps = {
  chartInstance: any;
  transactions: any[];
  cities: string[];
}
export const ReportGeneratorWrapper: React.FC<ReportGeneratorWrapperProps> = ({
  chartInstance,
  transactions,
  cities,
}) => (
  <ReportGenerator
    chartInstance={chartInstance}
    transactions={transactions}
    selectedCities={cities}
    title="Gotowy na podsumowanie trendów?"
    description="Wygeneruj raport PDF na bazie danych"
  />
);

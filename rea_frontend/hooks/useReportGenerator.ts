import { ReportParamsClient } from "@/models";
import { generateReport } from "@/services";
import { useCallback } from "react";

export function useReportGenerator({
  chartInstance,
  transactions,
  selectedCities,
}: ReportParamsClient) {
  const generate = useCallback(() => {
    if (!chartInstance) {
      window.alert(
        "Wykres nie jest jeszcze gotowy. Spróbuj ponownie za chwilę."
      );
      return;
    }

    generateReport({
      chartDataUrl: chartInstance.getDataURL(),
      transactions,
      selectedCities,
    });
  }, [chartInstance, transactions, selectedCities]);

  return { generate };
}

import { ReportDefinition } from '@/models';
import { PDFBuilder } from '@/services';
import { deepTransliterate, ensureDate, slugifyAscii } from '@/utils';
import { useCallback, useState } from 'react';

export const useReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(async (report: ReportDefinition) => {
    setIsGenerating(true);
    setError(null);

    try {
      const safeReport = deepTransliterate(report) as ReportDefinition;

      const createdAt = ensureDate(safeReport.createdAt) ?? new Date(); // fallback na "teraz"

      const builder = new PDFBuilder();
      builder.addTitlePage(safeReport.title, safeReport.subtitle, createdAt);

      for (const section of safeReport.sections) {
        await builder.applySection(section);
      }

      const fileName = report.fileName
        ? `${slugifyAscii(report.fileName)}.pdf`
        : `report-${slugifyAscii(report.title)}-${new Date().toISOString().split('T')[0]}.pdf`;

      builder.save(fileName);
    } catch {
      setError('An error occurred while generating the report.');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { isGenerating, error, generateReport, clearError };
};

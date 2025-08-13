import { ReportDefinition } from '@/models';
import { PDFBuilder } from '@/services';
import { useCallback, useState } from 'react';

export const useReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(async (report: ReportDefinition) => {
    setIsGenerating(true);
    setError(null);
    const builder = new PDFBuilder();

    try {
      builder.addTitlePage(report.title, report.subtitle, report.createdAt);

      for (const section of report.sections) {
        await builder.applySection(section);
      }

      const fileName = report.fileName
        ? report.fileName
        : `raport-${report.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]/gi, '')}-${new Date()
            .toISOString()
            .split('T')[0]}.pdf`;

      builder.save(fileName);
    } catch (e) {
      console.error('Error generating report', e);
      setError('Wystapil blad podczas generowania raportu.');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    isGenerating,
    error,
    generateReport,
    clearError,
  };
}

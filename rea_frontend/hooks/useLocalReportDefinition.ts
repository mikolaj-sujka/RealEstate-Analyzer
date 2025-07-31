import { cityTrendData, correlationData, riskAnalysisData } from "@/app/(dashboard)/investor-center/models";
import { ChartSection, ReportDefinition, TableSection } from "@/models";
import { formatCurrency, formatDatePdfReport } from "@/utils";
import { ECharts } from "echarts";
import { useMemo } from "react";


type TrendPoint = {
    month: string;
    avgPrice: number;
    listings: number;
    sales: number;
    inventory: number;
    demand?: number;
};

export const useLocationReportDefinition = ({
    locationName,
    isCity,
    chartInstance,
    recentTransactions,
}: {
    locationName: string;
    isCity: boolean;
    chartInstance: ECharts | null;
    recentTransactions: any[]; // dopasuj typ
}) => {
    const report = useMemo(() => {
        const trendData: TrendPoint[] = isCity
            ? (cityTrendData[locationName] as any)
            : [];

        const risk = isCity
            ? riskAnalysisData[locationName]
            : undefined;

        const correlations = correlationData;

        // sekcja wykresu (jeśli wykres dostępny)
        const chartSection: ChartSection = {
            id: 'trend-chart',
            type: 'chart',
            title: 'Trendy rynkowe',
            subtitle: `Lokalizacja: ${locationName}`,
            getImage: async () => {
                if (!chartInstance) throw new Error('Wykres niedostępny');
                return chartInstance.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#fff' });
            },
        };

        // podsumowanie ostatniego punktu trendu
        const latestTrend = trendData[trendData.length - 1] || {};

        const summaryTable: TableSection = {
            id: 'summary',
            type: 'table',
            title: 'Podsumowanie stanu rynku',
            subtitle: `Dane za ostatni dostępny miesiąc`,
            columns: [
                {
                    header: 'Średnia cena',
                    key: 'avgPrice',
                    render: (v) => formatCurrency(Number(v)),
                },
                {
                    header: 'Oferty',
                    key: 'listings',
                    render: (v) => String(v),
                },
                {
                    header: 'Sprzedaże',
                    key: 'sales',
                    render: (v) => String(v),
                },
                {
                    header: 'Zapas',
                    key: 'inventory',
                    render: (v) => String(v),
                },
            ],
            data: [
                {
                    avgPrice: latestTrend.avgPrice,
                    listings: latestTrend.listings,
                    sales: latestTrend.sales,
                    inventory: latestTrend.inventory,
                },
            ],
        };

        const riskTable: TableSection = {
            id: 'risk',
            type: 'table',
            title: 'Analiza ryzyka',
            subtitle: `Wskaźniki ryzyka dla ${locationName}`,
            columns: [
                { header: 'Ryzyko całkowite', key: 'riskScore' },
                { header: 'Zmienność', key: 'volatility' },
                { header: 'Ryzyko bańki', key: 'bubbleRisk' },
                { header: 'Stabilność ekonomiczna', key: 'economicStability' },
            ],
            data: risk
                ? [
                    {
                        riskScore: risk.riskScore,
                        volatility: risk.factors.volatility,
                        bubbleRisk: risk.factors.bubbleRisk,
                        economicStability: risk.factors.economicStability,
                    },
                ]
                : [],
        };

        const correlationTable: TableSection = {
            id: 'correlation',
            type: 'table',
            title: 'Korelacje',
            subtitle: `Relacje między metrykami`,
            columns: [
                { header: 'Metryka', key: 'metric' },
                { header: 'Korelacja', key: 'correlation' },
                { header: 'Zmiana', key: 'change' },
            ],
            data: correlations,
        };

        const transactionsSection: TableSection = {
            id: 'transactions',
            type: 'table',
            title: 'Ostatnie transakcje',
            subtitle: `Wybrane lokalizacje: ${locationName}`,
            columns: [
                { header: 'Nieruchomość', key: 'property' },
                { header: 'Lokalizacja', key: 'location' },
                {
                    header: 'Data',
                    key: 'date',
                    render: (v) => formatDatePdfReport(new Date(v)),
                },
                {
                    header: 'Cena',
                    key: 'price',
                    render: (v) =>
                        new Intl.NumberFormat('pl-PL', {
                            style: 'currency',
                            currency: 'PLN',
                            minimumFractionDigits: 0,
                        }).format(Number(v)),
                },
                { header: 'Status', key: 'status' },
            ],
            data: recentTransactions,
        };

        const sections: any[] = [chartSection, summaryTable, riskTable, correlationTable, transactionsSection];

        const reportDef: ReportDefinition = {
            title: `Raport inwestycyjny — ${locationName}`,
            subtitle: `Analiza ${isCity ? 'miasta' : 'województwa'}: ${locationName}`,
            createdAt: new Date(),
            sections,
        };

        return reportDef;
    }, [locationName, isCity, chartInstance, recentTransactions]);

    return report;
}

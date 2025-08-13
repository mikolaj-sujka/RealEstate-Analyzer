import { MarketAnalyticsData } from "@/app/(dashboard)/analytics/models";
import { ChartSection, ReportDefinition, TableSection } from "@/models";
import { formatDatePdfReport } from "@/utils";
import { ECharts } from "echarts";
import { RefObject, useMemo } from "react";

export const useLocationReportDefinition = ({
    locationName,
    isCity,
    recentTransactions,
    voivodeshipMarketData
}: {
    locationName: string;
    isCity: boolean;
    chartInstance: RefObject<ECharts> | null;
    recentTransactions: any;
    voivodeshipMarketData?: MarketAnalyticsData
}) => {
    const report = useMemo(() => {
        if (!voivodeshipMarketData) {
            return {
                title: `Raport inwestycyjny — ${locationName}`,
                subtitle: `Brak danych dla lokalizacji: ${locationName}`,
                createdAt: new Date(),
                sections: [],
            }
        }

        const summaryTable: TableSection = {
            id: "summary",
            type: "table",
            title: "Podsumowanie stanu rynku",
            subtitle: `Kluczowe wskazniki dla ${locationName}`,
            columns: [
                { header: "Wskaznik", key: "metric" },
                { header: "Wartosc", key: "value" },
            ],
            data: [
                {
                    metric: "Srednia cena za m²",
                    value: new Intl.NumberFormat("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                        minimumFractionDigits: 0,
                    }).format(voivodeshipMarketData.averagePrice)
                },
                {
                    metric: "Mediana ceny",
                    value: new Intl.NumberFormat("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                        minimumFractionDigits: 0,
                    }).format(voivodeshipMarketData.medianPrice),
                },
                {
                    metric: "Liczba ofert",
                    value: voivodeshipMarketData.totalListings.toLocaleString("pl-PL"),
                },
                {
                    metric: "Sredni metraz",
                    value: `${voivodeshipMarketData.averageAreaSize} m²`,
                },
                {
                    metric: "Udzial deweloperow",
                    value: `${(voivodeshipMarketData.developerMarketShare * 100).toFixed(1)}%`,
                },
                {
                    metric: "Rynek pierwotny",
                    value: `${(voivodeshipMarketData.primaryMarketShare * 100).toFixed(1)}%`,
                },
            ],
        }

        const detailsTable: TableSection = {
            id: "details",
            type: "table",
            title: "Szczegółowe dane rynkowe",
            subtitle: `Aktualne dane za ${formatDatePdfReport(new Date())}`,
            columns: [
                { header: "Parametr", key: "parameter" },
                { header: "Wartość", key: "value" },
                { header: "Opis", key: "description" },
            ],
            data: [
                {
                    parameter: "Srednia cena za m²",
                    value: new Intl.NumberFormat("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                        minimumFractionDigits: 0,
                    }).format(voivodeshipMarketData.averagePrice),
                    description: "Srednia cena transakcyjna za metr kwadratowy",
                },
                {
                    parameter: "Mediana ceny",
                    value: new Intl.NumberFormat("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                        minimumFractionDigits: 0,
                    }).format(voivodeshipMarketData.medianPrice),
                    description: "Wartosc srodkowa cen transakcyjnych",
                },
                {
                    parameter: "Liczba ofert",
                    value: voivodeshipMarketData.totalListings.toLocaleString("pl-PL"),
                    description: "Calowita liczba aktywnych ofert na rynku",
                },
                {
                    parameter: "Sredni metraz",
                    value: `${voivodeshipMarketData.averageAreaSize} m²`,
                    description: "Srednia powierzchnia oferowanych mieszkań",
                },
                {
                    parameter: "Udzial deweloperow",
                    value: `${(voivodeshipMarketData.developerMarketShare * 100).toFixed(1)}%`,
                    description: "Procent ofert pochodzacych od deweloperow",
                },
                {
                    parameter: "Rynek pierwotny",
                    value: `${(voivodeshipMarketData.primaryMarketShare * 100).toFixed(1)}%`,
                    description: "Udzial nowych mieszkan w calkowitej ofercie",
                },
                {
                    parameter: "Sredni rok budowy",
                    value: voivodeshipMarketData.averageYearOfConstruction.toString(),
                    description: "Sredni rok budowy oferowanych nieruchomosci",
                },
            ],
        }

        const transactionsSection: TableSection = {
            id: "transactions",
            type: "table",
            title: "Ostatnie transakcje",
            subtitle: `Wybrane transakcje w lokalizacji: ${locationName}`,
            columns: [
                { header: "Nieruchomość", key: "property" },
                { header: "Lokalizacja", key: "location" },
                {
                    header: "Data",
                    key: "date",
                    render: (v) => formatDatePdfReport(new Date(v)),
                },
                {
                    header: "Cena",
                    key: "price",
                    render: (v) =>
                        new Intl.NumberFormat("pl-PL", {
                            style: "currency",
                            currency: "PLN",
                            minimumFractionDigits: 0,
                        }).format(Number(v)),
                },
                { header: "Metraż", key: "area", render: (v) => `${v} m²` },
                {
                    header: "Cena/m²",
                    key: "pricePerSqm",
                    render: (v) =>
                        new Intl.NumberFormat("pl-PL", {
                            style: "currency",
                            currency: "PLN",
                            minimumFractionDigits: 0,
                        }).format(Number(v)),
                },
                { header: "Status", key: "status" },
            ],
            data: recentTransactions,
        }

        const sections: any[] = [summaryTable, detailsTable, transactionsSection]

        const reportDef: ReportDefinition = {
            title: `Raport inwestycyjny — ${locationName}`,
            subtitle: `Szczegolowa analiza ${isCity ? "miasta" : "wojewodztwa"}: ${locationName}`,
            createdAt: new Date(),
            sections,
        }

        return reportDef
    }, [locationName, isCity, voivodeshipMarketData, recentTransactions])

    return report;
}
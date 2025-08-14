import { ReportDefinition, TableSection } from "@/models";
import { VoivodeshipMarketData } from "@/services/api/models";
import { formatDatePdfReport } from "@/utils";
import { ECharts } from "echarts";
import { RefObject, useMemo } from "react";

export const useLocationReportDefinition = ({
    locationName,
    isCity,
    voivodeshipMarketData
}: {
    locationName: string;
    isCity: boolean;
    chartInstance: RefObject<ECharts> | null;
    voivodeshipMarketData?: VoivodeshipMarketData
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
                    }).format(voivodeshipMarketData.averagePricePerSqm)
                },
                {
                    metric: "Mediana ceny",
                    value: new Intl.NumberFormat("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                        minimumFractionDigits: 0,
                    }).format(voivodeshipMarketData.medianPricePerSqm),
                },
                {
                    metric: "Liczba ofert",
                    value: voivodeshipMarketData.totalOffers.toLocaleString("pl-PL"),
                },
                {
                    metric: "Sredni metraz",
                    value: `${voivodeshipMarketData.averageFlatSize} m²`,
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
                    }).format(voivodeshipMarketData.averagePricePerSqm),
                    description: "Srednia cena transakcyjna za metr kwadratowy",
                },
                {
                    parameter: "Mediana ceny",
                    value: new Intl.NumberFormat("pl-PL", {
                        style: "currency",
                        currency: "PLN",
                        minimumFractionDigits: 0,
                    }).format(voivodeshipMarketData.medianPricePerSqm),
                    description: "Wartosc srodkowa cen transakcyjnych",
                },
                {
                    parameter: "Liczba ofert",
                    value: voivodeshipMarketData.totalOffers.toLocaleString("pl-PL"),
                    description: "Calowita liczba aktywnych ofert na rynku",
                },
                {
                    parameter: "Sredni metraz",
                    value: `${voivodeshipMarketData.averageFlatSize} m²`,
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
                    value: voivodeshipMarketData.averageBuildingsBuiltYear.toString(),
                    description: "Sredni rok budowy oferowanych nieruchomosci",
                },
            ],
        }

        const sections: any[] = [summaryTable, detailsTable]

        const reportDef: ReportDefinition = {
            title: `Raport inwestycyjny — ${locationName}`,
            subtitle: `Szczegolowa analiza ${isCity ? "miasta" : "wojewodztwa"}: ${locationName}`,
            createdAt: new Date(),
            sections,
        }

        return reportDef
    }, [locationName, isCity, voivodeshipMarketData])

    return report;
}
"use client";
import { VoivodeshipMarketData } from "@/services/api/models";
import { aggregateVoivodeshipStats } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RecentTransaction } from "./useMarketAnalytics";
import { OtodomListingsService } from "@/services/api/Otodom";

export function useVoivodeshipAnalytics(voivodeship: string) {
    const [marketData, setMarketData] = useState<VoivodeshipMarketData | null>(null);
    const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!voivodeship) return;
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        try {
            const rows = await OtodomListingsService.getListingsByVoivodeship(voivodeship, controller.signal);
            const agg = aggregateVoivodeshipStats(rows);
            setMarketData(agg);

            // TODO: jeżeli dodasz endpoint transakcji — ustaw tu realne dane
            setRecentTransactions([]);
        } catch (e: any) {
            if (e?.name !== "CanceledError" && e?.message !== "canceled") {
                setError(e?.response?.data ?? e?.message ?? "Nieznany błąd");
            }
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    }, [voivodeship]);

    useEffect(() => {
        let cleanup: (() => void) | undefined;
        (async () => { cleanup = await fetchData(); })();
        return () => cleanup?.();
    }, [fetchData]);

    const chartSeries = useMemo(() => {
        if (!marketData) return [];
        return [
            { name: "Śr. cena m²", value: marketData.averagePricePerSqm },
            { name: "Mediana m²", value: marketData.medianPricePerSqm },
            { name: "Udział deweloperów", value: marketData.developerMarketShare },
            { name: "Udział rynku pierwotnego", value: marketData.primaryMarketShare },
            { name: "Śr. rok budowy", value: marketData.averageBuildingsBuiltYear },
            { name: "Liczba ofert", value: marketData.totalOffers },
        ];
    }, [marketData]);

    return {
        marketData,
        recentTransactions,
        chartSeries,
        loading,
        error,
        refetch: fetchData,
    };
}

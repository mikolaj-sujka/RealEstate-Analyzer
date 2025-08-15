import { OtodomLatestTransaction } from "@/services/api/models";
import { OtodomListingsService } from "@/services/api/Otodom";
import { useState, useCallback, useEffect, useMemo } from "react";

export function useLatestTransactions() {
  const [data, setData] = useState<OtodomLatestTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatest = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await OtodomListingsService.getLatestTransaction();
      setData(data);
    } catch (e: any) {
      if (signal?.aborted) return;
      setError(e?.response?.data || e?.message || "Błąd pobierania transakcji.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchLatest(controller.signal);
    return () => controller.abort();
  }, [fetchLatest]);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchLatest(controller.signal);
    return () => controller.abort();
  }, [fetchLatest]);

  const rows = useMemo(() => data ?? [], [data]);

  return { rows, loading, error, refetch };
}

import { OtodomListingsService } from "@/services/api/Otodom";
import { useState, useCallback, useEffect, useMemo } from "react";

export const useOtodomCities = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const list = await OtodomListingsService.getAllCities(signal);
      setCities(list.map(city => city.name));
    } catch (e: any) {
      if (!signal?.aborted)
        setError(e?.response?.data || e?.message || "Błąd pobierania miast.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const c = new AbortController();
    fetchAll(c.signal);
    return () => c.abort();
  }, [fetchAll]);

  const options = useMemo(
    () => cities.map((c) => ({ value: c, label: c })),
    [cities]
  );

  return { cities, options, loading, error, refetch: fetchAll };
};

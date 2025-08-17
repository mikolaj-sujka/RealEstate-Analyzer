"use client";

import { GusListingsService } from "@/services/api/Gus";
import {
  GusHousingListingData,
  HistoricalPoint,
  RangeKey,
} from "@/services/api/models/types/gus-listings";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const quarterToMonth = (quarter: number): number =>
  Math.min(Math.max(quarter, 1), 4) * 3;

const toHistoricalPoints = (
  rows: GusHousingListingData[]
): HistoricalPoint[] => {
  const sorted = [...rows].sort((a, b) =>
    a.year === b.year ? a.quarter - b.quarter : a.year - b.year
  );

  const points: HistoricalPoint[] = sorted.map((r) => {
    const month = quarterToMonth(r.quarter);
    const yyyy = r.year;
    const mm = String(month).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-01`;

    return {
      date: dateStr,
      month: `${yyyy}-Q${r.quarter}`,
      price: r.averagePricePerSqm,
      medianPricePerSqm: r.medianPricePerSqm,
      averagePricePerSqm: r.averagePricePerSqm,
      flatsCompleted: r.flatsCompleted,
      flatsSold: r.flatsSold,
      totalValueSold: r.totalValueSold,
      averageTotalPrice: r.averageTotalPrice,
    };
  });

  for (let i = 0; i < points.length; i++) {
    if (i >= 2) {
      const sma =
        (points[i].price + points[i - 1].price + points[i - 2].price) / 3;
      points[i].forecast = +sma.toFixed(2);
    } else {
      points[i].forecast = points[i].price;
    }
  }
  return points;
};

const rangeToYearsBack = (range: RangeKey): number | null => {
  switch (range) {
    case "1y":
      return 1;
    case "2y":
      return 2;
    case "3y":
      return 3;
    case "5y":
      return 5;
    case "10y":
      return 10;
    default:
      return null; // 3m/6m/all/custom obsłużymy inaczej
  }
};

export const useGusHistoricalAnalysis = (
  city: string | null = "Warszawa",
  range: RangeKey,
  customRange: [Date | null, Date | null]
) => {
  const [data, setData] = useState<HistoricalPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (!city) return;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      let rows: GusHousingListingData[] = [];

      const yb = rangeToYearsBack(range);
      if (yb != null) {
        rows = await GusListingsService.getRecentYears(
          city,
          yb,
          controller.signal
        );
      } else if (range === "custom" && customRange[0] && customRange[1]) {
        const [from, to] = customRange;
        const yFrom = from!.getFullYear();
        const yTo = to!.getFullYear();
        const mFrom = from!.getMonth() + 1; // 1..12
        const mTo = to!.getMonth() + 1; // 1..12
        rows = await GusListingsService.getByDateRange(
          city,
          yFrom,
          yTo,
          mFrom,
          mTo,
          controller.signal
        );
      } else {
        rows = await GusListingsService.getRecentYears(
          city,
          1,
          controller.signal
        );
      }

      const points = toHistoricalPoints(rows || []);
      if (!controller.signal.aborted) setData(points);
    } catch (e: any) {
      if (!controller.signal.aborted) {
        setError(
          e?.response?.data || e?.message || "Błąd pobierania danych GUS."
        );
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [city, range, customRange]);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  const refetch = useCallback(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (range === "3m" || range === "6m") {
      const months = range === "3m" ? 3 : 6;
      const tail = data.slice(-Math.ceil(months / 3));
      return tail;
    }
    return data;
  }, [data, range]);

  return { data: filtered, loading, error, refetch };
};


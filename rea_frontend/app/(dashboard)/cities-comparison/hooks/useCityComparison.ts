"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useOtodomCities } from "@/hooks/useOtodomCities";
import { OtodomListingsService } from "@/services/api/Otodom";
import type { CityComparisonData } from "@/services/api/models";

export type FilterConfigItem =
  | {
      id: "cities";
      type: "multiselect";
      label: string;
      options: { value: string; label: string }[];
      defaultValue: string[];
      searchable?: boolean;
      clearable?: boolean;
    }
  | {
      id: "priceRange";
      type: "range";
      label: string;
      min: number;
      max: number;
      step: number;
      defaultValue: [number, number];
      suffix?: string;
    }
  | {
      id: "primaryShare";
      type: "range";
      label: string;
      min: number;
      max: number;
      step: number;
      defaultValue: [number, number];
      suffix?: string;
    };

export const useCityComparison = () => {
  const { options: cityOptions, loading: citiesLoading } = useOtodomCities();

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [allData, setAllData] = useState<CityComparisonData[]>([]);
  const [filteredData, setFilteredData] = useState<CityComparisonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const cacheRef = useRef<Map<string, CityComparisonData>>(new Map());

  useEffect(() => {
    if (citiesLoading || !cityOptions.length || selectedCities.length) return;

    const warszawa =
      cityOptions.find((o) => o.value.toLocaleLowerCase("pl-PL") === "warszawa")
        ?.value ?? null;

    const base: string[] = warszawa ? [warszawa] : [];
    const more = cityOptions
      .map((o) => o.value)
      .filter((v) => !base.includes(v))
      .slice(0, 5);

    setSelectedCities([...base]);
  }, [citiesLoading, cityOptions, selectedCities.length]);

  const fetchSelectedCitiesData = useCallback(async (chosen: string[]) => {
    abortRef.current?.abort();
    const c = new AbortController();
    abortRef.current = c;

    setLoading(true);
    setError(null);

    try {
      const missing = chosen.filter((city) => !cacheRef.current.has(city));

      const jobs = missing.map(async (city) => {
        const raw = await OtodomListingsService.getDataByCity(city, c.signal);

        const share = raw[0].developerMarketShaers;
        const primarySharePct = share <= 1 ? share * 100 : share;

        const item: CityComparisonData = {
          city,
          averagePrice: Number(raw[0].averagePricePerSqm ?? 0),
          primaryMarketShare: primarySharePct, // w %
          averageBuildingYear: Number(raw[0].averageBuildingsBuiltYear ?? 0),
          totalOffers: Number(raw[0].totalOffers ?? 0),
        };
        cacheRef.current.set(city, item);
      });

      await Promise.allSettled(jobs);

      const ok = chosen
        .map((city) => cacheRef.current.get(city))
        .filter(Boolean) as CityComparisonData[];

      setAllData(ok);
      setFilteredData(ok);
    } catch (e: any) {
      if (!c.signal.aborted) setError(e?.message || "Błąd pobierania danych.");
    } finally {
      if (!c.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCities.length) {
      fetchSelectedCitiesData(selectedCities);
    } else {
      setAllData([]);
      setFilteredData([]);
    }
    return () => abortRef.current?.abort();
  }, [selectedCities, fetchSelectedCitiesData]);

  const priceExtent = useMemo<[number, number]>(() => {
    if (!allData.length) return [0, 0];
    const vals = allData.map((d) => d.averagePrice);
    return [Math.min(...vals), Math.max(...vals)];
  }, [allData]);

  const shareExtent = useMemo<[number, number]>(() => {
    if (!allData.length) return [0, 100];
    const vals = allData.map((d) => d.primaryMarketShare);
    return [Math.min(...vals), Math.max(...vals)];
  }, [allData]);

  const defaultSelected = useMemo(() => {
    if (selectedCities.length) return selectedCities;

    const warszawa =
      cityOptions.find((o) => o.value.toLocaleLowerCase("pl-PL") === "warszawa")
        ?.value ?? null;

    const base: string[] = warszawa ? [warszawa] : [];
    const more = cityOptions
      .map((o) => o.value)
      .filter((v) => !base.includes(v))
      .slice(0, 5);

    return [...base];
  }, [cityOptions, selectedCities]);

  const filterConfig: FilterConfigItem[] = useMemo(() => {
    return [
      {
        id: "cities",
        type: "multiselect",
        label: "Miasta",
        options: cityOptions,
        defaultValue: defaultSelected,
        searchable: true,
        clearable: true,
      },
      {
        id: "priceRange",
        type: "range",
        label: "Cena (PLN/m²)",
        min: Math.floor(priceExtent[0]),
        max: Math.ceil(priceExtent[1]),
        step: 100,
        defaultValue: [Math.floor(priceExtent[0]), Math.ceil(priceExtent[1])],
      },
      {
        id: "primaryShare",
        type: "range",
        label: "Udział rynku pierwotnego (%)",
        min: Math.floor(shareExtent[0]),
        max: Math.ceil(shareExtent[1]),
        step: 1,
        defaultValue: [Math.floor(shareExtent[0]), Math.ceil(shareExtent[1])],
        suffix: "%",
      },
    ];
  }, [cityOptions, defaultSelected, priceExtent, shareExtent]);

  const filtersKey = `fc-${cityOptions.length}-${priceExtent.join(
    "-"
  )}-${shareExtent.join("-")}`;

  const handleFilterChange = useCallback(
    (vals: Record<string, any>) => {
      let data = [...allData];

      if (Array.isArray(vals.cities)) {
        setSelectedCities(vals.cities);
        data = data.filter((d) => vals.cities.includes(d.city));
      }

      if (Array.isArray(vals.priceRange)) {
        const [minP, maxP] = vals.priceRange;
        data = data.filter(
          (d) => d.averagePrice >= minP && d.averagePrice <= maxP
        );
      }

      if (Array.isArray(vals.primaryShare)) {
        const [minS, maxS] = vals.primaryShare;
        data = data.filter(
          (d) => d.primaryMarketShare >= minS && d.primaryMarketShare <= maxS
        );
      }

      setFilteredData(data);
    },
    [allData]
  );

  return {
    filteredData,
    selectedCities,
    loading,
    error,

    filterConfig,
    handleFilterChange,

    filtersKey,
  };
};

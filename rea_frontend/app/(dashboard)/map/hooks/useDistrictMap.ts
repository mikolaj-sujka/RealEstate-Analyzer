"use client";
import {
  MapRow,
  OtodomDistrictStat,
} from "@/services/api/models/types/otodom-listings";
import { OtodomListingsService } from "@/services/api/Otodom";
import { useCallback, useEffect, useMemo, useState } from "react";

export const toMapRow = (item: OtodomDistrictStat): MapRow => {
  return {
    averagePrice: item.averagePricePerSqm.toFixed(0),
    properties: item.totalBuildingOffers,
    label: item.district,
    averageFlatSize: item.averageFlatSize,
    averageBuildingBuiltYear: item.averageBuildingBuiltYear,
  };
};

export const useDistrictMap = (initialCity: string = "Warszawa") => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);

  const [raw, setRaw] = useState<OtodomDistrictStat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);
  const [propertiesRange, setPropertiesRange] = useState<[number, number]>([
    0, 1,
  ]);

  const fetchData = useCallback(async () => {
    if (!selectedCity) return;

    setIsLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const data = await OtodomListingsService.getDistrictStats(
        selectedCity,
        controller.signal
      );
      setRaw(data ?? []);
    } catch (e: any) {
      if (e?.name !== "CanceledError" && e?.message !== "canceled") {
        setError(e?.response?.data ?? e?.message ?? "Nieznany błąd");
      }
    } finally {
      setIsLoading(false);
    }

    return () => controller.abort();
  }, [selectedCity]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      cleanup = await fetchData();
    })();
    return () => cleanup?.();
  }, [fetchData]);

  const districts = useMemo(
    () =>
      (Array.isArray(raw) ? raw[0]?.cityDisctricts : raw?.cityDisctricts) ?? [],
    [raw]
  );

  const mapData = useMemo(() => districts.map(toMapRow), [districts]);

  const priceConfig = useMemo(() => {
    if (!mapData.length) return { min: 0, max: 1 };
    const arr = mapData.map((d) => d.averagePrice ?? 0);
    return { min: Math.min(...arr), max: Math.max(...arr) };
  }, [mapData]);

  const propertiesConfig = useMemo(() => {
    if (!mapData.length) return { min: 0, max: 1 };
    const arr = mapData.map((d) => d.properties ?? 0);
    return { min: Math.min(...arr), max: Math.max(...arr) };
  }, [mapData]);

  useEffect(() => {
    if (mapData.length) {
      setPriceRange([priceConfig.min, priceConfig.max]);
      setPropertiesRange([propertiesConfig.min, propertiesConfig.max]);
    }
  }, [
    mapData,
    priceConfig.min,
    priceConfig.max,
    propertiesConfig.min,
    propertiesConfig.max,
  ]);

  const filteredData = useMemo(
    () =>
      mapData.filter(
        (d) =>
          (d.averagePrice ?? 0) >= priceRange[0] &&
          (d.averagePrice ?? 0) <= priceRange[1] &&
          (d.properties ?? 0) >= propertiesRange[0] &&
          (d.properties ?? 0) <= propertiesRange[1]
      ),
    [mapData, priceRange, propertiesRange]
  );

  const filterConfig = [
    {
      id: "selectedCity",
      type: "select",
      label: "Miasto",
      options: [{ value: selectedCity, label: selectedCity }],
      defaultValue: selectedCity,
    },
    {
      id: "priceRange",
      type: "range",
      label: "Zakres cen (PLN/m²)",
      min: priceConfig.min,
      max: priceConfig.max,
      step: Math.max(1, Math.round((priceConfig.max - priceConfig.min) / 100)),
      defaultValue: [priceConfig.min, priceConfig.max],
    },
    {
      id: "propertiesRange",
      type: "range",
      label: "Liczba ofert",
      min: propertiesConfig.min,
      max: propertiesConfig.max,
      step: Math.max(
        1,
        Math.round((propertiesConfig.max - propertiesConfig.min) / 100)
      ),
      defaultValue: [propertiesConfig.min, propertiesConfig.max],
    },
  ] as const;

  return {
    selectedCity,
    setSelectedCity,
    filteredData,
    priceConfig,
    propertiesConfig,
    priceRange,
    setPriceRange,
    propertiesRange,
    setPropertiesRange,
    isLoading,
    error,
    refetch: fetchData,
    filterConfig,
  };
};

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { OtodomListingsService } from "@/services/api/Otodom";
import { useOtodomCities } from "@/hooks/useOtodomCities";
import { OtodomDistrictStat } from "@/services/api/models/types/otodom-listings";

export type AnalysisType = "basic" | "advanced";

export const useInvestorCenter = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Warszawa");
  const [analysisType, setAnalysisType] = useState<AnalysisType>("basic");
  const [isSwitching, setIsSwitching] = useState(false);

  const {
    options: cityOptions,
    loading: citiesLoading,
    error: citiesError,
  } = useOtodomCities();

  const [rows, setRows] = useState<OtodomDistrictStat[]>([]);
  const [rowsLoading, setRowsLoading] = useState<boolean>(false);
  const [rowsError, setRowsError] = useState<string | null>(null);

  const fetchCityData = useCallback(
    async (city: string, signal?: AbortSignal) => {
      setRowsLoading(true);
      setRowsError(null);
      try {
        const list = await OtodomListingsService.getDistrictStats(city, signal);
        const districts = list?.cityDisctricts ?? [];
        setRows(districts as OtodomDistrictStat[]);
      } catch (e: any) {
        if (!signal?.aborted) {
          setRowsError(
            e?.response?.data || e?.message || "Błąd pobierania danych miasta."
          );
        }
      } finally {
        if (!signal?.aborted) setRowsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (citiesLoading || !cityOptions.length) return;
    const allValues = cityOptions.map((o) => o.value);
    if (!allValues.includes(selectedCity)) {
      const warszawa =
        cityOptions.find(
          (o) => o.value.toLocaleLowerCase("pl-PL") === "powiat m. st. warszawa"
        )?.value ?? null;

      setSelectedCity(warszawa!);
    }
  }, [citiesLoading, cityOptions, selectedCity]);

  useEffect(() => {
    if (!selectedCity) return;
    const c = new AbortController();
    fetchCityData(selectedCity, c.signal);
    return () => c.abort();
  }, [selectedCity, fetchCityData]);

  const handleAnalysisTypeChange = (value: string) => {
    setIsSwitching(true);
    setAnalysisType(value as AnalysisType);
    setTimeout(() => setIsSwitching(false), 150);
  };

  const handleChartInit = () => {};

  return {
    selectedCity,
    setSelectedCity,
    analysisType,
    handleAnalysisTypeChange,
    isSwitching,
    cityOptions,
    citiesLoading,
    citiesError,
    rows,
    rowsLoading,
    rowsError,
    handleChartInit,
  };
};

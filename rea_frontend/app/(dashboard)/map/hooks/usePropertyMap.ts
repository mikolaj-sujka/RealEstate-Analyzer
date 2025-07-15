"use client";
import { useState, useEffect, useMemo } from "react";
import { cityMapData } from "../models";
import { FilterConfig } from "@/models";

export const usePropertyMap = (initialCity: string = "Warszawa") => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const mapData = cityMapData[selectedCity] || [];

  const [priceConfig, setPriceConfig] = useState({ min: 0, max: 1 });
  const [propertiesConfig, setPropertiesConfig] = useState({ min: 0, max: 1 });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);
  const [propertiesRange, setPropertiesRange] = useState<[number, number]>([
    0, 1,
  ]);

  useEffect(() => {
    if (!mapData.length) return;
    const prices = mapData.map((d) => d.averagePrice);
    const props = mapData.map((d) => d.properties);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minProps = Math.min(...props);
    const maxProps = Math.max(...props);
    setPriceConfig({ min: minPrice, max: maxPrice });
    setPropertiesConfig({ min: minProps, max: maxProps });
    setPriceRange([minPrice, maxPrice]);
    setPropertiesRange([minProps, maxProps]);
  }, [selectedCity, mapData]);

  const filteredData = useMemo(
    () =>
      mapData.filter(
        (d) =>
          d.averagePrice >= priceRange[0] &&
          d.averagePrice <= priceRange[1] &&
          d.properties >= propertiesRange[0] &&
          d.properties <= propertiesRange[1]
      ),
    [mapData, priceRange, propertiesRange]
  );

  const filterConfig: FilterConfig[] = [
    {
      id: "selectedCity",
      type: "select",
      label: "Miasto",
      options: Object.keys(cityMapData).map((city) => ({
        value: city,
        label: city,
      })),
      defaultValue: "Warszawa",
    },
    {
      id: "priceRange",
      type: "range",
      label: "Zakres cen (PLN/m²)",
      min: 0,
      max: 20000,
      step: 100,
      defaultValue: [0, 20000],
    },
    {
      id: "propertiesRange",
      type: "range",
      label: "Liczba nieruchomości",
      min: 0,
      max: 500,
      step: 5,
      defaultValue: [0, 500],
    },
  ];

  return {
    selectedCity,
    setSelectedCity,
    priceConfig,
    propertiesConfig,
    priceRange,
    setPriceRange,
    propertiesRange,
    setPropertiesRange,
    filteredData,
    filterConfig,
  };
};

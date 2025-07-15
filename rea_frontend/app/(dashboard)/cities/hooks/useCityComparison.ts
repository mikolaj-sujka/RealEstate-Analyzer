"use client";
import { useState } from "react";
import {
  citiesData,
  cityColors,
  CityComparisonData,
  cityComparisonFilterConfig,
  extendedPriceHistoryData,
} from "../models";

export function useCityComparison() {
  const transformedCitiesData: CityComparisonData[] = citiesData.map(
    (city) => ({
      ...city,
      trend: city.trend === "up" ? "up" : "down",
    })
  );
  const [filteredData, setFilteredData] = useState<CityComparisonData[]>(
    transformedCitiesData
  );
  const [selectedCities, setSelectedCities] = useState<string[]>(
    cityComparisonFilterConfig.find((f) => f.id === "cities")
      ?.defaultValue as string[]
  );

  const handleFilterChange = (vals: Record<string, any>) => {
    let data = [...transformedCitiesData];

    if (Array.isArray(vals.cities) && vals.cities.length) {
      setSelectedCities(vals.cities);
    }

    if (vals.trend) {
      data = data.filter((c) => c.trend === vals.trend);
    }

    if (Array.isArray(vals.growthRange)) {
      const [min, max] = vals.growthRange;
      data = data.filter((c) => c.growth >= min && c.growth <= max);
    }

    if (Array.isArray(vals.priceRange)) {
      const [min, max] = vals.priceRange;
      data = data.filter((c) => c.averagePrice >= min && c.averagePrice <= max);
    }

    setFilteredData(data);
  };

  return {
    filteredData,
    selectedCities,
    extendedPriceHistoryData,
    cityColors,
    filterConfig: cityComparisonFilterConfig,
    handleFilterChange,
  };
}

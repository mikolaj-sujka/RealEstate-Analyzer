import { useMemo, useState } from "react";
import { allCitiesData, CityData, cityNameMap } from "../models";

export const useCityComparison = (
  initialCities: string[] = ["Warsaw", "Krakow", "Gdansk"]
) => {
  const [selectedCities, setSelectedCities] = useState<string[]>(initialCities);

  const filteredCityData: CityData[] = useMemo(
    () =>
      allCitiesData.filter((city) =>
        selectedCities.includes(
          Object.keys(cityNameMap).find(
            (key) => cityNameMap[key] === city.city
          ) || ""
        )
      ),
    [selectedCities]
  );

  return { selectedCities, setSelectedCities, filteredCityData };
};

import { useState, useEffect } from "react";
import { PropertyTypeData, propertyTypeData } from "../models";

export function usePropertyDistribution() {
  const [data, setData] = useState<PropertyTypeData[]>([]);

  useEffect(() => {
    // Możliwość fetcha z API
    setData(propertyTypeData);
  }, []);

  return { data };
}

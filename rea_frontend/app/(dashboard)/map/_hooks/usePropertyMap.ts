import { useState, useEffect } from 'react';
import { DistrictData, mapData as initialMapData } from '../models';

export function usePropertyMap() {
  const [data, setData] = useState<DistrictData[]>([]);

  useEffect(() => {
    // tu można fetchać z API
    setData(initialMapData);
  }, []);

  return { data };
}
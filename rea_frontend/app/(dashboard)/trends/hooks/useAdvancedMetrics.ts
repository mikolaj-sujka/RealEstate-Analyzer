import { useState, useEffect } from "react";
import { advancedMetricsData, AdvancedTrendMetric } from "../models";

export const useAdvancedMetrics = (city: string) => {
    const [data, setData] = useState<AdvancedTrendMetric[]>([]);
    useEffect(() => {
        setData(advancedMetricsData[city] || []);
    }, [city]);
    return data;
}
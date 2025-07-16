import { useState, useEffect } from "react";
import { investmentMetrics, InvestmentTrendMetric } from "../models";

export const useInvestmentMetrics = (city: string) => {
    const [data, setData] = useState<InvestmentTrendMetric[]>([]);
    useEffect(() => {
        setData(investmentMetrics[city] || []);
    }, [city]);
    return data;
}
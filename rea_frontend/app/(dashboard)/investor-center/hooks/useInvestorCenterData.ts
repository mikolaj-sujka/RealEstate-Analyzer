import { useState, useEffect } from "react";
import { cityTrendData, TrendPoint } from "../models";

export const useInvestorCenterData = (city: string) => {
    const [data, setData] = useState<TrendPoint[]>([]);
    useEffect(() => {
        setData(cityTrendData[city] || []);
    }, [city]);
    return data;
}
import { useMemo, useState } from "react";
import { investorCityDistricts } from "../models/consts/investorCenterMock";

export type AnalysisType = "basic" | "advanced"; // basic=Deal Finder, advanced=Premia za nowość

export const useInvestorCenter = () => {
    const [selectedCity, setSelectedCity] = useState<string>("Warszawa");
    const [analysisType, setAnalysisType] = useState<AnalysisType>("basic");
    const [isSwitching, setIsSwitching] = useState(false);

    const cityOptions = useMemo(
        () => Object.keys(investorCityDistricts).map(c => ({ value: c, label: c })),
        []
    );

    const handleAnalysisTypeChange = (value: string) => {
        setIsSwitching(true);
        setAnalysisType(value as AnalysisType);
        setTimeout(() => setIsSwitching(false), 150); // drobny efekt overlay
    };

    const handleChartInit = () => { /* opcjonalnie przechowaj instancję */ };

    return {
        selectedCity, setSelectedCity,
        analysisType, handleAnalysisTypeChange,
        isSwitching,
        cityOptions,
        handleChartInit,
    };
}

import { investorCityDistricts } from "../models/consts/investorCenterMock";
import { getDealFinderOption, getNewnessPremiumOption, getRiskBoxplotOption } from "../utils";

export function useInvestorCharts(city: string, type: "basic" | "advanced") {
    const rows = investorCityDistricts[city] ?? [];

    const mainOption = type === "basic"
        ? getDealFinderOption(rows)
        : getNewnessPremiumOption(rows);

    const riskOption = getRiskBoxplotOption(rows, city);

    return { mainOption, riskOption };
}

import { getDealFinderOption, getNewnessPremiumOption, getRiskBoxplotOption } from "../utils";
import { Row } from "./useInvestorCenter";

export function useInvestorCharts(city: string, rows: Row[], type: "basic" | "advanced") {

    const mainOption = type === "basic"
        ? getDealFinderOption(rows)
        : getNewnessPremiumOption(rows);

    const riskOption = getRiskBoxplotOption(rows, city);

    return { mainOption, riskOption };
}

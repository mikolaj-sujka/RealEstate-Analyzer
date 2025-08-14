import { SimulationParams } from "../models";

export const runMonteCarloSimulation = ({
    initialInvestment,
    years,
    annualContribution,
    meanPriceGrowth,
    stdDevPriceGrowth,
    meanRentYield,
    stdDevRentYield,
    simulations,
}: SimulationParams): number[] => {
    // Limit simulations to prevent large string serialization issues
    const maxSimulations = Math.min(simulations, 10000);
    const results: number[] = [];
    
    for (let i = 0; i < maxSimulations; i++) {
        let value = initialInvestment;
        for (let y = 0; y < years; y++) {
            const priceGrowth =
                meanPriceGrowth + stdDevPriceGrowth * (Math.random() * 2 - 1);
            const rentYield =
                meanRentYield + stdDevRentYield * (Math.random() * 2 - 1);

            value *= 1 + priceGrowth / 100;
            value += value * (rentYield / 100);
            value += annualContribution;
        }
        results.push(value);
    }
    return results;
};
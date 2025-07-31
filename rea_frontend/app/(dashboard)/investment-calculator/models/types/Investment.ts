export type SimulationParams = {
    initialInvestment: number;
    years: number;
    annualContribution: number;
    meanPriceGrowth: number;
    stdDevPriceGrowth: number;
    meanRentYield: number;
    stdDevRentYield: number;
    simulations: number;
}

export type SimulationResult = {
    roi: number;
    npv: number;
    irr: number;
    distribution: number[];
}

export type HistogramBin = {
    start: number;
    end: number;
    count: number;
}
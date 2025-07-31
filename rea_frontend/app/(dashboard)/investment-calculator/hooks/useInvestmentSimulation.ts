"use client";

import { useState } from "react";
import { SimulationResult } from "../models";
import { runMonteCarloSimulation } from "../utils";

export const useInvestmentSimulation = () => {
    const [initialInvestment, setInitialInvestment] = useState(500_000);
    const [years, setYears] = useState(10);
    const [priceGrowth, setPriceGrowth] = useState(5);
    const [rentYield, setRentYield] = useState(4);
    const [inflation, setInflation] = useState(3);
    const [interestRate, setInterestRate] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<SimulationResult | null>(null);

    const handleSimulation = () => {
        setIsLoading(true);
        setResult(null);

        setTimeout(() => {
            const finalValues = runMonteCarloSimulation({
                initialInvestment,
                years,
                annualContribution: 0, // Wartość zahardkodowana w oryginale
                meanPriceGrowth: priceGrowth,
                stdDevPriceGrowth: 2, // Wartość zahardkodowana w oryginale
                meanRentYield: rentYield,
                stdDevRentYield: 1, // Wartość zahardkodowana w oryginale
                simulations: 1000, // Wartość zahardkodowana w oryginale
            });

            // Obliczenia ROI
            const rois = finalValues.map(
                (v) => ((v - initialInvestment) / initialInvestment) * 100
            );
            const avgFinalValue =
                finalValues.reduce((a, b) => a + b, 0) / finalValues.length;
            const avgRoi = ((avgFinalValue - initialInvestment) / initialInvestment) * 100;

            // Obliczenia NPV
            const realDiscountRate = (interestRate - inflation) / 100;
            const annualRentIncome = initialInvestment * (rentYield / 100);

            const cashFlows = [-initialInvestment];
            for (let i = 0; i < years - 1; i++) {
                cashFlows.push(annualRentIncome);
            }
            cashFlows.push(annualRentIncome + avgFinalValue);

            const npv = cashFlows.reduce(
                (acc, val, i) => acc + val / Math.pow(1 + realDiscountRate, i),
                0
            );

            const irr = avgRoi / years;

            setResult({
                roi: avgRoi,
                npv,
                irr,
                distribution: rois,
            });
            setIsLoading(false);
        }, 1000);
    };

    return {
        params: {
            initialInvestment,
            years,
            priceGrowth,
            rentYield,
            inflation,
            interestRate,
        },
        setters: {
            setInitialInvestment,
            setYears,
            setPriceGrowth,
            setRentYield,
            setInflation,
            setInterestRate,
        },
        result,
        isLoading,
        handleSimulation,
    };
};
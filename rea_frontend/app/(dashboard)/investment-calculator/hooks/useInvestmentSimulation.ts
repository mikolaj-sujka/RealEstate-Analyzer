"use client";

import { useState } from "react";
import { runMonteCarloSimulation } from "../utils";

export type InvestmentCalculatorSimulationResult = {
  roi: number; // średni ROI (%)
  npv: number; // średnie NPV
  irr: number; // mediana IRR (%)
  cagr: number; // mediana CAGR (%)
  distribution: number[]; // ROI (%) – do histogramu
  percentiles: {
    roi: { p5: number; p50: number; p95: number };
    npv: { p5: number; p50: number; p95: number };
    irr: { p5: number; p50: number; p95: number };
    finalValue: { p5: number; p50: number; p95: number };
  };
};

export const useInvestmentSimulation = () => {
  const [initialInvestment, setInitialInvestment] = useState(500_000);
  const [years, setYears] = useState(10);
  const [priceGrowth, setPriceGrowth] = useState(5); // % średnio
  const [rentYield, setRentYield] = useState(4); // % w 1. roku (yield)
  const [inflation, setInflation] = useState(3);
  const [interestRate, setInterestRate] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<InvestmentCalculatorSimulationResult | null>(null);

  const handleSimulation = () => {
    setIsLoading(true);
    try {
      const out = runMonteCarloSimulation({
        initialInvestment,
        years,
        simulations: 2000,

        meanPriceGrowth: priceGrowth,
        stdDevPriceGrowth: 2,

        startingRentYield: rentYield,
        meanRentGrowth: 2, // rozsądny domyślny wzrost czynszów (%)
        stdDevRentGrowth: 1,

        vacancyRate: 5, // % pustostanu
        opexRatio: 30, // % kosztów operacyjnych
        sellingCostsPct: 2, // koszty wyjścia

        correlation: 0.3, // korelacja: czynsze–ceny

        nominalDiscountRate: interestRate,
        inflation,

        useExitCap: false, // jeśli chcesz – ustaw true i exitCapRate
        exitCapRate: 6,
      });

      const r = {
        roi: out.summary.roi.mean,
        npv: out.summary.npv.mean,
        irr: out.summary.irr.median * 100, // na %
        cagr: out.summary.cagr.median, // już w %
        distribution: out.rois,
        percentiles: {
          roi: {
            p5: out.summary.roi.p5,
            p50: out.summary.roi.median,
            p95: out.summary.roi.p95,
          },
          npv: {
            p5: out.summary.npv.p5,
            p50: out.summary.npv.median,
            p95: out.summary.npv.p95,
          },
          irr: {
            p5: out.summary.irr.p5 * 100,
            p50: out.summary.irr.median * 100,
            p95: out.summary.irr.p95 * 100,
          },
          finalValue: {
            p5: out.summary.finalValue.p5,
            p50: out.summary.finalValue.median,
            p95: out.summary.finalValue.p95,
          },
        },
      } satisfies InvestmentCalculatorSimulationResult;

      setResult(r);
    } finally {
      setIsLoading(false);
    }
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
  } as const;
};

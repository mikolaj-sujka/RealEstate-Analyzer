export type MonteCarloParams = {
  initialInvestment: number; // cena zakupu / wkład własny (model bez długu)
  years: number;
  simulations: number;

  // CENY (roczne %)
  meanPriceGrowth: number; // np. 5
  stdDevPriceGrowth: number; // np. 2

  // CZYNSZ (roczne % wzrostu)
  startingRentYield: number; // % od wartości nieruch. w 1. roku, np. 4
  meanRentGrowth: number; // np. 2
  stdDevRentGrowth: number; // np. 1

  // OPERACYJNE
  vacancyRate?: number; // % pustostanu, np. 5
  opexRatio?: number; // % kosztów operacyjnych od przychodu, np. 30
  sellingCostsPct?: number; // % kosztów wyjścia od ceny sprzedaży, np. 2

  // KORELACJA między wzrostem cen a wzrostem czynszów
  correlation?: number; // rho w [-1,1], np. 0.3

  // DYSKONTOWANIE
  nominalDiscountRate: number; // % (np. 6)
  inflation: number; // % (np. 3)

  // WYCENA KOŃCOWA (opcjonalnie przez cap rate)
  useExitCap?: boolean;
  exitCapRate?: number; // % (np. 6), jeśli useExitCap = true
};

export type SimulationOutputs = {
  finalValues: number[]; // V_T w każdym scenariuszu
  rois: number[]; // ROI = (ΣCF - inwestycja) / inwestycja (w %)
  npvs: number[]; // NPV per scenariusz
  irrs: number[]; // IRR per scenariusz (może być NaN, gdy brak znaku zmiany NPV)
  cagrs: number[]; // CAGR z wartości (V_T / V_0)^(1/n) - 1
  summary: {
    finalValue: Stats;
    roi: Stats;
    npv: Stats;
    irr: Stats;
    cagr: Stats;
  };
};

export type Stats = { mean: number; median: number; p5: number; p95: number };

export type HistogramBin = {
    start: number;
    end: number;
    count: number;
}
import { MonteCarloParams, SimulationOutputs, Stats } from "../models";

export function runMonteCarloSimulation(
  p: MonteCarloParams
): SimulationOutputs {
  const sims = p.simulations;
  const vacancy = (p.vacancyRate ?? 5) / 100;
  const opex = (p.opexRatio ?? 30) / 100;
  const sellCost = (p.sellingCostsPct ?? 2) / 100;
  const rho = clamp(p.correlation ?? 0.3, -1, 1);

  const finalValues: number[] = [];
  const rois: number[] = [];
  const npvs: number[] = [];
  const irrs: number[] = [];
  const cagrs: number[] = [];

  for (let s = 0; s < sims; s++) {
    let V = p.initialInvestment; // wartość nieruchomości
    let rent = V * (p.startingRentYield / 100); // czynsz brutto w 1. roku
    const cashflows: number[] = [-p.initialInvestment];

    for (let t = 1; t <= p.years; t++) {
      // skorelowane losowania: z1, z2 ~ N(0,1); z2' = rho*z1 + sqrt(1-rho^2)*z2
      const z1 = randomNormal();
      const z2 = randomNormal();
      const z2c = rho * z1 + Math.sqrt(1 - rho * rho) * z2;

      const gPrice = p.meanPriceGrowth + p.stdDevPriceGrowth * z1; // %
      const gRent = p.meanRentGrowth + p.stdDevRentGrowth * z2c; // %

      // geometria: unikamy „ujemnych cen”
      V = V * (1 + gPrice / 100);
      rent = rent * (1 + gRent / 100);

      // NOI = przychód*(1 - pustostan) * (1 - OPEX)
      const gross = rent;
      const noi = gross * (1 - vacancy) * (1 - opex);

      if (t < p.years) {
        cashflows.push(noi);
      } else {
        // terminal value
        const terminal =
          p.useExitCap && p.exitCapRate
            ? (noi * (1 + gRent / 100)) / (p.exitCapRate / 100) // NOI_{T+1}
            : V;
        const netExit = terminal * (1 - sellCost);
        cashflows.push(noi + netExit);
      }
    }

    const totalIn = cashflows.slice(1).reduce((a, b) => a + b, 0);
    const roi = ((totalIn - p.initialInvestment) / p.initialInvestment) * 100;
    const iNom = p.nominalDiscountRate / 100;
    const npv = npvOf(cashflows, iNom);
    const irr = irrOf(cashflows);
    const cagr =
      Math.pow(Math.max(1e-9, V) / p.initialInvestment, 1 / p.years) - 1;

    finalValues.push(V);
    rois.push(roi);
    npvs.push(npv);
    irrs.push(irr);
    cagrs.push(cagr);
  }

  return {
    finalValues,
    rois,
    npvs,
    irrs,
    cagrs,
    summary: {
      finalValue: stats(finalValues),
      roi: stats(rois),
      npv: stats(npvs),
      irr: stats(irrs.filter((x) => Number.isFinite(x))),
      cagr: stats(cagrs.map((x) => x * 100)), // w %
    },
  };
}

// ---------- matematyka / finanse ----------

function fisherReal(iNominal: number, inflation: number): number {
  // (1+i) = (1+r)(1+π) => r = (1+i)/(1+π) - 1
  return (1 + iNominal) / (1 + inflation) - 1;
}

function npvOf(cashflows: number[], rate: number): number {
  let pv = 0;
  for (let t = 0; t < cashflows.length; t++) {
    pv += cashflows[t] / Math.pow(1 + rate, t);
  }
  return pv;
}

function irrOf(cashflows: number[], tol = 1e-6, maxIter = 100): number {
  // spróbuj ująć rozwiązanie w przedziale
  let lo = -0.99; // stopa nie może być <= -100%
  let hi = 3.0; // 300% rocznie – górne ograniczenie
  let fLo = npvOf(cashflows, lo);
  let fHi = npvOf(cashflows, hi);
  // jeżeli brak zmiany znaku – IRR niewyznaczalne (np. same dodatnie CF)
  if (fLo * fHi > 0) return NaN;

  for (let it = 0; it < maxIter; it++) {
    const mid = 0.5 * (lo + hi);
    const fMid = npvOf(cashflows, mid);
    if (Math.abs(fMid) < tol) return mid;
    if (fLo * fMid <= 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }
  return 0.5 * (lo + hi);
}

// ---------- statystyka / losowania ----------

function randomNormal(): number {
  // Box–Muller: dwie U(0,1) => N(0,1)
  let u1 = 0,
    u2 = 0;
  // unikamy log(0)
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();
  const R = Math.sqrt(-2.0 * Math.log(u1));
  const theta = 2.0 * Math.PI * u2;
  return R * Math.cos(theta);
}

function stats(arr: number[]): Stats {
  const a = arr.slice().sort((x, y) => x - y);
  const mean = a.reduce((s, v) => s + v, 0) / a.length;
  const median =
    a.length % 2
      ? a[(a.length - 1) / 2]
      : (a[a.length / 2 - 1] + a[a.length / 2]) / 2;
  const p = (q: number) => {
    const idx = (a.length - 1) * q;
    const lo = Math.floor(idx),
      hi = Math.ceil(idx);
    return lo === hi ? a[lo] : a[lo] + (a[hi] - a[lo]) * (idx - lo);
  };
  return { mean, median, p5: p(0.05), p95: p(0.95) };
}

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

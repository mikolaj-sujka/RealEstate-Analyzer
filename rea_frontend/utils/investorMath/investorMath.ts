import { OtodomDistrictStat } from "@/services/api/models";
import { toRows } from "../filter";

export const fmt = (v: number) => (v ?? 0).toLocaleString("pl-PL");

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const z = (v: number, mean: number, sd: number) => (sd ? (v - mean) / sd : 0);
const norm01 = (v: number, min: number, max: number) =>
  max > min ? (v - min) / (max - min) : 0.5;

export function computeRisk(
  rows: OtodomDistrictStat[]
): Record<string, number> {
  const normalizedRows = toRows(rows);
  const price = normalizedRows.map((r) => r.averagePricePerSqm);
  const year = normalizedRows.map((r) => r.averageBuildingBuiltYear);
  const offers = normalizedRows.map((r) => r.totalBuildingOffers);

  const meanP = avg(price),
    sdP = std(price);
  const meanY = avg(year),
    sdY = std(year);
  const minO = Math.min(...offers),
    maxO = Math.max(...offers);

  const risk: Record<string, number> = {};
  for (const r of normalizedRows) {
    const priceZ = Math.abs(z(r.averagePricePerSqm, meanP, sdP));
    const ageDiffZ = Math.abs(z(r.averageBuildingBuiltYear, meanY, sdY));
    const illiq = 1 - norm01(r.totalBuildingOffers, minO, maxO);
    const score01 = clamp01(0.5 * priceZ + 0.3 * illiq + 0.2 * ageDiffZ);
    risk[r.district] = score01;
  }
  return risk;
}
const avg = (a: number[]) => a.reduce((s, x) => s + x, 0) / (a.length || 1);
const std = (a: number[]) => {
  const m = avg(a);
  return Math.sqrt(avg(a.map((x) => (x - m) ** 2)));
};

export function linearRegressionXY(x: number[], y: number[]) {
  const n = x.length;
  let sx = 0,
    sy = 0,
    sxy = 0,
    sxx = 0;
  for (let i = 0; i < n; i++) {
    sx += x[i];
    sy += y[i];
    sxy += x[i] * y[i];
    sxx += x[i] * x[i];
  }
  const m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const b = (sy - m * sx) / n;
  const yhat = x.map((v) => m * v + b);
  const rmse = Math.sqrt(avg(y.map((yy, i) => (yy - yhat[i]) ** 2)));
  return { m, b, rmse };
}


export function quantiles(sorted: number[]) {
    const q = (p: number) => {
        const pos = (sorted.length - 1) * p;
        const base = Math.floor(pos);
        const rest = pos - base;
        return sorted[base] + (sorted[base + 1] - sorted[base]) * (isNaN(rest) ? 0 : rest);
    };
    const q1 = q(0.25);
    const q2 = q(0.5);
    const q3 = q(0.75);
    const iqr = q3 - q1;
    const whiskerLow = Math.max(sorted[0], q1 - 1.5 * iqr);
    const whiskerHigh = Math.min(sorted[sorted.length - 1], q3 + 1.5 * iqr);
    const outliers = sorted.filter(v => v < whiskerLow || v > whiskerHigh);
    return { q1, q2, q3, whiskerLow, whiskerHigh, outliers };
}

export const fmt = (v: number) => (v ?? 0).toLocaleString("pl-PL");

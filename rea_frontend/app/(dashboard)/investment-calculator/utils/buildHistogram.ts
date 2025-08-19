import { HistogramBin } from "../models";

export const buildHistogram = (
    data: number[],
    binCount = 20
): HistogramBin[] => {
    if (!data.length) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const width = (max - min) / binCount || 1;

    const bins: HistogramBin[] = Array.from({ length: binCount }, (_, i) => ({
        start: min + i * width,
        end: min + (i + 1) * width,
        count: 0,
    }));

    data.forEach((val) => {
        const idx = val === max ? binCount - 1 : Math.floor((val - min) / width);
        if (bins[idx]) {
            bins[idx].count += 1;
        }
    });

    return bins;
}
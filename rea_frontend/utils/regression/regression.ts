export function linearRegression(points: Array<[number, number]>) {
    const n = points.length;
    if (n < 2) return { m: 0, b: 0 };

    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (const [x, y] of points) {
        sumX += x; sumY += y; sumXY += x * y; sumXX += x * x;
    }
    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;
    return { m, b };
}

export function regressionLine(m: number, b: number, xMin: number, xMax: number) {
    return [
        [xMin, m * xMin + b],
        [xMax, m * xMax + b],
    ] as Array<[number, number]>;
}

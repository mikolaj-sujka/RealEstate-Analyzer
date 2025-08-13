import { OtodomVoivodeshipStat, VoivodeshipMarketData } from "@/services/api/models";

export function aggregateVoivodeshipStats(
    rows: OtodomVoivodeshipStat[]
): VoivodeshipMarketData {
    if (!rows.length) {
        return {
            totalOffers: 0,
            averagePricePerSqm: 0,
            averageBuildingsBuiltYear: 0,
            developerMarketShare: 0,
            primaryMarketShare: 0,
            medianPricePerSqm: 0,
        };
    }

    // Wagi = totalOffers (sensowniejsze niż zwykła średnia):
    const totalOffersSum = rows.reduce((s, r) => s + (r.totalOffers ?? 0), 0) || 1;

    const weighted = (sum: number, value: number, weight: number) => sum + value * weight;

    const avgPrice = rows.reduce(
        (s, r) => weighted(s, r.averagePricePerSqm, r.totalOffers || 0),
        0
    ) / totalOffersSum;

    const avgYear = rows.reduce(
        (s, r) => weighted(s, r.averageBuildingsBuiltYear, r.totalOffers || 0),
        0
    ) / totalOffersSum;

    const devShare = rows.reduce(
        (s, r) => weighted(s, r.developerMarketShare, r.totalOffers || 0),
        0
    ) / totalOffersSum;

    const primaryShare = rows.reduce(
        (s, r) => weighted(s, r.primaryMarketShare, r.totalOffers || 0),
        0
    ) / totalOffersSum;

    // Medianę trudno uśredniać sensownie bez surowych próbek — bierzemy medianę z węzła o największej liczbie ofert:
    const dominant = rows.reduce((best, r) =>
        (r.totalOffers || 0) > (best.totalOffers || 0) ? r : best
        , rows[0]);

    return {
        totalOffers: rows.reduce((s, r) => s + (r.totalOffers || 0), 0),
        averagePricePerSqm: avgPrice || 0,
        averageBuildingsBuiltYear: avgYear || 0,
        developerMarketShare: devShare || 0,
        primaryMarketShare: primaryShare || 0,
        medianPricePerSqm: dominant?.medianPricePerSqm ?? 0,
    };
}

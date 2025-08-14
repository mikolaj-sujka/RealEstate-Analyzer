export interface OtodomDistrictStat {
    district: string;                 // nazwa dzielnicy
    averagePricePerSqm: number;       // średnia cena za m²
    averageFlatSize: number;          // średni metraż mieszkań
    totalBuildingOffers: number;            // liczba ofert
    averageBuildingBuiltYear: number; // średni rok budowy
    [key: string]: any;
}

export interface GetOtodomCityDistrictsResponse {
    cityDisctricts: OtodomDistrictStat[];
}

export type MapRow = {
    averagePrice: string;             // PLN/m² (mapujemy z averagePricePerSqm)
    properties: number;               // liczba ofert (mapujemy z totalBuildingOffers)
    label?: string;                   // nazwa dzielnicy
    [k: string]: any;                 // dodatkowe pola do tooltipów
};

export interface OtodomVoivodeshipStat {
    totalOffers: number;                // uint
    averagePricePerSqm: number;         // decimal
    averageBuildingsBuiltYear: number;  // uint
    developerMarketShare: number;       // decimal (0..1 lub 0..100% - użyj zgodnie z backendem)
    primaryMarketShare: number;         // decimal
    medianPricePerSqm: number;          // decimal
}

export interface VoivodeshipMarketData {
    totalOffers: number;
    averagePricePerSqm: number;
    averageBuildingsBuiltYear: number;
    developerMarketShare: number;
    primaryMarketShare: number;
    medianPricePerSqm: number;
}

export type OtodomDistrictStat = {
    district: string;                 // nazwa dzielnicy
    averagePricePerSqm: number;       // średnia cena za m²
    averageFlatSize: number;          // średni metraż mieszkań
    totalBuildingOffers: number;            // liczba ofert
    averageBuildingBuiltYear: number; // średni rok budowy
    [key: string]: any;
}

export type GetOtodomCityDistrictsResponse = {
    cityDisctricts: OtodomDistrictStat[];
}

export type MapRow = {
    averagePrice: string;             // PLN/m² (mapujemy z averagePricePerSqm)
    properties: number;               // liczba ofert (mapujemy z totalBuildingOffers)
    label?: string;                   // nazwa dzielnicy
    [k: string]: any;                 // dodatkowe pola do tooltipów
};

export type OtodomVoivodeshipStat = {
    totalOffers: number;                // uint
    averagePricePerSqm: number;         // decimal
    averageBuildingsBuiltYear: number;  // uint
    developerMarketShare: number;       // decimal (0..1 lub 0..100% - użyj zgodnie z backendem)
    primaryMarketShare: number;         // decimal
    medianPricePerSqm: number;          // decimal
    averageFlatSize: number;
}

export type VoivodeshipMarketData = {
    totalOffers: number;
    averagePricePerSqm: number;
    averageBuildingsBuiltYear: number;
    developerMarketShare: number;
    primaryMarketShare: number;
    medianPricePerSqm: number;
    averageFlatSize: number;
}

export type OtodomCityResponse = {
    id?: string;
    name: string;
};

export type OtodomLatestTransaction = {
    id: string;
    price: number;
    city: string;
    voivodeship: string;
    transactionDate: string;
    propertyType: string;
    marketType: string;
    [key: string]: any;
}

export type GetOtodomCityDataListingsResponse = {
  TotalOffers: number;
  AveragePricePerSqm: number;
  AverageBuildingsBuiltYear: number;
  DeveloperMarketShaers: number; // <-- zostawiam pisownię jak w API
};

export type CityComparisonData = {
  city: string;
  averagePrice: number;           // = AveragePricePerSqm
  primaryMarketShare: number;     // = DeveloperMarketShaers (0..1 lub 0..100 -> patrz transform)
  averageBuildingYear: number;    // = AverageBuildingsBuiltYear
  totalOffers: number;            // = TotalOffers
};
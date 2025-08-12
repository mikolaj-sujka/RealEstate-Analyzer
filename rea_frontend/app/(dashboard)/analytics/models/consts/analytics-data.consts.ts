import type { MarketAnalyticsData } from "../types";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export const generateVoivodeshipData = (
    basePrice: number,       // bazowa średnia cena
    baseListings: number,    // bazowa liczba ofert
    steps = 6
): MarketAnalyticsData => {
    const out: MarketAnalyticsData = {
        averagePrice: 0,
        averageAreaSize: 0,
        totalListings: 0,
        developerMarketShare: 0,
        primaryMarketShare: 0,
        medianPrice: 0,
        averageYearOfConstruction: 0
    };

    // wartości startowe / założenia
    let avgPrice = basePrice;
    let listings = baseListings;
    let avgArea = rand(45, 65);                      // średni metraż startowy
    let medianToAvg = rand(0.92, 0.98);               // mediana ~ 92–98% średniej (roboczo)
    let avgYear = Math.round(rand(1995, 2015));       // średni rok budowy startowo
    let devShare = clamp(rand(0.35, 0.65), 0, 1);     // udział deweloperów
    let primShare = clamp(rand(0.3, 0.6), 0, 1);      // udział pierwotnego

    // lekkie wahania — brak osi czasu, więc to tylko “kroki”
    avgPrice *= 1 + (Math.random() - 0.4) * 0.05;   // ±3% (lekka tendencja)
    listings *= 1 + (Math.random() - 0.4) * 0.10;   // ±6%
    avgArea *= 1 + (Math.random() - 0.5) * 0.02;   // ±1%
    medianToAvg = clamp(medianToAvg * (1 + (Math.random() - 0.5) * 0.01), 0.9, 1);
    avgYear = clamp(avgYear + Math.round(rand(-1, 2)), 1970, new Date().getFullYear());
    devShare = clamp(devShare + (Math.random() - 0.5) * 0.04, 0, 1);   // ±2pp
    primShare = clamp(primShare + (Math.random() - 0.5) * 0.04, 0, 1); // ±2pp

    const medianPrice = avgPrice * medianToAvg;

    out.averagePrice = Math.round(avgPrice);
    out.averageAreaSize = Math.round(avgArea);
    out.totalListings = Math.round(listings);
    out.developerMarketShare = Math.round(devShare * 100);
    out.primaryMarketShare = Math.round(primShare * 100);
    out.medianPrice = Math.round(medianPrice);
    out.averageYearOfConstruction = avgYear;

    return out;
};

export const voivodeshipMarketData: Record<string, MarketAnalyticsData> = {
    "Cała Polska": generateVoivodeshipData(8950, 1520),
    Dolnośląskie: generateVoivodeshipData(10500, 1300),
    "Kujawsko-pomorskie": generateVoivodeshipData(7500, 900),
    Lubelskie: generateVoivodeshipData(8200, 850),
    Lubuskie: generateVoivodeshipData(6800, 600),
    Łódzkie: generateVoivodeshipData(7200, 1100),
    Małopolskie: generateVoivodeshipData(11800, 1400),
    Mazowieckie: generateVoivodeshipData(14000, 2500),
    Opolskie: generateVoivodeshipData(6500, 400),
    Podkarpackie: generateVoivodeshipData(7900, 700),
    Podlaskie: generateVoivodeshipData(7600, 650),
    Pomorskie: generateVoivodeshipData(11500, 1600),
    Śląskie: generateVoivodeshipData(8100, 1800),
    Świętokrzyskie: generateVoivodeshipData(6900, 350),
    "Warmińsko-mazurskie": generateVoivodeshipData(7200, 500),
    Wielkopolskie: generateVoivodeshipData(9800, 1200),
    Zachodniopomorskie: generateVoivodeshipData(8500, 800),
};

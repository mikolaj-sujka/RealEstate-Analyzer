import { MarketData } from "../types"

const generateVoivodeshipData = (basePrice: number, baseListings: number): MarketData[] => {
    const data: MarketData[] = []
    let currentPrice = basePrice
    let currentListings = baseListings
    for (const month of ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]) {
        currentPrice = currentPrice * (1 + (Math.random() - 0.4) * 0.05)
        currentListings = currentListings * (1 + (Math.random() - 0.4) * 0.1)
        const sales = currentListings * (0.7 + Math.random() * 0.2)
        const inventory = currentListings * 1.5 - sales
        data.push({
            month,
            averagePrice: Math.round(currentPrice),
            listings: Math.round(currentListings),
            sales: Math.round(sales),
            totalInventory: Math.round(inventory),
        })
    }
    return data
}

export const voivodeshipMarketData: { [key: string]: MarketData[] } = {
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
}



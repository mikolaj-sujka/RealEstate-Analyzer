import {
  DollarSign,
  Home,
  ChartBar,
  SquareDivide,
} from "lucide-react";
import { MarketAnalyticsData } from "../models/types/MarketAnalyticsData";

export const getCitiesAnalyticsCards = (data: MarketAnalyticsData) => {
    return [
        {
            label: "Średnia Cena",
            value: data?.averagePrice.toLocaleString("pl-PL") + " PLN/m²",
            icon: DollarSign,
        },
        {
            label: "Liczba Ofert",
            value: data?.totalListings.toLocaleString("pl-PL") + " szt." || "–",
            icon: Home,
        },
        {
            label: "Udział deweloperów",
            value: data?.developerMarketShare.toLocaleString("pl-PL") + " %" || "–",
            icon: ChartBar,
        },
        {
            label: "Średnia powierzchnia",
            value: data?.averageAreaSize.toLocaleString("pl-PL") + " m²" || "–",
            icon: SquareDivide,
        },
    ];
}

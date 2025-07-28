import {
  DollarSign,
  Home,
  ChartBar,
  Users,
} from "lucide-react";
import { MarketAnalyticsData } from "../models/types/MarketAnalyticsData";

export const getCitiesAnalyticsCards = (lastMonth: MarketAnalyticsData, changes: { price: any; listings: any; sales: any; inventory: any; }) => {
    return [
        {
            label: "Średnia Cena",
            value: lastMonth?.averagePrice.toLocaleString("pl-PL") + " PLN/m²",
            change: changes.price,
            icon: DollarSign,
        },
        {
            label: "Nowe Oferty",
            value: lastMonth?.listings.toLocaleString("pl-PL") || "–",
            change: changes.listings,
            icon: Home,
        },
        {
            label: "Wolumen Sprzedaży",
            value: lastMonth?.sales.toLocaleString("pl-PL") || "–",
            change: changes.sales,
            icon: ChartBar,
        },
        {
            label: "Zapasy Rynkowe",
            value: lastMonth?.totalInventory.toLocaleString("pl-PL") || "–",
            change: changes.inventory,
            icon: Users,
        },
    ];
}

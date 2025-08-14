import {
  DollarSign,
  Home,
  ChartBar,
  SquareDivide,
} from "lucide-react";
import { VoivodeshipMarketData } from "@/services/api/models";

export const getCitiesAnalyticsCards = (data: VoivodeshipMarketData) => {
    console.log(data);
    return [
        {
            label: "Średnia Cena",
            value: data?.averagePricePerSqm.toLocaleString("pl-PL") + " PLN/m²",
            icon: DollarSign,
        },
        {
            label: "Liczba Ofert",
            value: data?.totalOffers.toLocaleString("pl-PL") + " szt." || "–",
            icon: Home,
        },
        {
            label: "Udział deweloperów",
            value: data?.developerMarketShare.toLocaleString("pl-PL") + " %" || "–",
            icon: ChartBar,
        },
        {
            label: "Średnia powierzchnia",
            value: data?.averageFlatSize?.toLocaleString("pl-PL") + " m²" || "–",
            icon: SquareDivide,
        },
    ];
}

import { IconDashboard, IconMap, IconChartBar, IconTrendingUp, IconBuildingStore, IconCalculator, IconHelp, IconEyeDollar, IconMapPinDollar } from "@tabler/icons-react";

export const sidebarSections = [
    {
        title: "Przegląd",
        items: [
            { href: "/dashboard", label: "Pulpit", icon: IconDashboard },
            { href: "/map", label: "Mapa Nieruchomości", icon: IconMap },
        ],
    },
    {
        title: "Analiza",
        items: [
            { href: "/analytics", label: "Analityka Rynku", icon: IconChartBar },
            { href: "/investor-center", label: "Centrum Inwestora", icon: IconEyeDollar },
            { href: "/cities", label: "Porównanie Miast", icon: IconBuildingStore },
        ],
    },
    {
        title: "Kalkulatory",
        items: [
            { href: "/investment-score", label: "Kalkulator Potencjału Inwestycyjnego", icon: IconMapPinDollar },
            { href: "/investment-calculator", label: "Symulator Rentowności Inwestycji", icon: IconCalculator },
        ],
    },
    {
        title: "Pomoc",
        items: [
            { href: "/help-center", label: "Centrum Pomocy", icon: IconHelp },
        ],
    },
];

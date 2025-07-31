import { IconCalculator, IconChartLine, IconMap } from "@tabler/icons-react";

export const LANDING_PAGE_FEATURES = [
    {
        Icon: IconChartLine,
        label: '24/7 Dostępność',
        sub: 'Analizuj kiedy chcesz',
    },
    {
        Icon: IconMap,
        label: 'Mapa nieruchomości',
        sub: 'Wizualizuj dane',
    },
    {
        Icon: IconCalculator,
        label: 'Kalkulator inwestycyjny',
        sub: 'Oszacuj zyski',
    },
] as const;
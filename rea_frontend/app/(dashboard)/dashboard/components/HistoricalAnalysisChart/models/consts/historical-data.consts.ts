import {
  IconCurrencyZloty,
  IconChartLine,
  IconBuildingEstate,
  IconBuildingStore,
  IconBuildingWarehouse,
} from "@tabler/icons-react";

export const timeRanges = [
  { label: "1R", value: "1y" },
  { label: "2L", value: "2y" },
  { label: "3L", value: "3y" },
  { label: "5L", value: "5y" },
  { label: "10L", value: "10y" },
  { label: "Niestandardowy", value: "custom" },
];

export type MetricData = {
  label: string;
  value: string;
  icon: any;
  color: string;
};

export const metrics: MetricData[] = [
  {
    label: "Liczba Mieszkań",
    value: "flatsCompleted",
    icon: IconBuildingEstate,
    color: "#fab005",
  },
  {
    label: "Liczba Sprzedanych Mieszkań",
    value: "flatsSold",
    icon: IconBuildingStore,
    color: "#be4bdb",
  },
  {
    label: "Średnia Całkowita Cena",
    value: "averageTotalPrice",
    icon: IconBuildingWarehouse,
    color: "#15aabf",
  },
  {
    label: "Średnia cena za m²",
    value: "averagePricePerSqm",
    icon: IconBuildingWarehouse,
    color: "#15aabf",
  },
  {
    label: "Mediana ceny za m²",
    value: "medianPricePerSqm",
    icon: IconBuildingWarehouse,
    color: "#15aabf",
  },
];

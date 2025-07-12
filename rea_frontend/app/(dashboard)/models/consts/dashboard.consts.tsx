import { ChartData, Column, SparklineData, TransactionData } from "@/models/types";
import { Badge } from "@mantine/core";

export const priceData: ChartData[] = [
  { month: "Sty '24", price: 7000, prediction: 9500 },
  { month: "Lut '24", price: 7200, prediction: 9300 },
  { month: "Mar '24", price: 7500, prediction: 9100 },
  { month: "Kwi '24", price: 7300, prediction: 9400 },
  { month: "Maj '24", price: 7600, prediction: 9200 },
  { month: "Cze '24", price: 7400, prediction: 9500 },
  { month: "Lip '24", price: 7800, prediction: 9300 },
  { month: "Sie '24", price: 7600, prediction: 9600 },
  { month: "Wrz '24", price: 8000, prediction: 9400 },
  { month: "Paź '24", price: 7800, prediction: 9700 },
  { month: "Lis '24", price: 8200, prediction: 9500 },
  { month: "Gru '24", price: 8000, prediction: 9800 },
];

export const transactionsSparkline: SparklineData[] = [
  { value: 1200 },
  { value: 1350 },
  { value: 1250 },
  { value: 1500 },
  { value: 1450 },
  { value: 1650 },
  { value: 1748 },
];

export const offersSparkline: SparklineData[] = [
  { value: 95 },
  { value: 110 },
  { value: 105 },
  { value: 92 },
  { value: 87 },
  { value: 95 },
  { value: 87 },
];

export const growthSparkline: SparklineData[] = [
  { value: 15 },
  { value: 18 },
  { value: 17 },
  { value: 20 },
  { value: 19 },
  { value: 22 },
];

export const viewsSparkline: SparklineData[] = [
  { value: 25000 },
  { value: 27000 },
  { value: 26000 },
  { value: 29000 },
  { value: 32000 },
  { value: 34000 },
];

export const recentTransactions: TransactionData[] = [
  {
    id: 1,
    property: "Apartament 75m²",
    location: "Śródmieście",
    date: "12 cze 2025",
    price: "720,000 zł",
    pricePerM2: 9600,
    type: "Sprzedaż",
    status: "Zakończona",
  },
  {
    id: 2,
    property: "Dom wolnostojący 150m²",
    location: "Sławin",
    date: "11 cze 2025",
    price: "1,150,000 zł",
    pricePerM2: 7667,
    type: "Sprzedaż",
    status: "W trakcie",
  },
  {
    id: 3,
    property: "Kawalerka 30m²",
    location: "LSM",
    date: "10 cze 2025",
    price: "350,000 zł",
    pricePerM2: 11667,
    type: "Wynajem",
    status: "Zakończona",
  },
];

export const tableColumns: Column[] = [
  {
    key: "property",
    label: "Nieruchomość",
    sortable: true,
    filterable: true,
    width: "30%",
  },
  {
    key: "location",
    label: "Lokalizacja",
    sortable: true,
    filterable: true,
    width: "20%",
  },
  { key: "date", label: "Data", sortable: true, width: "15%" },
  { key: "price", label: "Cena", sortable: true, width: "15%" },
  {
    key: "status",
    label: "Status",
    sortable: true,
    filterable: true,
    width: "15%",
    render: (value: string) => (
      <Badge
        variant={value === "Zakończona" ? "outline" : "default"}
        className={
          value === "Zakończona" ? "border-green-500 text-green-500" : ""
        }
      >
        {value}
      </Badge>
    ),
  },
];

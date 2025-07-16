import {
  ChartData,
  Column,
  MetricGridCardData,
  SparklineData,
  TransactionData,
} from "@/models/types";
import { Badge } from "@mantine/core";
import {
  IconArrowUpRight,
  IconCurrencyDollar,
  IconHome,
  IconUsers,
} from "@tabler/icons-react";

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
  {
    id: 4,
    property: "Mieszkanie 60m²",
    location: "Czechów",
    date: "09 cze 2025",
    price: "480,000 zł",
    pricePerM2: 8000,
    type: "Sprzedaż",
    status: "W trakcie",
  },
  {
    id: 5,
    property: "Lokal użytkowy 100m²",
    location: "Północ",
    date: "08 cze 2025",
    price: "900,000 zł",
    pricePerM2: 9000,
    type: "Sprzedaż",
    status: "Zakończona",
  },
  {
    id: 6,
    property: "Działka budowlana 500m²",
    location: "Zemborzyce",
    date: "07 cze 2025",
    price: "250,000 zł",
    pricePerM2: 500,
    type: "Sprzedaż",
    status: "W trakcie",
  },
  {
    id: 7,
    property: "Apartament 90m²",
    location: "Wrotków",
    date: "06 cze 2025",
    price: "850,000 zł",
    pricePerM2: 9444,
    type: "Wynajem",
    status: "Zakończona",
  },
  {
    id: 8,
    property: "Dom szeregowy 120m²",
    location: "Dziesiąta",
    date: "05 cze 2025",
    price: "1,200,000 zł",
    pricePerM2: 10000,
    type: "Sprzedaż",
    status: "W trakcie",
  },
  {
    id: 9,
    property: "Kawalerka 35m²",
    location: "Lublin",
    date: "04 cze 2025",
    price: "400,000 zł",
    pricePerM2: 11429,
    type: "Wynajem",
    status: "Zakończona",
  },
  {
    id: 10,
    property: "Mieszkanie 80m²",
    location: "Szerokie",
    date: "03 cze 2025",
    price: "600,000 zł",
    pricePerM2: 7500,
    type: "Sprzedaż",
    status: "W trakcie",
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

export const metrics: MetricGridCardData[] = [
  {
    label: "Transakcje",
    value: "1,748",
    change: "+5.2%",
    changeColor: "green",
    icon: IconArrowUpRight,
    sparklineData: transactionsSparkline,
    sparklineColor: "var(--mantine-color-green-6)",
  },
  {
    label: "Średnia Cena",
    value: "8,450 PLN/m²",
    change: "+2.1%",
    changeColor: "green",
    icon: IconCurrencyDollar,
    sparklineData: [
      { value: 4 },
      { value: 6 },
      { value: 8 },
      { value: 7 },
      { value: 9 },
      { value: 8 },
      { value: 10 },
    ],
    sparklineColor: "var(--mantine-color-blue-6)",
  },
  {
    label: "Nowe Oferty",
    value: "342",
    change: "-1.3%",
    changeColor: "red",
    icon: IconHome,
    sparklineData: [
      { value: 8 },
      { value: 6 },
      { value: 7 },
      { value: 5 },
      { value: 4 },
      { value: 6 },
      { value: 5 },
    ],
    sparklineColor: "var(--mantine-color-orange-6)",
  },
  {
    label: "Aktywni Użytkownicy",
    value: "2,847",
    change: "+12.5%",
    changeColor: "green",
    icon: IconUsers,
    sparklineData: [
      { value: 3 },
      { value: 5 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 11 },
      { value: 12 },
    ],
    sparklineColor: "var(--mantine-color-violet-6)",
  },
];

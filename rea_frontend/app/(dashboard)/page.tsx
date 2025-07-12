"use client"

import SimpleChart from "@/components/ui/chart-component"
import Sparkline from "@/components/ui/sparkline-component"
import AdvancedDataTable from "@/components/advanced-data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

// Rozszerzone dane dla lepszego wykresu
const priceData = [
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
]

const transactionsSparkline = [
  { value: 1200 },
  { value: 1350 },
  { value: 1250 },
  { value: 1500 },
  { value: 1450 },
  { value: 1650 },
  { value: 1748 },
]
const offersSparkline = [
  { value: 95 },
  { value: 110 },
  { value: 105 },
  { value: 92 },
  { value: 87 },
  { value: 95 },
  { value: 87 },
]
const growthSparkline = [{ value: 15 }, { value: 18 }, { value: 17 }, { value: 20 }, { value: 19 }, { value: 22 }]
const viewsSparkline = [
  { value: 25000 },
  { value: 27000 },
  { value: 26000 },
  { value: 29000 },
  { value: 32000 },
  { value: 34000 },
]
const recentTransactions = [
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
]
const tableColumns = [
  { key: "property", label: "Nieruchomość", sortable: true, filterable: true, width: "30%" },
  { key: "location", label: "Lokalizacja", sortable: true, filterable: true, width: "20%" },
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
        className={value === "Zakończona" ? "border-green-500 text-green-500" : ""}
      >
        {value}
      </Badge>
    ),
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transakcje</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,748</div>
            <p className="text-xs text-green-500">+5.2%</p>
            <div className="h-10 mt-2">
              <Sparkline data={transactionsSparkline} color="#34D399" height={40} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wzrost cen</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22%</div>
            <p className="text-xs text-green-500">+3.1%</p>
            <div className="h-10 mt-2">
              <Sparkline data={growthSparkline} color="#60A5FA" height={40} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nowe oferty</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-red-500">-2.5%</p>
            <div className="h-10 mt-2">
              <Sparkline data={offersSparkline} color="#FBBF24" height={40} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Wyświetlenia</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34k</div>
            <p className="text-xs text-green-500">+12.3%</p>
            <div className="h-10 mt-2">
              <Sparkline data={viewsSparkline} color="#F87171" height={40} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Analysis Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <SimpleChart
              data={priceData}
              height={350}
              showPrediction={true}
              accentColor="#3b82f6"
              secondaryColor="#818cf8"
              showDetailedTooltip={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Table */}
      <AdvancedDataTable data={recentTransactions} columns={tableColumns} pageSize={5} />
    </div>
  )
}

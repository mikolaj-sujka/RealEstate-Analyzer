import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building, LandPlotIcon as Land, Store } from "lucide-react"

const propertyTypeData = [
  { name: "Mieszkania", value: 60, color: "bg-blue-500", icon: Home },
  { name: "Domy", value: 25, color: "bg-green-500", icon: Building },
  { name: "Działki", value: 10, color: "bg-yellow-500", icon: Land },
  { name: "Komercyjne", value: 5, color: "bg-red-500", icon: Store },
]

export default function PropertyDistributionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rozkład typów nieruchomości</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {propertyTypeData.map((item) => (
          <div key={item.name} className="flex items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${item.color}`}>
              <item.icon className="h-4 w-4 text-white" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium">{item.name}</p>
            </div>
            <p className="text-sm font-semibold">{item.value}%</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

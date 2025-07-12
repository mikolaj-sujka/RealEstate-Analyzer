"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, MapPin, Home, TrendingUp } from "lucide-react"

const mapData = [
  { district: "Śródmieście", avgPrice: 12500, properties: 234, trend: "up", change: "+8.5%" },
  { district: "Mokotów", avgPrice: 11200, properties: 189, trend: "up", change: "+12.3%" },
  { district: "Żoliborz", avgPrice: 10800, properties: 156, trend: "up", change: "+5.7%" },
  { district: "Praga", avgPrice: 8900, properties: 298, trend: "down", change: "-2.1%" },
  { district: "Wola", avgPrice: 9800, properties: 167, trend: "up", change: "+15.2%" },
  { district: "Ursynów", avgPrice: 9200, properties: 145, trend: "up", change: "+7.8%" },
]

export default function PropertyMap() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" /> Mapa nieruchomości
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mapData.map((district) => (
              <Card key={district.district} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">{district.district}</h3>
                  </div>
                  <Badge variant={district.trend === "up" ? "default" : "destructive"}>
                    <TrendingUp className={`h-3 w-3 mr-1 ${district.trend === "down" ? "rotate-180" : ""}`} />
                    {district.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Price:</span>
                    <span className="font-medium">{district.avgPrice.toLocaleString()} PLN/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Properties:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Home className="h-3 w-3" />
                      {district.properties}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Map Placeholder</CardTitle>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center">
            <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Interactive map would be displayed here</p>
            <p className="text-sm text-muted-foreground mt-2">Integration with Google Maps or Mapbox</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

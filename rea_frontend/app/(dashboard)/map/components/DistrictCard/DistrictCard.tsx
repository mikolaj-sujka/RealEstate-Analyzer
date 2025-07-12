"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, TrendingUp } from "lucide-react";
import { DistrictData } from "../../models";

type DistrictCardProps = {
  item: DistrictData;
};

export const DistrictCard = ({ item }: DistrictCardProps) => {
  const TrendIcon = TrendingUp;
  const variant = item.trend === "up" ? "default" : "destructive";
  const rotateClass = item.trend === "down" ? "rotate-180" : "";

  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <h3 className="font-semibold">{item.district}</h3>
        </div>
        <Badge variant={variant}>
          <TrendIcon className={`h-3 w-3 mr-1 ${rotateClass}`} />
          {item.change}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Avg Price:</span>
          <span className="font-medium">
            {item.avgPrice.toLocaleString()} PLN/m²
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Properties:</span>
          <span className="font-medium flex items-center gap-1">
            <Home className="h-3 w-3" />
            {item.properties}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

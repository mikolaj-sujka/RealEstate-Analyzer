"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";

export const MapPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Map Placeholder</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex flex-col items-center justify-center bg-muted/50 rounded-lg">
        <Map className="h-16 w-16 mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">
          Interactive map would be displayed here
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Integration with Google Maps or Mapbox
        </p>
      </CardContent>
    </Card>
  );
}

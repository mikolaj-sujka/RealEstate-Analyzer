"use client";

import { Card, Container, Grid, Title, Text } from "@mantine/core";
import { Map } from "lucide-react";
import { usePropertyMap } from "./_hooks";
import { DistrictCard, MapPlaceholder } from "./components";

export default function PropertyMap() {
  const { data: districts } = usePropertyMap();

  return (
    <Container className="space-y-6">
      <Card>
        <Title order={2} className="flex items-center gap-2">
          <Map className="h-5 w-5" /> Map of Properties
        </Title>
        <Grid columns={3} gutter="lg">
          {districts.map((item) => (
            <Grid.Col key={item.district} span={1}>
              <DistrictCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Card>

      <MapPlaceholder />
    </Container>
  );
}

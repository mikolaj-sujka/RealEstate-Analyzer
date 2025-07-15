"use client";
import React from "react";
import { Select, NumberInput, Grid, Title, Group, Box } from "@mantine/core";
import { PropertyType } from "@/models";

type ParameterFormProps = {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  propertyType: PropertyType;
  onTypeChange: (type: PropertyType) => void;
  propertySize: number;
  onSizeChange: (size: number) => void;
};

export const ParameterForm = ({
  cities,
  selectedCity,
  onCityChange,
  propertyType,
  onTypeChange,
  propertySize,
  onSizeChange,
}: ParameterFormProps) => {
  return (
    <Box mb="lg">
      <Title order={4} mb="md">
        Parametry Nieruchomości
      </Title>
      <Group gap="lg" align="flex-start" wrap="wrap">
        <Box style={{ flex: "1 1 200px", minWidth: 200 }}>
          <Select
            label="Miasto"
            data={cities}
            value={selectedCity}
            onChange={(val) => val !== null && onCityChange(val)}
            mb="sm"
          />
        </Box>
        <Box style={{ flex: "1 1 200px", minWidth: 200 }}>
          <Select
            label="Typ Nieruchomości"
            data={["Mieszkanie", "Dom", "Lokal użytkowy"]}
            value={propertyType}
            onChange={(val) =>
              val !== null && onTypeChange(val as PropertyType)
            }
            mb="sm"
          />
        </Box>
        <Box style={{ flex: "1 1 150px", minWidth: 150 }}>
          <NumberInput
            label="Metraż (m²)"
            value={propertySize}
            onChange={(v) => onSizeChange(typeof v === "number" ? v : 0)}
            min={20}
            max={500}
            step={5}
          />
        </Box>
      </Group>
    </Box>
  );
};

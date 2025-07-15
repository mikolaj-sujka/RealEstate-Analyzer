import { Grid, Box, Text, RangeSlider, Select } from "@mantine/core";
import React from "react";

type FiltersProps = {
  cityOptions: { value: string; label: string }[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  priceConfig: { min: number; max: number };
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  propertiesConfig: { min: number; max: number };
  propertiesRange: [number, number];
  onPropertiesChange: (range: [number, number]) => void;
};

export const Filters = ({
  cityOptions,
  selectedCity,
  onCityChange,
  priceConfig,
  priceRange,
  onPriceChange,
  propertiesConfig,
  propertiesRange,
  onPropertiesChange,
}: FiltersProps) => {
  return (
    <>
      <Grid align="flex-end" mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box>
            <Text size="sm" fw={500} mb="xs">
              Zakres cenowy (PLN/m²): {priceRange[0].toLocaleString()} -{" "}
              {priceRange[1].toLocaleString()}
            </Text>
            <RangeSlider
              value={priceRange}
              onChange={onPriceChange}
              min={priceConfig.min}
              max={priceConfig.max}
              step={100}
              thumbSize={16}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box>
            <Text size="sm" fw={500} mb="xs">
              Liczba nieruchomości: {propertiesRange[0]} - {propertiesRange[1]}
            </Text>
            <RangeSlider
              value={propertiesRange}
              onChange={onPropertiesChange}
              min={propertiesConfig.min}
              max={propertiesConfig.max}
              step={10}
              thumbSize={16}
            />
          </Box>
        </Grid.Col>
      </Grid>
      <Select
        label="Wybierz miasto"
        data={cityOptions}
        value={selectedCity}
        onChange={(value) => value && onCityChange(value)}
        allowDeselect={false}
      />
    </>
  );
};

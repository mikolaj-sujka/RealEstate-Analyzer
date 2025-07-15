'use client';
import React from 'react';
import { Container, Paper, Title, Text } from '@mantine/core';
import { useCityComparison } from './hooks';
import { BarChart, FiltersWrapper, LineChart } from './components';

type CityComparisonProps = {
  title?: string;
  description?: string;
};

export default function CityComparison({ title = 'Porównanie miast', description }: CityComparisonProps) {
  const {
    filteredData,
    selectedCities,
    extendedPriceHistoryData,
    cityColors,
    filterConfig,
    handleFilterChange,
  } = useCityComparison();

  return (
    <Container size='xl' py='xl'>
      <Paper shadow='sm' p='lg' radius='md' withBorder mb='xl'>
        <Title order={2}>{title}</Title>
        {description && <Text size='sm' c='dimmed' mb='md'>{description}</Text>}

        <FiltersWrapper config={filterConfig} onChange={handleFilterChange} />

        <BarChart data={filteredData} selectedCities={selectedCities} />
      </Paper>

      <Paper shadow='sm' p='lg' radius='md' withBorder>
        <Title order={3}>Historia Cen według Miast</Title>
        <LineChart months={extendedPriceHistoryData} cities={selectedCities} colors={cityColors} />
      </Paper>
    </Container>
  );
}

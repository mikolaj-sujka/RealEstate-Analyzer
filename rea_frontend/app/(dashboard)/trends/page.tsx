"use client"

import { Container, Title, Text, Grid } from "@mantine/core"
import { TrendCard } from "./components/TrendCard"
import { TrendChart } from "./components/TrendChart"
import { CorrelationChart } from "./components/CorrelationChart"
import { HeatmapChart } from "./components/HeatmapChart"
import { useTrendComparison } from "./_hooks"

type TrendComparisonProps = {
  title?: string
  description?: string
}

export default function TrendComparison({ title = 'Trend comparison', description }: TrendComparisonProps) {
  const { marketData, corrData, heatmap } = useTrendComparison()

  return (
    <Container size="xl" py="xl">
      <Grid mb="xl">
        {corrData.map((item, i) => (
          <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 3 }}>
            <TrendCard item={item} />
          </Grid.Col>
        ))}
      </Grid>

      <Text size="xl" fw={600} mb="md">{title}</Text>
      {description && <Text c="dimmed" mb="lg">{description}</Text>}

      <TrendChart data={marketData} />

      <Grid mt="xl">
        <Grid.Col span={6}>
          <Text size="lg" fw={500} mb="md">Market Correlations</Text>
          <CorrelationChart data={corrData} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="lg" fw={500} mb="md">Correlation Heatmap</Text>
          <HeatmapChart data={heatmap} />
        </Grid.Col>
      </Grid>
    </Container>
  )
}
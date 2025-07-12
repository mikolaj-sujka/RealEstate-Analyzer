import TrendComparison from "@/trend-comparison"
import { metricsData } from "@/metrics-data"

export default function TrendsPage() {
  return (
    <TrendComparison
      metrics={metricsData}
      title="Porównanie trendów rynkowych"
      description="Analiza korelacji między różnymi metrykami rynku nieruchomości"
    />
  )
}

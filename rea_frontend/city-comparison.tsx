"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  title?: string
  description?: string
}

const cityData = [
  { city: "Warsaw", avgPrice: 12500, transactions: 2340, growth: 8.5 },
  { city: "Krakow", avgPrice: 9800, transactions: 1890, growth: 12.3 },
  { city: "Gdansk", avgPrice: 8900, transactions: 1456, growth: 15.7 },
  { city: "Wroclaw", avgPrice: 8200, transactions: 1234, growth: 9.8 },
  { city: "Poznan", avgPrice: 7800, transactions: 1123, growth: 7.2 },
]

const priceHistoryData = [
  { month: "Jan", Warsaw: 12000, Krakow: 9200, Gdansk: 8100, Wroclaw: 7800, Poznan: 7400 },
  { month: "Feb", Warsaw: 12100, Krakow: 9350, Gdansk: 8250, Wroclaw: 7850, Poznan: 7450 },
  { month: "Mar", Warsaw: 12200, Krakow: 9500, Gdansk: 8400, Wroclaw: 7900, Poznan: 7500 },
  { month: "Apr", Warsaw: 12350, Krakow: 9650, Gdansk: 8550, Wroclaw: 7950, Poznan: 7550 },
  { month: "May", Warsaw: 12450, Krakow: 9750, Gdansk: 8700, Wroclaw: 8100, Poznan: 7650 },
  { month: "Jun", Warsaw: 12500, Krakow: 9800, Gdansk: 8900, Wroclaw: 8200, Poznan: 7800 },
]

export default function CityComparison({ title = "City comparison", description }: Props) {
  const barChartRef = useRef<HTMLDivElement>(null)
  const lineChartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barChartRef.current) return

    const chart = echarts.init(barChartRef.current)

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: { color: "#374151" },
      },
      legend: {
        data: ["Avg Price (PLN/m²)", "Transactions"],
        top: 10,
        textStyle: { color: "#6b7280" },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: cityData.map((item) => item.city),
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
      },
      yAxis: [
        {
          type: "value",
          name: "Price",
          position: "left",
          axisLine: { lineStyle: { color: "#3b82f6" } },
          axisLabel: { color: "#6b7280" },
          splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
        },
        {
          type: "value",
          name: "Transactions",
          position: "right",
          axisLine: { lineStyle: { color: "#10b981" } },
          axisLabel: { color: "#6b7280" },
        },
      ],
      series: [
        {
          name: "Avg Price (PLN/m²)",
          type: "bar",
          yAxisIndex: 0,
          data: cityData.map((item) => item.avgPrice),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#3b82f6" },
              { offset: 1, color: "#3b82f680" },
            ]),
          },
          barWidth: "40%",
        },
        {
          name: "Transactions",
          type: "bar",
          yAxisIndex: 1,
          data: cityData.map((item) => item.transactions),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#10b981" },
              { offset: 1, color: "#10b98180" },
            ]),
          },
          barWidth: "40%",
        },
      ],
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.dispose()
    }
  }, [])

  useEffect(() => {
    if (!lineChartRef.current) return

    const chart = echarts.init(lineChartRef.current)

    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: { color: "#374151" },
      },
      legend: {
        data: ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan"],
        top: 10,
        textStyle: { color: "#6b7280" },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: priceHistoryData.map((item) => item.month),
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
        splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
      },
      series: ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan"].map((city, index) => ({
        name: city,
        type: "line",
        data: priceHistoryData.map((item) => item[city as keyof typeof item]),
        smooth: true,
        lineStyle: { color: colors[index], width: 3 },
        itemStyle: { color: colors[index] },
        emphasis: { focus: "series" },
      })),
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.dispose()
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
        <CardContent>
          <div ref={barChartRef} style={{ width: "100%", height: "400px" }} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price History by City</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={lineChartRef} style={{ width: "100%", height: "400px" }} />
        </CardContent>
      </Card>
    </div>
  )
}

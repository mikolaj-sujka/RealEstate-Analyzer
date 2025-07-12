"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Home, DollarSign, BarChart3, Users } from "lucide-react"

export default function AnalyticsPage() {
  const chartRef = useRef<HTMLDivElement>(null)

  // Real estate market data
  const marketData = [
    { month: "Jan", avgPrice: 8200, listings: 1240, sales: 890, inventory: 2100 },
    { month: "Feb", avgPrice: 8350, listings: 1180, sales: 920, inventory: 2050 },
    { month: "Mar", avgPrice: 8500, listings: 1320, sales: 1050, inventory: 1980 },
    { month: "Apr", avgPrice: 8650, listings: 1450, sales: 1180, inventory: 1920 },
    { month: "May", avgPrice: 8800, listings: 1380, sales: 1220, inventory: 1850 },
    { month: "Jun", avgPrice: 8950, listings: 1520, sales: 1350, inventory: 1780 },
  ]

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: { color: "#374151" },
        axisPointer: {
          type: "cross",
          crossStyle: { color: "#999" },
        },
      },
      legend: {
        data: ["Average Price", "New Listings", "Sales Volume", "Inventory"],
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
        data: marketData.map((item) => item.month),
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
      },
      yAxis: [
        {
          type: "value",
          name: "Price (PLN)",
          position: "left",
          axisLine: { lineStyle: { color: "#3b82f6" } },
          axisLabel: { color: "#6b7280" },
          splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
        },
        {
          type: "value",
          name: "Count",
          position: "right",
          axisLine: { lineStyle: { color: "#10b981" } },
          axisLabel: { color: "#6b7280" },
        },
      ],
      series: [
        {
          name: "Average Price",
          type: "line",
          yAxisIndex: 0,
          data: marketData.map((item) => item.avgPrice),
          smooth: true,
          lineStyle: { color: "#3b82f6", width: 3 },
          itemStyle: { color: "#3b82f6", borderWidth: 2, borderColor: "#fff" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#3b82f620" },
              { offset: 1, color: "#3b82f605" },
            ]),
          },
          emphasis: { focus: "series" },
        },
        {
          name: "New Listings",
          type: "bar",
          yAxisIndex: 1,
          data: marketData.map((item) => item.listings),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#10b981" },
              { offset: 1, color: "#10b98180" },
            ]),
          },
          emphasis: { focus: "series" },
        },
        {
          name: "Sales Volume",
          type: "line",
          yAxisIndex: 1,
          data: marketData.map((item) => item.sales),
          smooth: true,
          lineStyle: { color: "#f59e0b", width: 2 },
          itemStyle: { color: "#f59e0b" },
          emphasis: { focus: "series" },
        },
        {
          name: "Inventory",
          type: "line",
          yAxisIndex: 1,
          data: marketData.map((item) => item.inventory),
          smooth: true,
          lineStyle: { color: "#ef4444", width: 2, type: "dashed" },
          itemStyle: { color: "#ef4444" },
          emphasis: { focus: "series" },
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Market Analytics</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,950 PLN/m²</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +9.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Listings</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,520</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +10.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Volume</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,350</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +10.7% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Inventory</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,780</div>
            <p className="text-xs text-red-500 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3.8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Market Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
        </CardContent>
      </Card>
    </div>
  )
}

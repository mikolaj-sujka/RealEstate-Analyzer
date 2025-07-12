"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react"

type Props = {
  metrics: any[]
  title?: string
  description?: string
}

const trendData = [
  { month: "Jan", prices: 7200, transactions: 145, inventory: 890, demand: 78 },
  { month: "Feb", prices: 7350, transactions: 162, inventory: 875, demand: 82 },
  { month: "Mar", prices: 7500, transactions: 178, inventory: 860, demand: 85 },
  { month: "Apr", prices: 7650, transactions: 195, inventory: 845, demand: 88 },
  { month: "May", prices: 7800, transactions: 210, inventory: 830, demand: 92 },
  { month: "Jun", prices: 7950, transactions: 225, inventory: 815, demand: 95 },
]

const correlationData = [
  { metric: "Price vs Volume", correlation: 0.85, change: "+0.12" },
  { metric: "Inventory vs Price", correlation: -0.72, change: "-0.05" },
  { metric: "Season vs Demand", correlation: 0.68, change: "+0.08" },
  { metric: "Interest vs Sales", correlation: -0.91, change: "-0.03" },
]

const heatmapData = [
  ["Price", "Volume", 0.85],
  ["Price", "Inventory", -0.72],
  ["Price", "Demand", 0.68],
  ["Volume", "Inventory", -0.45],
  ["Volume", "Demand", 0.92],
  ["Inventory", "Demand", -0.58],
]

export default function TrendComparison({ title = "Trend comparison", description }: Props) {
  const trendChartRef = useRef<HTMLDivElement>(null)
  const correlationChartRef = useRef<HTMLDivElement>(null)
  const heatmapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trendChartRef.current) return

    const chart = echarts.init(trendChartRef.current)

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
        data: ["Prices", "Transactions", "Inventory", "Demand Index"],
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
        data: trendData.map((item) => item.month),
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
      },
      yAxis: [
        {
          type: "value",
          name: "Prices",
          position: "left",
          axisLine: { lineStyle: { color: "#3b82f6" } },
          axisLabel: { color: "#6b7280" },
          splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
        },
        {
          type: "value",
          name: "Count/Index",
          position: "right",
          axisLine: { lineStyle: { color: "#10b981" } },
          axisLabel: { color: "#6b7280" },
        },
      ],
      series: [
        {
          name: "Prices",
          type: "line",
          yAxisIndex: 0,
          data: trendData.map((item) => item.prices),
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
          name: "Transactions",
          type: "bar",
          yAxisIndex: 1,
          data: trendData.map((item) => item.transactions),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#10b981" },
              { offset: 1, color: "#10b98180" },
            ]),
          },
          emphasis: { focus: "series" },
        },
        {
          name: "Inventory",
          type: "line",
          yAxisIndex: 1,
          data: trendData.map((item) => item.inventory),
          smooth: true,
          lineStyle: { color: "#f59e0b", width: 2, type: "dashed" },
          itemStyle: { color: "#f59e0b" },
          emphasis: { focus: "series" },
        },
        {
          name: "Demand Index",
          type: "line",
          yAxisIndex: 1,
          data: trendData.map((item) => item.demand),
          smooth: true,
          lineStyle: { color: "#8b5cf6", width: 2 },
          itemStyle: { color: "#8b5cf6" },
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

  useEffect(() => {
    if (!correlationChartRef.current) return

    const chart = echarts.init(correlationChartRef.current)

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: { color: "#374151" },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: correlationData.map((item) => item.metric),
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280", rotate: 45 },
      },
      yAxis: {
        type: "value",
        min: -1,
        max: 1,
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisLabel: { color: "#6b7280" },
        splitLine: { lineStyle: { color: "#f3f4f6", type: "dashed" } },
      },
      series: [
        {
          type: "bar",
          data: correlationData.map((item) => ({
            value: item.correlation,
            itemStyle: {
              color:
                item.correlation > 0
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#10b981" },
                      { offset: 1, color: "#10b98180" },
                    ])
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#ef4444" },
                      { offset: 1, color: "#ef444480" },
                    ]),
            },
          })),
          barWidth: "60%",
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

  useEffect(() => {
    if (!heatmapRef.current) return

    const chart = echarts.init(heatmapRef.current)

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        position: "top",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: { color: "#374151" },
      },
      grid: {
        height: "50%",
        top: "10%",
      },
      xAxis: {
        type: "category",
        data: ["Price", "Volume", "Inventory", "Demand"],
        splitArea: { show: true },
        axisLabel: { color: "#6b7280" },
      },
      yAxis: {
        type: "category",
        data: ["Price", "Volume", "Inventory", "Demand"],
        splitArea: { show: true },
        axisLabel: { color: "#6b7280" },
      },
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "15%",
        inRange: {
          color: ["#ef4444", "#ffffff", "#10b981"],
        },
      },
      series: [
        {
          name: "Correlation",
          type: "heatmap",
          data: heatmapData,
          label: {
            show: true,
            formatter: "{c}",
            color: "#374151",
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
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
      {/* Correlation Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {correlationData.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.metric}</CardTitle>
              {item.correlation > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.correlation.toFixed(2)}</div>
              <p
                className={`text-xs flex items-center ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {item.change.startsWith("+") ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {item.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {title}
          </CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
        <CardContent>
          <div ref={trendChartRef} style={{ width: "100%", height: "400px" }} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Market Correlations</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={correlationChartRef} style={{ width: "100%", height: "300px" }} />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Correlation Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={heatmapRef} style={{ width: "100%", height: "300px" }} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

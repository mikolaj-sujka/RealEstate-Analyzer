"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface ChartProps {
  data: any[]
  height?: number
  showPrediction?: boolean
  accentColor?: string
  secondaryColor?: string
  showDetailedTooltip?: boolean
}

export function Chart({
  data,
  height = 300,
  showPrediction = false,
  accentColor = "#3b82f6",
  secondaryColor = "#818cf8",
}: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      backgroundColor: "transparent",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        textStyle: {
          color: "#374151",
        },
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      legend: {
        data: showPrediction ? ["Actual Price", "Prediction"] : ["Price"],
        top: 10,
        textStyle: {
          color: "#6b7280",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => item.month),
        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },
        axisLabel: {
          color: "#6b7280",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },
        axisLabel: {
          color: "#6b7280",
        },
        splitLine: {
          lineStyle: {
            color: "#f3f4f6",
            type: "dashed",
          },
        },
      },
      series: [
        {
          name: "Actual Price",
          type: "line",
          data: data.map((item) => item.price),
          smooth: true,
          lineStyle: {
            color: accentColor,
            width: 3,
          },
          itemStyle: {
            color: accentColor,
            borderWidth: 2,
            borderColor: "#fff",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${accentColor}20` },
              { offset: 1, color: `${accentColor}05` },
            ]),
          },
          emphasis: {
            focus: "series",
          },
        },
        ...(showPrediction
          ? [
              {
                name: "Prediction",
                type: "line",
                data: data.map((item) => item.prediction),
                smooth: true,
                lineStyle: {
                  color: secondaryColor,
                  width: 2,
                  type: "dashed",
                },
                itemStyle: {
                  color: secondaryColor,
                  borderWidth: 2,
                  borderColor: "#fff",
                },
                emphasis: {
                  focus: "series",
                },
              },
            ]
          : []),
      ],
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.dispose()
    }
  }, [data, showPrediction, accentColor, secondaryColor])

  return <div ref={chartRef} style={{ width: "100%", height: `${height}px` }} />
}

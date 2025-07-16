import { useCallback, useMemo, useState } from "react"
import { allMetrics, HistoricalData, metricColors } from "../models"
import { subMonths, startOfMonth } from 'date-fns'
import * as echarts from "echarts/core"
import { parseDate } from "@/utils"

export type RangePreset = '3m' | '6m' | '1y' | 'all'

export function useHistoricalAnalysis(
  initialPreset: RangePreset = '1y',
  data: HistoricalData[],
  defaultMetrics: string[] = ['price', 'prediction'],
) {
  const latest = useMemo(() => startOfMonth(parseDate(data[data.length - 1].month)), [data])
  const first = useMemo(() => startOfMonth(parseDate(data[0].month)), [data])

  const [range, setRange] = useState<[Date, Date]>(() => {
    if (initialPreset !== 'all') return [subMonths(latest, initialPreset === '3m' ? 3 : initialPreset === '6m' ? 6 : 12), latest]
    return [first, latest]
  })

  const setPreset = useCallback((preset: RangePreset) => {
    if (preset === 'all') setRange([first, latest])
    else if (preset === '3m') setRange([subMonths(latest, 3), latest])
    else if (preset === '6m') setRange([subMonths(latest, 6), latest])
    else setRange([subMonths(latest, 12), latest])
  }, [first, latest])

  const filtered = useMemo(() => data.filter(item => {
    const d = parseDate(item.month)
    return d >= range[0] && d <= range[1]
  }), [data, range])

  const [metrics, setMetrics] = useState<string[]>(defaultMetrics)

  const toggleMetric = useCallback((value: string[]) => {
    setMetrics(value)
  }, [])

  const series = useMemo(() => metrics.map(key => ({
    name: allMetrics.find(m => m.value === key)?.label,
    type: 'line',
    data: filtered.map(item => (item as any)[key]),
    smooth: true,
    lineStyle: { color: metricColors[key], width: key === 'prediction' ? 2.5 : 3 },
    itemStyle: { color: metricColors[key] },
    areaStyle: key === 'price' ? {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: `${metricColors.price}33` },
        { offset: 1, color: `${metricColors.price}00` },
      ])
    } : undefined,
    emphasis: { focus: 'series' },
  })), [filtered, metrics])

  return { range, setRange, setPreset, filtered, series, metrics, setMetrics: toggleMetric }
}
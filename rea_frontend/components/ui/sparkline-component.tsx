type SparklineProps = {
  data: { value: number }[]
  color?: string
  height?: number
}

/**
 * Bardzo lekki sparkline oparty na SVG – żadnych zewnętrznych bibliotek.
 */
export default function Sparkline({ data, color = "#0ea5e9", height = 40 }: SparklineProps) {
  if (data.length === 0) return null

  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - ((d.value - min) / (max - min)) * 100
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg viewBox="0 0 100 100" height={height} width="100%" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

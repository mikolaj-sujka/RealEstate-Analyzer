"use client"

import * as React from "react"
import { subDays, format } from "date-fns"
import { Button } from "@/components/ui/button"

type Preset = { label: string; start: Date; end: Date }

const presets: Preset[] = [
  { label: "7 dni", start: subDays(new Date(), 6), end: new Date() },
  { label: "30 dni", start: subDays(new Date(), 29), end: new Date() },
  { label: "Bieżący rok", start: new Date(new Date().getFullYear(), 0, 1), end: new Date() },
]

type Props = {
  onDateRangeChange?: (range: { start: Date; end: Date; label: string }) => void
  showStats?: boolean
}

export default function InteractiveDateRange({ onDateRangeChange, showStats }: Props) {
  const [selected, setSelected] = React.useState<Preset>(presets[1])

  const handleSelect = (preset: Preset) => {
    setSelected(preset)
    onDateRangeChange?.(preset)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {presets.map((preset) => (
        <Button
          key={preset.label}
          size="sm"
          variant={preset.label === selected.label ? "default" : "secondary"}
          onClick={() => handleSelect(preset)}
        >
          {preset.label}
        </Button>
      ))}
      {showStats && (
        <span className="ml-auto text-sm text-muted-foreground">
          {format(selected.start, "dd LLL yyyy")} – {format(selected.end, "dd LLL yyyy")}
        </span>
      )}
    </div>
  )
}

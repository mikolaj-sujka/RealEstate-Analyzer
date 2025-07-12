"use client"

import * as React from "react"
import { Plus, Upload, Settings2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  onAddProperty?: () => void
  onExport?: () => void
  onShare?: () => void
  onSettings?: () => void
}

export default function FloatingActions({ onAddProperty, onExport, onShare, onSettings }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <>
          <Button size="icon" variant="secondary" onClick={onExport}>
            <Upload className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={onShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={onSettings}>
            <Settings2 className="h-4 w-4" />
          </Button>
        </>
      )}
      <Button
        size="icon"
        className={cn("rounded-full transition-transform", open && "rotate-45")}
        onClick={() => setOpen((p) => !p)}
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  )
}

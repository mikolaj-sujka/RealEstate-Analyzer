"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Column = {
  key: string
  label: string
  width?: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}
type Props = {
  data: any[]
  columns: Column[]
  pageSize?: number
  selectable?: boolean
  onRowAction?: (action: string, row: any) => void
  onExport?: (rows: any[]) => void
}

export default function AdvancedDataTable({ data, columns, pageSize = 10, selectable, onRowAction, onExport }: Props) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")
  const [page, setPage] = React.useState(0)
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  const sorted = React.useMemo(() => {
    if (!sortKey) return data
    const sorted = [...data].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : a[sortKey] < b[sortKey] ? -1 : 0))
    return sortDir === "asc" ? sorted : sorted.reverse()
  }, [data, sortKey, sortDir])

  const paged = sorted.slice(page * pageSize, page * pageSize + pageSize)

  const toggleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    }
  }

  const toggleSelect = (idx: number) => {
    setSelected((prev) => {
      const copy = new Set(prev)
      copy.has(idx) ? copy.delete(idx) : copy.add(idx)
      return copy
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ostatnie transakcje</CardTitle>
        {onExport && (
          <Button size="sm" onClick={() => onExport([...selected].map((i) => paged[i]))}>
            Export
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[400px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-background">
              <tr>
                {selectable && <th className="w-8" />}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className="cursor-pointer select-none py-2 text-left font-semibold"
                    onClick={() => col.sortable && toggleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key &&
                        (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                    </div>
                  </th>
                ))}
                {onRowAction && <th className="w-8" />}
              </tr>
            </thead>
            <tbody>
              {paged.map((row, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  {selectable && (
                    <td className="p-2">
                      <input type="checkbox" checked={selected.has(idx)} onChange={() => toggleSelect(idx)} />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="p-2">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {onRowAction && (
                    <td className="p-2">
                      <Button size="icon" variant="ghost" onClick={() => onRowAction?.("details", row)}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
        {/* proste stronicowanie */}
        <div className="mt-4 flex justify-end gap-2">
          <Button size="sm" variant="secondary" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Poprzednia
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={(page + 1) * pageSize >= sorted.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Następna
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

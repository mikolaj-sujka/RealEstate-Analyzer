import type { ReactNode } from "react"

export type Column = {
  key: string
  label: string
  width?: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: any) => ReactNode
}

export type TableProps = {
  data: any[]
  columns: Column[]
  pageSize?: number
  selectable?: boolean
  onRowAction?: (action: string, row: any) => void
  onExport?: (rows: any[]) => void
}

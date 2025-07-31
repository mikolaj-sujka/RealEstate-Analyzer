export type SortDirection = "asc" | "desc";

export interface Column<Row = any> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: Row) => React.ReactNode;
}

export type RowActionType = "details" | "edit" | "delete";

export interface TableProps<Row = any> {
    data: Row[];
    columns: Column<Row>[];
    pageSize?: number;
    selectable?: boolean;
    onRowAction?: (action: RowActionType, row: Row) => void;
    onExport?: (rows: Row[]) => void;
    description?: string;
}

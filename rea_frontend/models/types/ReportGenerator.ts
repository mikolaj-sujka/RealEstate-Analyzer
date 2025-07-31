export type ReportSectionType = 'chart' | 'table' | 'text' | 'custom';

export type BaseSection = {
    id: string;
    title: string;
    type: ReportSectionType;
    subtitle?: string;
}

export type ChartSection = BaseSection & {
    type: 'chart';
    getImage: () => Promise<string>;
}

export type TableColumn = {
    header: string;
    key: string;
    render?: (value: any, row: any) => string;
}

export type TableSection = BaseSection & {
    type: 'table';
    columns: TableColumn[];
    data: any[];
}

export type ReportSection = ChartSection | TableSection;

export type ReportDefinition = {
    title: string;
    subtitle?: string;
    createdAt?: Date;
    sections: ReportSection[];
    fileName?: string;
}

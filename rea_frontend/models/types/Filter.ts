export type FilterOption = {
  value: string | number;
  label: string;
}

export type FilterType = "text" | "select" | "multiselect" | "range";

export type FilterConfig = {
  id: string;
  type: FilterType;
  label: string;
  placeholder?: string;
  options?: FilterOption[]; 
  min?: number; 
  max?: number; 
  step?: number; 
  marks?: Array<{ value: number; label: string }>; 
  defaultValue?: any;
}

export type FilterValues = {
  [key: string]: string | number | (string | number)[] | undefined;
}

export type FilterOption = {
  label: string;
  value: string | number;
}

export type FilterConfig = {
  id: string;
  label: string;
  type: 'text' | 'select' | 'range';
  placeholder?: string;
  options?: FilterOption[]; 
  min?: number; 
  max?: number; 
  step?: number; 
  defaultValue?: any;
}

export type FilterValues = {
  [key: string]: string | number | number[] | undefined;
}
import { OtodomDistrictStat } from "@/services/api/models";

export const toRows = (input: unknown): OtodomDistrictStat[] => {
  if (Array.isArray(input)) return input as OtodomDistrictStat[];
  if (typeof input === "string") {
    try {
      return toRows(JSON.parse(input));
    } catch {
      return [];
    }
  }
  if (input && typeof input === "object") {
    const any = input as any;
    if (Array.isArray(any.data)) return any.data as OtodomDistrictStat[]; // axios: response.data
    if (Array.isArray(any.items)) return any.items as OtodomDistrictStat[];
    return Object.values(any) as OtodomDistrictStat[];
  }
  return [];
}

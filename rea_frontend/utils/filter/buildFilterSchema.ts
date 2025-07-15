import { FilterConfig } from "@/models/types/Filter";
import * as z from 'zod';

export const buildFilterSchema = (config: FilterConfig[]) => {
  const shape: Record<string, z.ZodType<any>> = {};

  config.forEach((filter) => {
    switch (filter.type) {
      case "text":
        shape[filter.id] = z.string().optional();
        break;
      case "select":
        shape[filter.id] = z
          .union([z.string(), z.number().transform((num) => String(num))])
          .optional();
        break;
      case "range":
        shape[filter.id] = z.array(z.number()).length(2).optional();
        break;
    }
  });

  return z.object(shape);
}

import { FilterConfig, FilterValues } from "@/models";
import { useState, useCallback, useEffect } from "react";

type UseFiltersProps = {
  config: FilterConfig[];
  onChange: (values: FilterValues) => void;
}

export const useFilters = ({ config, onChange }: UseFiltersProps) => {
  const getDefaults = useCallback((): FilterValues => {
    const defs: FilterValues = {};
    config.forEach((f) => {
      if (f.defaultValue !== undefined) {
        defs[f.id] = f.defaultValue;
      }
    });
    return defs;
  }, [config]);

  const [values, setValues] = useState<FilterValues>(getDefaults());
  const [expanded, setExpanded] = useState<boolean>(true);

  useEffect(() => {
    onChange(values);
  }, []); 

  const setFilter = (id: string, val: any) => {
    const next = { ...values, [id]: val };
    setValues(next);
    onChange(next);
  };

  const clearAll = () => {
    const defs = getDefaults();
    setValues(defs);
    onChange(defs);
  };

  return {
    values,
    setFilter,
    clearAll,
    expanded,
    setExpanded,
  };
}

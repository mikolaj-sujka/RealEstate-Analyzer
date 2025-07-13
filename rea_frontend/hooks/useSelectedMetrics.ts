import { useState, useCallback } from "react";

export function useSelectedMetrics(defaults: string[] = []) {
  const [selected, setSelected] = useState<string[]>(defaults);

  const toggleMetric = useCallback((metric: string) => {
    setSelected((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  }, []);

  return { selected, setSelected, toggleMetric };
}

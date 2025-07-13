import { useState, useCallback } from "react";
import { subMonths, startOfMonth } from "date-fns";
import { HistoricalData } from "../models";

export function useDateRange(initialMonths = 12, allData: HistoricalData[]) {
  const [range, setRange] = useState<[Date, Date]>([
    subMonths(new Date(), initialMonths),
    new Date(),
  ]);

  const setPreset = useCallback(
    (preset: "3m" | "6m" | "1y" | "all") => {
      const now = new Date();
      if (preset === "3m") setRange([subMonths(now, 3), now]);
      else if (preset === "6m") setRange([subMonths(now, 6), now]);
      else if (preset === "1y") setRange([subMonths(now, 12), now]);
      else {
        const first = startOfMonth(
          new Date(allData[0].month.replace("'", " 20"))
        );
        setRange([first, now]);
      }
    },
    [allData]
  );

  const filtered = allData.filter((item) => {
    const [from, to] = range;
    const itemDate = startOfMonth(new Date(item.month.replace("'", " 20")));
    return itemDate >= from && itemDate <= to;
  });

  return { range, setRange, setPreset, filtered };
}

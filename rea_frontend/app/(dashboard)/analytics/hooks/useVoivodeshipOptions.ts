"use client";
import { useEffect, useState } from "react";
import { OtodomListingsService } from "@/services/api/Otodom";

export type SelectOption = { value: string; label: string };

export function useVoivodeshipOptions(initial = "Cała Polska") {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selected, setSelected] = useState<string>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const list = await OtodomListingsService.getAllVoivodeships(controller.signal);
        const opts =
          (list ?? []).map(v => ({ value: v.name, label: v.name })) 
            .sort((a, b) => a.label.localeCompare(b.label));

        if (!opts.find(o => o.value === "Cała Polska")) {
          opts.unshift({ value: "Cała Polska", label: "Cała Polska" });
        }

        setOptions(opts);
        if (!opts.find(o => o.value === selected) && opts.length) {
          setSelected(opts[0].value);
        }
      } catch (e: any) {
        if (e?.name !== "CanceledError" && e?.message !== "canceled") {
          setError(e?.message ?? "Nieznany błąd");
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []); 

  return { options, selected, setSelected, loading, error };
}

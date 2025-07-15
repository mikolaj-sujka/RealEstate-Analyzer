import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FilterConfig, FilterValues } from "@/models";
import { buildFilterSchema } from "@/utils";

type UseFiltersProps = {
  config: FilterConfig[];
  defaultValues?: FilterValues;
  onChange: (values: FilterValues) => void;
}

export const useFilters = ({
  config,
  defaultValues = {},
  onChange,
}: UseFiltersProps) => {
  const schema = buildFilterSchema(config);

  const { control, watch, reset, handleSubmit } = useForm<FilterValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as FilterValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const handleReset = () => {
    reset(defaultValues);
    onChange(defaultValues);
  };

  return {
    control,
    handleSubmit,
    handleReset,
  };
}

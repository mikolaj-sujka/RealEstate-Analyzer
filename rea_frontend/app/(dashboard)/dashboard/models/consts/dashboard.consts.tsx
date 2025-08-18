import { Column } from "@/components/DataTable/models";

export const tableColumns: Column[] = [
  {
    key: "property",
    label: "Nieruchomość",
    sortable: true,
  },
  {
    key: "location",
    label: "Lokalizacja",
    sortable: true,
  },
  { key: "date", label: "Data", sortable: true },
  { key: "price", label: "Cena", sortable: true },
];

import { style } from "@vanilla-extract/css";

export const card = style({
  padding: "var(--mantine-spacing-md) var(--mantine-spacing-lg)",
});

export const group = style({
  marginBottom: "var(--mantine-spacing-md)",
  display: "flex",
  gap: "var(--mantine-spacing-sm)",
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

export const grid = style({
  marginTop: "var(--mantine-spacing-xs)",
  marginBottom: "var(--mantine-spacing-sm)",
});


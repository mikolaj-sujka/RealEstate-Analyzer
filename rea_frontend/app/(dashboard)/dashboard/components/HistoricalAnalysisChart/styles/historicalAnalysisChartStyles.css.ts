import { rem } from "@mantine/core";
import { style } from "@vanilla-extract/css";

export const card = style({
  padding: "var(--mantine-spacing-md) var(--mantine-spacing-lg)",
  marginBottom: "var(--mantine-spacing-lg)",
});

export const flex = style({
  marginBottom: "var(--mantine-spacing-md)",
  display: "flex",
  gap: rem(2),
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: "wrap",
  flexDirection: "column",
});

export const grid = style({
  marginTop: "var(--mantine-spacing-xs)",
  marginBottom: "var(--mantine-spacing-sm)",
});


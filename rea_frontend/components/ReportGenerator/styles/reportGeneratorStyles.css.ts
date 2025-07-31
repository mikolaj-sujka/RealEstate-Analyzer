import { style } from "@vanilla-extract/css";
import { rem } from "@mantine/core";

export const reportGeneratorGroup = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: rem(16),
    justifyItems: "center",
    gap: rem(8),
    alignContent: "center"
});
import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const headerTop = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: rem(16),
});

export const headerControls = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: rem(16),
  gap: rem(24),
});

export const segmentedControl = style({
  top: rem(13),
});

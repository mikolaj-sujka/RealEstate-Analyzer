import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const headerTop = style({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: rem(2),
  gap: rem(16),
  alignItems: 'center',
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

import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const relativeBox = style({
  position: 'relative',
  minHeight: rem(400),
});

export const chartWrapper = style({
  transition: 'opacity 300ms ease',
});

export const controlGrid = style({
  marginTop: rem(32),
});

export const paperCard = style({
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  padding: rem(24),
  borderRadius: rem(8),
  border: '1px solid #eaeaea',
});

export const fullHeight = style({
  height: '100%',
});

export const mb = style({
  marginBottom: rem(16),
});

export const reportWrapper = style({
  marginTop: rem(32),
});

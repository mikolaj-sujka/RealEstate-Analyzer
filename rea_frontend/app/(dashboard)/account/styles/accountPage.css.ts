import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

export const container = style({
  paddingTop: rem(32), 
  paddingBottom: rem(32),
  width: '100%',
  maxWidth: rem(1280), 
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: rem(32), 
});

export const grid = style({
  width: '100%',
  display: 'grid',
});
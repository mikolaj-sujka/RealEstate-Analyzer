import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
});

export const controlGrid = style({
    alignItems: 'flex-end',
});

export const chartBox = style({
    height: rem(300),
    marginTop: rem(32),
    marginBottom: rem(32),
});

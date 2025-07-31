import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const card = style({
    padding: rem(16),
    backgroundColor: '#fff',
    marginBottom: rem(32),
    borderRadius: rem(8),
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: `1px solid rgba(0, 0, 0, 0.1)`,
    display: 'flex',
});

export const group = style({
    marginBottom: rem(16),
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    gap: rem(4)
});

export const grid = style({
    marginBottom: rem(16),
    gap: rem(16)
});
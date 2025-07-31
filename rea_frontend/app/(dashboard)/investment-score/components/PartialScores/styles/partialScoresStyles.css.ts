import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: rem(16),
});

export const card = style({
    border: '1px solid var(--mantine-color-gray-2)',
    borderRadius: rem(8),
    padding: rem(16),
    display: 'flex',
    flexDirection: 'column',
    gap: rem(8),
});

export const headerGroup = style({
    display: 'flex',
    alignItems: 'center',
    gap: rem(8),
});

export const label = style({
    fontSize: rem(14),
    color: 'var(--mantine-color-gray-6)',
});

export const score = style({
    fontWeight: 700,
    fontSize: rem(20), 
    marginTop: rem(4), 
});

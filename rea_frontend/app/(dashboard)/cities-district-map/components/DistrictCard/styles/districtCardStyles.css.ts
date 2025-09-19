import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

export const card = style({
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: rem(16),
    borderRadius: rem(8),
    border: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
});

export const header = style({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: rem(8),
});

export const headerGroup = style({
    display: 'flex',
    alignItems: 'center',
});

export const iconText = style({
    fontWeight: 500,
});

export const price = style({
    fontSize: rem(20),
    fontWeight: 700,
    marginBottom: rem(8),
});

export const properties = style({
    fontSize: rem(14),
    color: 'var(--mantine-color-gray-500)',
    marginBottom: rem(8),
});

export const changeUp = style({
    fontSize: rem(14),
    color: 'var(--mantine-color-green-6)',
});

export const changeDown = style({
    fontSize: rem(14),
    color: 'var(--mantine-color-red-6)',
});

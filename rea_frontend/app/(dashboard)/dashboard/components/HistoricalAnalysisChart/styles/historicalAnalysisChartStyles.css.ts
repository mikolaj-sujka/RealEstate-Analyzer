import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const card = style({
    padding: rem(16),
    backgroundColor: 'var(--mantine-color-paper)',
    marginBottom: rem(32),
    borderRadius: rem(8),
    boxShadow: 'var(--mantine-shadow-sm)',
    border: '1px solid var(--mantine-color-border)',
    display: 'flex',
    color: 'var(--mantine-color-text)',
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
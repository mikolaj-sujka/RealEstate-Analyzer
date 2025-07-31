import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

export const analyticsContainer = style({
    padding: rem(32),
});

export const analyticsHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const headerCol = style({
    display: 'flex',
    flexDirection: 'column',
});

export const analyticsSelect = style({
    minWidth: rem(200),
});

export const analyticsGrid = style({
    display: 'grid',
    gap: rem(16),
    margin: `${rem(32)} 0`,
});

export const analyticsPaper = style({
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: rem(24),
    borderRadius: rem(8),
    border: `1px solid ${rem(234)}`,
});

export const analyticsPaperTitle = style({
    fontSize: rem(20),
    marginBottom: rem(16),
});

export const analyticsChartWrapper = style({
    // opcjonalne dodatkowe style wrappera wykresu
});

export const reportGeneratorWrapper = style({
    marginTop: rem(32),
});

import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: rem(32),
    gap: rem(24),
    color: '#fff'
});

export const fadeInUp = style({
    animationName: 'fadeInUp',
    animationDuration: '0.8s',
    animationFillMode: 'both',
});

export const fadeInDelay1 = style({
    animationDelay: '0.2s',
});

export const fadeInDelay3 = style({
    animationDelay: '0.6s',
});

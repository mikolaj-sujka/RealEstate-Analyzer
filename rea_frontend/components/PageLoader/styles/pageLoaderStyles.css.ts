import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

// Animations
export const ping = keyframes({
    '75%, 100%': {
        transform: 'scale(2)',
        opacity: '0',
    },
});

export const pulse = keyframes({
    '50%': { opacity: '0.5' },
});

export const bounce = keyframes({
    '0%, 100%': {
        transform: 'translateY(-25%)',
        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
        transform: 'none',
        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
});

// Base styles
export const root = style({
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #faf5ff 100%)',
});

export const center = style({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const wrapper = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: rem(32),
});

export const logoContainer = style({ position: 'relative' });

export const pingEffect = style({
    position: 'absolute',
    inset: rem(-16),
    borderRadius: '50%',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    animation: `${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
});

export const logo = style({
    animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const content = style({
    width: rem(320),
    display: 'flex',
    flexDirection: 'column',
    gap: rem(16),
});

export const progressBar = style({});

// Override nested Mantine Progress bar using globalStyle
globalStyle(`${progressBar} .mantine-Progress-bar`, {
    background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
});

export const textContainer = style({
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: rem(8),
});

export const title = style({ fontSize: rem(18), fontWeight: 600, color: '#1A1B1E' });

export const loadingText = style({
    fontSize: rem(14),
    color: '#6E6E70',
    animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const percentageText = style({ fontSize: rem(12), color: '#6E6E70' });

export const dotsContainer = style({ display: 'flex', gap: rem(4) });

export const dot = style({
    width: rem(8),
    height: rem(8),
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    animation: `${bounce} 1s infinite`,
    selectors: {
        '&:nth-child(1)': { animationDelay: '0s' },
        '&:nth-child(2)': { animationDelay: '0.2s' },
        '&:nth-child(3)': { animationDelay: '0.4s' },
    },
});
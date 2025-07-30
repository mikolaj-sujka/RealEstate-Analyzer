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

export const imageLanding = style({
    display: 'block',
    margin: '0 auto',
});

export const titleLanding = style({
    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)',
});

export const titleTextGradient = style({
    background: 'linear-gradient(45deg, #339af0, #4dabf7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    fontSize: rem(32),
    lineHeight: rem(40),
});

export const landingButton = style({
    backgroundImage: 'linear-gradient(90deg, #339af0 0%, #4dabf7 100%)',
    filter: 'brightness(1)',
    transition: 'filter 800ms ease-in-out, box-shadow 800ms ease-in-out',
    selectors: {
        '&:hover': {
            filter: 'brightness(0.8)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
    },
});
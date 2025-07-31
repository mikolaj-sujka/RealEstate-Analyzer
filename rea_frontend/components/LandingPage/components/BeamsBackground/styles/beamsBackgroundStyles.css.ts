import { style } from '@vanilla-extract/css';

export const wrapper = style({
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000', // praktycznie czarne tło
});

export const canvas = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
});

export const overlay = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent', // jeżeli chcesz całkowicie czarne tło
});

export const content = style({
    position: 'absolute',
    inset: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
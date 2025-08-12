import { style, globalStyle } from '@vanilla-extract/css';

export const noHover = style({
    boxShadow: 'none',
    transform: 'none',
    transition: 'none',
    selectors: {
        '&:hover,&:focus,&:active': {
            boxShadow: 'none',
            transform: 'none',
        },
    },
});

globalStyle(`${noHover}:hover`, {
    boxShadow: 'none',
    transform: 'none',
});

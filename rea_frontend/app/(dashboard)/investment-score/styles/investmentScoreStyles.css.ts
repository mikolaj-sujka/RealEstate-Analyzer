import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const weightsWrapper = style({
    marginTop: rem(24), 
});

export const calculateGroup = style({
    display: 'flex',
    justifyContent: 'center',
    marginTop: rem(32),
});

export const resultContainer = style({
    marginTop: rem(32), 
    position: 'relative',
    minHeight: rem(350), 
});

export const partialTitle = style({
    marginTop: rem(16), 
    marginBottom: rem(16), 
});


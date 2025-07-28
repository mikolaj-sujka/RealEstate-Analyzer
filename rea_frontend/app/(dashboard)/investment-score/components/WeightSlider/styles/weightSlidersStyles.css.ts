import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const container = style({
    margin: '1.5rem auto 0', 
    maxWidth: '800px',
});

export const title = style({
    fontSize: rem(18), 
    marginBottom: rem(16), 
});

export const description = style({
    fontSize: rem(12),           
    color: 'var(--mantine-color-gray-6)', 
    marginBottom: rem(8),        
});

export const column = style({
    marginBottom: rem(24), 
});

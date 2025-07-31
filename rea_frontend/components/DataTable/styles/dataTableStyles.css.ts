import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const wrapper = style({
    width: '100%',
    overflow: 'hidden',
    borderRadius: rem(8),
    border: '1px solid rgba(0,0,0,0.08)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
});

export const table = style({
    width: '100%',
    borderCollapse: 'separate',
    fontSize: rem(14),
});

export const theadTh = style({
    position: 'sticky',
    top: 0,
    background: '#fff',
    zIndex: 2,
    borderBottom: '2px solid rgba(0,0,0,0.1)',
    padding: `${rem(8)} ${rem(12)}`,
    textAlign: 'center',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
});

export const thPlain = style({
    padding: `${rem(8)} ${rem(12)}`,
    textAlign: 'center',
});

export const tbodyTr = style({
    selectors: {
        '&:hover': {
            backgroundColor: '#f5f9ff',
        },
    },
});

export const evenRow = style({
    backgroundColor: '#fafbfc',
});

export const td = style({
    padding: `${rem(10)} ${rem(14)}`,
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
});

export const statusBadge = style({
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: rem(11),
    borderRadius: rem(999),
    padding: `${rem(4)} ${rem(10)}`,
    display: 'inline-block',
});

export const actionsCell = style({
    minWidth: rem(80),
});

export const headerButton = style({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: rem(4),
    background: 'none',
    border: 'none',
    padding: 0,
    alignItems: 'center',
});

export const paginationWrapper = style({
    marginTop: rem(16),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: rem(12),
});

export const paginationButton = style({
    padding: `${rem(6)} ${rem(12)}`,
    fontSize: rem(14),
    cursor: 'pointer',
    borderRadius: rem(4),
    backgroundColor: '#f0f0f0',
    border: '1px solid rgba(0,0,0,0.1)',
    color: '#333',
    transition: 'background-color 0.2s, color 0.2s',
    ':hover': {
        backgroundColor: '#e0e0e0',
        color: '#000',
    },
    selectors: {
        '&:disabled': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
});

export const dataTablePaper = style({
    padding: rem(16),
    borderRadius: rem(8),
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginTop: rem(16),
    border: '1px solid rgba(0,0,0,0.08)'
});

export const dataTableGroup = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rem(16),
});
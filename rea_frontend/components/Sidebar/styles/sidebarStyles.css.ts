import { style } from '@vanilla-extract/css';
import { rem } from "@mantine/core";

export const sidebarContainer = style({
  width: rem(280),
  padding: rem(16), // p="md"
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: 'var(--mantine-color-default)',
  borderRight: '1px solid var(--mantine-color-border)',
});

export const logoGroup = style({
  height: rem(60), // h={60}
  paddingLeft: rem(16),
  paddingRight: rem(16), // px="md"
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid var(--mantine-color-border)',
});

export const navStack = style({
  flex: 1,
  overflowY: 'auto',
  marginTop: '1rem', // mt="md"
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: rem(8), // p="xs"
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(4), // gap="xs"
  marginBottom: rem(8), // mb="md"
});

export const sectionTitle = style({
  fontSize: rem(12), // size="xs"
  color: 'var(--mantine-color-gray-6)',
  fontWeight: 700,        // fw={700}
  textTransform: 'uppercase', // tt="uppercase"
  paddingLeft: rem(8),
  paddingRight: rem(8),  // px="xs"
});

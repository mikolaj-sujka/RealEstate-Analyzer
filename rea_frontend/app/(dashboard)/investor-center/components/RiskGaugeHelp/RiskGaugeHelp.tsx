"use client";

import {
  Box,
  HoverCard,
  ActionIcon,
  Text,
  Stack,
  List,
  ThemeIcon,
} from "@mantine/core";
import { IconInfoCircle, IconCircleCheck } from "@tabler/icons-react";

export type RiskGaugeHelpProps = {
  absolute?: boolean;
  position?: { top?: number; right?: number; bottom?: number; left?: number };
  width?: number;
  zIndex?: number;
  title?: string;
  bullets?: React.ReactNode[];
  footer?: React.ReactNode;
  ariaLabel?: string;
};

const defaultBullets: React.ReactNode[] = [
  <>
    Wskaźnik przedstawia <b>ryzyko rynkowe</b> w skali <b>0–100</b>, gdzie{" "}
    <b>niżej = bezpieczniej</b>.
  </>,
  <>
    Miernik jest <b>znormalizowany</b> — składniki są przeskalowane do wspólnego
    zakresu i złożone w jeden wynik.
  </>,
  <>
    W praktyce im wyższa zmienność oraz mniej sprzyjające trendy/płynność, tym{" "}
    <b>wyższy</b> odczyt.
  </>,
  <>
    Odczyt to wartość chwilowa (snapshot) — interpretuj łącznie z trendem w
    czasie.
  </>,
];

export const RiskGaugeHelp = ({
  absolute = true,
  position = { top: 8, right: 8 },
  width = 420,
  zIndex = 1001,
  title = "Risk Gauge — jak czytać?",
  bullets,
  footer,
  ariaLabel = "Wyjaśnienie wskaźnika ryzyka",
}: RiskGaugeHelpProps) => {
  const posStyle = absolute
    ? { position: "absolute" as const, zIndex, ...position }
    : undefined;
  const items = bullets ?? defaultBullets;

  return (
    <Box style={posStyle} aria-label={ariaLabel}>
      <HoverCard
        width={width}
        shadow="md"
        withArrow
        openDelay={150}
        closeDelay={100}
      >
        <HoverCard.Target>
          <ActionIcon variant="light" aria-label="Jak to liczymy?">
            <IconInfoCircle size={18} />
          </ActionIcon>
        </HoverCard.Target>

        <HoverCard.Dropdown>
          <Stack gap="xs">
            <Text fw={600}>{title}</Text>
            <List
              spacing="xs"
              icon={
                <ThemeIcon size={18} radius="xl" variant="light">
                  <IconCircleCheck size={14} />
                </ThemeIcon>
              }
            >
              {items.map((it, idx) => (
                <List.Item key={idx}>{it}</List.Item>
              ))}
            </List>
            {footer ? <Box>{footer}</Box> : null}
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </Box>
  );
}

export default RiskGaugeHelp;

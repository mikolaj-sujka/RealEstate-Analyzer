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
import React from "react";

export type HistoricalChartHelpProps = {
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
    Dane pochodzą z <b>GUS/BDL</b> i obejmują lata <b>2010–2025</b> (w miarę
    dostępności dla poszczególnych wskaźników).
  </>,
  <>
    Na przełomie <b>2024–2025</b> występują częstsze <b>braki/poślizgi</b> w
    publikacji — część serii jest uzupełniana stopniowo po publikacji przez GUS
    (nie wszystkie miesiące/kwartały są dostępne od razu).
  </>,
  <>
    Niektóre wskaźniki są <b>roczne lub kwartalne</b>, więc na wykresie mogą
    pojawiać się luki w danych miesięcznych.
  </>,
  <>
    GUS stosuje <b>rewizje</b> — opublikowane wartości mogą być korygowane
    wstecznie. Interpretuj trend z uwzględnieniem możliwych aktualizacji.
  </>,
  <>
    Odczyty są prezentowane tak, jak zostały opublikowane przez źródło; różnice
    metodologiczne między latami mogą wpływać na porównywalność.
  </>,
];

export const HistoricalChartHelp = ({
  absolute = true,
  position = { top: 19, left: 230 },
  width = 420,
  zIndex = 1001,
  title = "Dane historyczne — co warto wiedzieć?",
  bullets,
  footer,
  ariaLabel = "Wyjaśnienie danych historycznych",
}: HistoricalChartHelpProps) => {
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
          <ActionIcon variant="light" aria-label="Skąd pochodzą dane?">
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
};


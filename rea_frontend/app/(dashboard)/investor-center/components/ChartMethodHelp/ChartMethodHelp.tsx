"use client";

import { Box, HoverCard, ActionIcon, Text, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type Method = "basic" | "advanced";

type ChartMethodHelpProps = {
  analysisType: Method; // "basic" (Deal Finder) | "advanced" (Premia za nowość)
  absolute?: boolean; // renderować absolutnie w rogu? domyślnie true
  position?: { top?: number; right?: number; bottom?: number; left?: number }; // odsunięcia
  width?: number; // szerokość dropdownu
  zIndex?: number;
  ariaLabel?: string;
};

function DealFinderHelp() {
  return (
    <Stack gap="xs">
      <Text fw={600}>Deal Finder — jak liczymy?</Text>
      <Text size="sm">• Oś X: średnia cena za m² (dzielnica).</Text>
      <Text size="sm">• Oś Y: średni metraż (dzielnica).</Text>
      <Text size="sm">
        • Wielkość kropki: skala zależna od √(liczby ofert), by nie było
        skrajności.
      </Text>
      <Text size="sm">
        • Kolor: <b>deal score = 1 − ryzyko[district]</b> (0–1; im bliżej 1, tym
        lepiej).
      </Text>
      <Text size="sm">
        • Cieniowana strefa: obszar preferowany wg progu ceny/metrażu.
      </Text>
    </Stack>
  );
}

function NewnessHelp() {
  return (
    <Stack gap="xs">
      <Text fw={600}>Premia za nowość — jak liczymy?</Text>
      <Text size="sm">
        • Dopasowujemy linię: <b>cena = m · rok + b</b>.
      </Text>
      <Text size="sm">
        • <b>Residuum</b> = cena rzeczywista − cena przewidywana.
      </Text>
      <Text size="sm">
        • <b>Residuum &lt; 0</b> → taniej niż oczekiwane (lepiej); <b>&gt; 0</b>{" "}
        → drożej (gorzej).
      </Text>
      <Text size="sm">
        • Linie ±RMSE pokazują typowe odchylenie od regresji.
      </Text>
      <Text size="sm">
        • Kolor kropki = wartość residuum (niższe → lepiej).
      </Text>
    </Stack>
  );
}

export const ChartMethodHelp =({
  analysisType,
  absolute = true,
  position = { top: 0, right: 0 },
  width = 420,
  zIndex = 1001,
  ariaLabel = "Wyjaśnienie metody",
}: ChartMethodHelpProps) => {
  const posStyle = absolute
    ? { position: "absolute" as const, zIndex, ...position }
    : undefined;

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
          {analysisType === "basic" ? <DealFinderHelp /> : <NewnessHelp />}
        </HoverCard.Dropdown>
      </HoverCard>
    </Box>
  );
}

export default ChartMethodHelp;

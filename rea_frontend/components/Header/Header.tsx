"use client";

import { usePathname } from "next/navigation";
import {
  Menu,
  ActionIcon,
  Group,
  Breadcrumbs,
  Anchor,
  Text,
} from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import {
  IconBell,
  IconSun,
  IconMoon,
  IconChevronRight,
  IconSettings,
  IconHelp,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";

const breadcrumbNameMap: { [key: string]: { section: string; page: string } } =
  {
    "/dashboard": { section: "Przegląd", page: "Pulpit" },
    "/map": { section: "Przegląd", page: "Mapa Nieruchomości" },
    "/analytics": { section: "Analiza", page: "Analityka Rynku" },
    "/investor-center": { section: "Analiza", page: "Centrum Inwestora" },
    "/cities": { section: "Analiza", page: "Porównanie Miast" },
    "/investment-score": {
      section: "Kalkulatory",
      page: "Kalkulator Potencjału Inwestycyjnego",
    },
    "/investment-calculator": {
      section: "Kalkulatory",
      page: "Kalkulator Rentowności Inwestycji",
    },
    "/help": { section: "Pomoc", page: "Centrum Pomocy" },
  };

export const Header = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const pathname = usePathname();
  const breadcrumbInfo = breadcrumbNameMap[pathname] || {
    section: "Przegląd",
    page: "Pulpit",
  };

  const items = [
    <Anchor href="/dashboard" key="section" c="dimmed">
      {breadcrumbInfo.section}
    </Anchor>,
    <Text key="page" fw={500}>
      {breadcrumbInfo.page}
    </Text>,
  ];

  return (
    <Group
      justify="space-between"
      h="100%"
      px="md"
      style={{
        backgroundColor: "var(--mantine-color-paper)",
        borderBottom: "1px solid var(--mantine-color-border)",
      }}
    >
      <Breadcrumbs separator={<IconChevronRight size={14} />}>
        {items}
      </Breadcrumbs>
      <Group>
        <ActionIcon
          variant="default"
          size="lg"
          radius="xl"
          onClick={() =>
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
        >
          {colorScheme === "dark" ? (
            <IconSun size={18} />
          ) : (
            <IconMoon size={18} />
          )}
        </ActionIcon>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="default" size="lg" radius="xl">
              <IconHelp size={18} />
            </ActionIcon>
          </Menu.Target>
        </Menu>
      </Group>
    </Group>
  );
};

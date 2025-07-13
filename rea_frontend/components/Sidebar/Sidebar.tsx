"use client";
import { NavLink, Stack, Group, Text, Box } from "@mantine/core";
import {
  IconSettings,
  IconHelp,
  IconDashboard,
  IconChartBar,
  IconTrendingUp,
  IconMap,
  IconBuildingStore,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navSections = [
  {
    title: "Przegląd",
    items: [
      { href: "/dashboard", label: "Pulpit", icon: IconDashboard },
      { href: "/analytics", label: "Analityka", icon: IconChartBar },
    ],
  },
  {
    title: "Analiza",
    items: [
      { href: "/trends", label: "Porównanie Trendów", icon: IconTrendingUp },
      { href: "/map", label: "Mapa Nieruchomości", icon: IconMap },
      { href: "/cities", label: "Porównanie Miast", icon: IconBuildingStore },
    ],
  },
];

const bottomNav = [
  { href: "/account", label: "Konto", icon: IconSettings },
  { href: "/help", label: "Pomoc", icon: IconHelp },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      w={280}
      p="md"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "var(--mantine-color-default)",
        borderRight: "1px solid var(--mantine-color-border)",
      }}
    >
      <Group
        h={60}
        px="md"
        style={{ borderBottom: "1px solid var(--mantine-color-border)" }}
      >
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
        </Link>
      </Group>
      <Stack
        justify="space-between"
        style={{ flex: 1, overflowY: "auto" }}
        mt="md"
      >
        <Box>
          {navSections.map((section) => (
            <Stack key={section.title} gap="xs" mb="lg">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase" px="md">
                {section.title}
              </Text>
              {section.items.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  leftSection={<item.icon size={18} />}
                  active={pathname === item.href}
                  component={Link}
                  variant="subtle"
                />
              ))}
            </Stack>
          ))}
        </Box>
        <Box>
          {bottomNav.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              leftSection={<item.icon size={18} />}
              active={pathname === item.href}
              component={Link}
              variant="subtle"
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

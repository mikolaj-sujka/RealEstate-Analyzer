"use client";

import { NavLink, Stack, Group, Text, Box } from "@mantine/core";
import { IconSettings, IconHelp } from "@tabler/icons-react";
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  PieChart,
  BarChartHorizontal,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navSections = [
  {
    title: "Przegląd",
    items: [
      { href: "/", label: "Pulpit", icon: LayoutDashboard },
      { href: "/analytics", label: "Analityka", icon: BarChart3 },
    ],
  },
  {
    title: "Analityka",
    items: [
      { href: "/trends", label: "Porównanie Trendów", icon: TrendingUp },
      { href: "/map", label: "Mapa Nieruchomości", icon: MapPin },
      { href: "/cities", label: "Porównanie Miast", icon: BarChartHorizontal },
    ],
  },
];

const bottomNav = [
  { href: "/settings", label: "Ustawienia", icon: IconSettings },
  { href: "/help", label: "Pomoc", icon: IconHelp },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      w={240}
      h="100vh"
      style={{
        backgroundColor: "var(--mantine-color-gray-0)",
        borderRight: "1px solid var(--mantine-color-gray-2)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        h={60}
        px="md"
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
        }}
      >
        <Group gap="sm">
          <Box
            w={32}
            h={32}
            style={{
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Image
              src="images/logo.png"
              alt="RealEstate Analyzer Logo"
              width={64}
              height={64}
              style={{ borderRadius: "2px" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <Text
              c="white"
              fw={700}
              size="sm"
              style={{
                position: "absolute",
                display: "none", // Will be shown if image fails
              }}
            >
              K
            </Text>
          </Box>
          <Text fw={500} size="md" c="dark">
            Real Estate Analyzer
          </Text>
        </Group>
      </Box>

      <Box style={{ flex: 1, overflowY: "auto" }} p="md">
        <Stack gap="xl">
          {navSections.map((section) => (
            <Box key={section.title}>
              <Text
                size="xs"
                c="dimmed"
                fw={600}
                tt="uppercase"
                mb="sm"
                pl="xs"
              >
                {section.title}
              </Text>
              <Stack gap={2}>
                {section.items.map((item) => (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    leftSection={<item.icon size={16} />}
                    active={pathname === item.href}
                    component={Link}
                    style={{
                      borderRadius: "6px",
                      fontWeight: pathname === item.href ? 500 : 400,
                    }}
                    styles={{
                      root: {
                        "&[dataActive]": {
                          backgroundColor: "var(--mantine-color-gray-1)",
                          color: "var(--mantine-color-dark-7)",
                        },
                        "&:hover": {
                          backgroundColor: "var(--mantine-color-gray-1)",
                        },
                      },
                      label: {
                        fontSize: "14px",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        p="md"
        style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
      >
        <Stack gap={2}>
          {bottomNav.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              leftSection={<item.icon size={16} />}
              active={pathname === item.href}
              component={Link}
              style={{
                borderRadius: "6px",
                fontWeight: pathname === item.href ? 500 : 400,
              }}
              styles={{
                root: {
                  "&[dataActive]": {
                    backgroundColor: "var(--mantine-color-gray-1)",
                    color: "var(--mantine-color-dark-7)",
                  },
                  "&:hover": {
                    backgroundColor: "var(--mantine-color-gray-1)",
                  },
                },
                label: {
                  fontSize: "14px",
                },
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

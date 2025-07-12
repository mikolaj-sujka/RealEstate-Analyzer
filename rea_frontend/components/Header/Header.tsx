"use client";

import { usePathname } from "next/navigation";
import {
  Menu,
  ActionIcon,
  Group,
  Breadcrumbs,
  Anchor,
  Text,
  Box,
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
    "/": { section: "Overview", page: "Dashboard" },
    "/analytics": { section: "Overview", page: "Analytics" },
    "/trends": { section: "Overview", page: "Trends" },
    "/distribution": { section: "Overview", page: "Distribution" },
    "/map": { section: "Overview", page: "Map" },
    "/cities": { section: "Overview", page: "Cities" },
    "/account": { section: "Account", page: "Profile" },
  };

export const Header = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const pathname = usePathname();
  const breadcrumbInfo = breadcrumbNameMap[pathname] || {
    section: "Overview",
    page: "dashboard",
  };

  const items = [
    <Anchor
      href="/"
      key="section"
      c="dimmed"
      size="sm"
      style={{ textDecoration: "none" }}
    >
      {breadcrumbInfo.section}
    </Anchor>,
    <Text key="page" size="sm" fw={500}>
      {breadcrumbInfo.page}
    </Text>,
  ];

  return (
    <Box
      h={60}
      px="xl"
      style={{
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        backgroundColor: "var(--mantine-color-white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Breadcrumbs
        separator={
          <IconChevronRight size={12} color="var(--mantine-color-gray-5)" />
        }
        separatorMargin="xs"
      >
        {items}
      </Breadcrumbs>

      <Group gap="sm">
        <ActionIcon variant="subtle" size="lg" radius="md" color="gray">
          <IconBell size={18} />
        </ActionIcon>

        <ActionIcon
          variant="subtle"
          size="lg"
          radius="md"
          color="gray"
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

        <Menu shadow="sm" width={200} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" size="lg" radius="md" color="gray">
              <IconUser size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>My Account</Menu.Label>
            <Menu.Item
              component={Link}
              href="/account"
              leftSection={<IconUser size={14} />}
            >
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings size={14} />}>
              Settings
            </Menu.Item>
            <Menu.Item leftSection={<IconHelp size={14} />}>Support</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
}

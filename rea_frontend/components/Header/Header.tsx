"use client";

import { usePathname, useRouter } from "next/navigation";
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
  IconSun,
  IconMoon,
  IconChevronRight,
  IconHelp,
} from "@tabler/icons-react";
import { headerBreadcrumbNames } from "./models";

export const Header = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const pathname = usePathname();
  const breadcrumbInfo = headerBreadcrumbNames[pathname] || {
    section: "Przegląd",
    page: "Pulpit",
  };

  const router = useRouter();

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
            <ActionIcon
              component="a"
              variant="default"
              size="lg"
              radius="xl"
              aria-label="Help Center"
              onClick={() => router.push("/help-center")}
            >
              <IconHelp size={18} />
            </ActionIcon>
          </Menu.Target>
        </Menu>
      </Group>
    </Group>
  );
};

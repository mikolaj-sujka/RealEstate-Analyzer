"use client";
import { NavLink, Stack, Group, Text, Box } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarSections } from "./models/consts";
import * as classes from "./styles";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box className={classes.sidebarContainer}>
      <Group className={classes.logoGroup}>
        <Link href="/dashboard">
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
        </Link>
      </Group>
      <Stack className={classes.navStack}>
        <Box>
          {sidebarSections.map((section) => (
            <Stack key={section.title} className={classes.section}>
              <Text className={classes.sectionTitle}>{section.title}</Text>
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
      </Stack>
    </Box>
  );
};

"use client";

import React, { useState } from "react";
import { Menu, Button } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function LanguageToggle() {
  const [value, setValue] = useState<"PL" | "EN">("PL");

  return (
    <Menu shadow="md" width={100} withinPortal>
      <Menu.Target>
        <Button
          variant="filled"
          color="dark"
          rightSection={<IconChevronDown />}
          styles={(theme) => ({
            root: {
              color: theme.white,
              backgroundColor: "#040813",
              "&:hover": {
                backgroundColor: "#2a2a38",
              },
            },
          })}
        >
          {value}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => setValue("PL")}>PL</Menu.Item>
        <Menu.Item onClick={() => setValue("EN")}>EN</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default LanguageToggle;

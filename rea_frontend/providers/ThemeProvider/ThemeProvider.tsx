"use client";
import { ReactNode } from "react";
import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "./mantineTheme";
import { ThemeContext, useThemeState } from "./hooks";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps & { children: ReactNode }) {
  const { theme, setTheme } = useThemeState();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NextThemeProvider {...props} forcedTheme={theme} attribute="class">
        <MantineProvider theme={mantineTheme} forceColorScheme={theme}>
          {children}
        </MantineProvider>
      </NextThemeProvider>
    </ThemeContext.Provider>
  );
}

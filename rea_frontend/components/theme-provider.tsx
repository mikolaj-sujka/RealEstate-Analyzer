"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

import { createContext, useContext, useEffect, useState } from "react"
import { MantineProvider, createTheme } from "@mantine/core"

type Theme = "light" | "dark"
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Sprawdź preferencje systemowe
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  const mantineTheme = createTheme({
    fontFamily: "Poppins, sans-serif",
    headings: { fontFamily: "Playfair Display, serif" },
    primaryColor: "yellow",
    colors: {
      dark: [
        "#C1C2C5",
        "#A6A7AB",
        "#909296",
        "#5c5f66",
        "#373A40",
        "#2C2E33",
        "#25262b",
        "#1A1B1E",
        "#141517",
        "#101113",
      ],
    },
  })

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      <NextThemesProvider {...props} theme={theme}>
        <MantineProvider theme={mantineTheme} forceColorScheme={theme}>
          {children}
        </MantineProvider>
      </NextThemesProvider>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

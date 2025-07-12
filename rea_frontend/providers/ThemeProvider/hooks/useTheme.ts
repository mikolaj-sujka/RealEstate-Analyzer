import { createContext, useContext } from "react";

type Theme = "light" | "dark";
interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);

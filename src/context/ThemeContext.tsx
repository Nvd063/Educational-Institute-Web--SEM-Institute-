import React, { createContext, useContext, useState } from "react";

export type Theme = "default" | "blush" | "meadow";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start at default — no persistence, no hydration delay
  const [theme, setThemeState] = useState<Theme>("default");

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;

    // Remove all theme classes
    html.classList.remove("theme-default", "theme-blush", "theme-meadow");

    // Add new theme class if not default
    if (newTheme !== "default") {
      html.classList.add(`theme-${newTheme}`);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const cycleTheme = () => {
    const themes: Theme[] = ["default", "blush", "meadow"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex] ?? "default";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
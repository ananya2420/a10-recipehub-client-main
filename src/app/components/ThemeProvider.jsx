"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext({
  theme: "light",
  resolvedTheme: "light",
  systemTheme: "light",
  themes: ["light", "dark", "system"],
  setTheme: () => {},
});

const STORAGE_KEY = "theme";
const SYSTEM_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia(SYSTEM_QUERY).matches ? "dark" : "light";
}

function getStoredTheme(defaultTheme) {
  if (typeof window === "undefined") return defaultTheme;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored || defaultTheme;
  } catch {
    return defaultTheme;
  }
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  enableColorScheme = true,
}) {
  const [theme, setThemeState] = useState(defaultTheme);
  const [systemTheme, setSystemTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme) {
      setThemeState(storedTheme);
    }

    if (enableSystem) {
      setSystemTheme(getSystemTheme());
    }

    setMounted(true);
  }, [enableSystem]);

  const resolvedTheme = useMemo(() => {
    if (theme === "system" && enableSystem) {
      return mounted ? systemTheme : "light";
    }
    return theme;
  }, [enableSystem, mounted, systemTheme, theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nextTheme = theme === "system" && enableSystem ? systemTheme : theme;
    const html = document.documentElement;

    if (attribute === "class") {
      html.classList.remove("light", "dark");
      html.classList.add(nextTheme);
    } else if (attribute?.startsWith("data-")) {
      html.setAttribute(attribute, nextTheme);
    }

    if (enableColorScheme) {
      html.style.colorScheme = nextTheme;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write errors
    }
  }, [attribute, enableColorScheme, enableSystem, systemTheme, theme]);

  useEffect(() => {
    if (typeof window === "undefined" || !enableSystem) return;

    const mediaQuery = window.matchMedia(SYSTEM_QUERY);
    const handleChange = () => setSystemTheme(getSystemTheme());

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [enableSystem]);

  const setTheme = useCallback((value) => {
    setThemeState((current) =>
      typeof value === "function" ? value(current) : value
    );
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      systemTheme,
      themes: enableSystem ? ["light", "dark", "system"] : ["light", "dark"],
      setTheme,
    }),
    [enableSystem, resolvedTheme, setTheme, systemTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

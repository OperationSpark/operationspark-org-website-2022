import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Theme({ children, theme }: { children: ReactNode; theme: any }) {
  const { themeMode, isSystemMode, setThemeMode } = useThemeMode();
  const isLightMode = themeMode === 'light';
  const [navHeight, setNavHeight] = useState(0);

  return (
    <ThemeProvider
      theme={{
        colorMode: themeMode,
        setColorMode: setThemeMode,
        isLightMode,
        isSystemMode,
        navHeight,
        setNavHeight,
        ...theme,
        ...colors[themeMode],
      }}
    >
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

export const useThemeMode = () => {
  const [themeMode, setTheme] = useState<'dark' | 'light'>('dark');
  const [systemThemeMode, setSystemThemeMode] = useState<'dark' | 'light'>('dark');
  const [isSystemMode, setSystemMode] = useState<boolean>(false);

  // Change current theme
  const setThemeMode = (newTheme: 'light' | 'dark' | 'system') => {
    if (newTheme === 'system') {
      setTheme(systemThemeMode);
      setSystemMode(true);
    } else {
      setTheme(newTheme);
      setSystemMode(false);
    }
    window.localStorage.setItem('theme', newTheme);
  };

  // Handle initial theme
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const currentTheme = savedTheme ? savedTheme : systemThemeMode ? systemThemeMode : 'dark';

    if (currentTheme === 'dark' || currentTheme === 'light' || currentTheme === 'system') {
      window.localStorage.setItem('theme', currentTheme);
      if (currentTheme === 'system') {
        setTheme(systemThemeMode);
        setSystemMode(true);
      } else {
        setTheme(currentTheme);
        setSystemMode(false);
      }
    }
  }, [systemThemeMode]);

  // Handle system theme change
  useEffect(() => {
    const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemThemeMode(e.matches ? 'dark' : 'light');
    };
    systemThemeDark.addEventListener('change', handleSystemThemeChange);
    return () => {
      systemThemeDark.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return { themeMode, isSystemMode, setThemeMode };
};

const colors = {
  dark: {
    bg: 'rgba(30, 34, 38, 1.00)',
    fg: 'rgba(204, 204, 204, 1.00)',
    bgHover: 'rgba(36, 40, 44, 1.00)',

    alpha: {
      bg: 'rgba(30, 34, 38, 0.75)',
      fg: 'rgba(255, 255, 255, 0.75)',
      bg50: 'rgba(30, 34, 38, 0.5)',
      fg50: 'rgba(255, 255, 255, 0.5)',
      bg25: 'rgba(30, 34, 38, 0.25)',
      fg25: 'rgba(255, 255, 255, 0.25)',
      fg10: 'rgba(255, 255, 255, 0.10)',
      red: 'rgba(255, 32, 12, 0.75)',
      red25: 'rgba(255, 32, 12, 0.25)',
      red01: 'rgba(255, 32, 12, 0.1)',
    },
  },
  light: {
    bg: 'rgba(234, 234, 234, 1.00)',
    fg: 'rgba(72, 72, 72, 1.00)',
    bgHover: 'rgba(232, 232, 232, 1.00)',
    alpha: {
      bg: 'rgba(255, 255, 255, 0.75)',
      fg: 'rgba(37, 37, 37, 0.75)',
      bg50: 'rgba(255, 255, 255, 0.5)',
      fg50: 'rgba(37, 37, 37, 0.5)',
      bg25: 'rgba(255, 255, 255, 0.25)',
      fg25: 'rgba(37, 37, 37, 0.25)',
      fg10: 'rgba(37, 37, 37, 0.10)',
      red: 'rgba(255, 32, 12, 0.75)',
      red25: 'rgba(255, 32, 12, 0.25)',
      red01: 'rgba(255, 32, 12, 0.1)',
    },
  },
};

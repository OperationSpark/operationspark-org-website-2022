import { get } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';

const minMax = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const adjustBrightness = (rgb: number[], amount: number, multiplier = 8) => {
  return rgb.map((color) => minMax(color + amount * multiplier, 0, 255));
};

const rgbaToString = (rgba: number[]) => {
  return `rgba(${rgba.join(', ')})`;
};

const hexToRgb = (hex: string, alpha?: number, brightness?: number) => {
  const hexColor = hex.replace('#', '');
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4), 16);
  const a = alpha ?? 1;

  if (brightness) {
    const rgb = adjustBrightness([r, g, b], brightness);
    return [...rgb, a];
  }

  return [r, g, b, a];
};

const hexToRgbString = (hex: string, alpha?: number, brightness?: number) => {
  return rgbaToString(hexToRgb(hex, alpha, brightness));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any type is needed for theme
export default function Theme({ children, theme }: { children: ReactNode; theme: any }) {
  const { themeMode, isSystemMode, setThemeMode } = useThemeMode();
  const isLightMode = themeMode === 'light';
  const [navHeight, setNavHeight] = useState(0);

  const themeColors = {
    ...theme,
    ...(themeMode ? colors[themeMode] : {}),
  };

  const getThemeColor = (color: string): string | undefined => {
    if (!color) {
      return;
    }

    const [colorName] = color.split('.');
    const themeColor = get(themeColors, color) || get(themeColors, colorName);

    if (typeof themeColor === 'string') {
      return themeColor;
    }
    if (typeof themeColor === 'object' && '0' in themeColor) {
      return themeColor[0];
    }
  };

  return !themeMode ? null : (
    <ThemeProvider
      theme={{
        ...themeColors,
        colorMode: themeMode,
        setColorMode: setThemeMode,
        rgb: (color, alpha = 1, brightness?: number) => {
          const themeColor = getThemeColor(color);
          if (!themeColor) {
            console.error(`Color ${color} not found in theme`);
            return 'rgba(255, 50, 50, 1)';
          }
          return hexToRgbString(themeColor, alpha, brightness);
        },

        asRgb: (color, brightness) => {
          const themeColor = getThemeColor(color);
          if (!themeColor) {
            console.error(`Color ${color} not found in theme`);
            return '255, 50, 50';
          }
          const [r, g, b] = hexToRgb(themeColor, 1, brightness);
          return `${r}, ${g}, ${b}`;
        },
        isLightMode,
        isSystemMode,
        navHeight,
        setNavHeight,
      }}
    >
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

export const useThemeMode = () => {
  const [themeMode, setTheme] = useState<'dark' | 'light'>();
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
    bg: '#1e2226',
    fg: '#cccccc',
    bgHover: '#24282c',

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
    bg: '#eaeaea',
    fg: '#484848',
    bgHover: '#e8e8e8',
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

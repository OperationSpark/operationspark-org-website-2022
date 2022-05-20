import { ReactNode, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useColorMode } from '@chakra-ui/react';
import GlobalStyles from './GlobalStyles';
import ColorTools from 'color-tools';

import customThemes from './themes';

const colors = {
  dark: {
    bg: 'rgba(26, 32, 44, 1.00)',
    fg: 'rgba(255, 255, 255, 1.00)',
    alpha: {
      bg: 'rgba(26, 32, 44, 0.75)',
      fg: 'rgba(255, 255, 255, 0.75)',
    },
  },
  light: {
    bg: 'rgba(255, 255, 255, 1.00)',
    fg: 'rgba(0, 0, 0, 1.00)',
    alpha: {
      bg: 'rgba(255, 255, 255, 0.75)',
      fg: 'rgba(0, 0, 0, 0.75)',
    },
  },
};

type InitialTheme = Omit<
  DefaultTheme,
  'colorMode' | 'isLightMode' | 'navHeight' | 'setNavHeight' | 'fx'
>;
const Theme = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: InitialTheme;
}) => {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';
  const [navHeight, setNavHeight] = useState(0);
  const fx = ColorTools({
    mode: colorMode,
    themes: {
      light: customThemes.light,
      dark: customThemes.dark,
    },
  });
  return (
    <ThemeProvider
      theme={{
        colorMode,
        isLightMode,
        navHeight,
        setNavHeight,
        fx,
        ...theme,
        ...colors[colorMode],
      }}
    >
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

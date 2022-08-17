import { ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useColorMode } from '@chakra-ui/react';
import GlobalStyles from './GlobalStyles';

const colors = {
  dark: {
    bg: 'rgba(26, 32, 44, 1.00)',
    fg: 'rgba(255, 255, 255, 1.00)',
    bgHover: 'rgba(37, 43, 55, 1.00)',

    alpha: {
      bg: 'rgba(26, 32, 44, 0.75)',
      fg: 'rgba(255, 255, 255, 0.75)',
      bg50: 'rgba(26, 32, 44, 0.5)',
      fg50: 'rgba(255, 255, 255, 0.5)',
    },
  },
  light: {
    bg: 'rgba(255, 255, 255, 1.00)',
    fg: 'rgba(37, 37, 37, 1.00)',
    bgHover: 'rgba(232, 232, 232, 1.00)',
    alpha: {
      bg: 'rgba(255, 255, 255, 0.75)',
      fg: 'rgba(37, 37, 37, 0.75)',
      bg50: 'rgba(255, 255, 255, 0.5)',
      fg50: 'rgba(37, 37, 37, 0.5)',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Theme = ({ children, theme }: { children: ReactNode; theme: any }) => {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === 'light';
  const [navHeight, setNavHeight] = useState(0);

  return (
    <ThemeProvider
      theme={{
        colorMode,
        isLightMode,
        navHeight,
        setNavHeight,
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

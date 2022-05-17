import { useColorMode } from '@chakra-ui/react';

import Toggle from '@this/components/Elements/Toggle';

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDarkMode = colorMode === 'dark';
  const sliderImg = isDarkMode
    ? '/images/icons/moon.svg'
    : '/images/icons/sun.svg';

  const titleText = `Toggle ${isDarkMode ? 'light' : 'dark'} theme`;
  return (
    <Toggle
      onClick={() => toggleColorMode()}
      value={colorMode === 'dark'}
      sliderImg={sliderImg}
      label={titleText}
      title={titleText}
    />
  );
};

export default ThemeButton;

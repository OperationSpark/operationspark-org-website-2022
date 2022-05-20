import dark from './dark';
import light from './light';
import common from './common';
import { Colors, ThemeOptions } from 'color-tools/src/cTools';

const lightMode: Colors = { ...common, ...light };
const darkMode: Colors = { ...common, ...dark };

const colors: ThemeOptions = {
  light: lightMode,
  dark: darkMode,
};

export default colors;

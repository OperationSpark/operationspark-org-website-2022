/**
 * Color can be any of the following formats
 *
 * - `[Red, Green, Blue, Alpha]`
 * - `rgb(0, 0, 0)`
 * - `rgba(0, 0, 0, 1)`
 * - `#000000` | `000000`
 */
export type Color = TColorRGBA | string;
export type TColorRGBA = [number, number, number, number];
export type ColorNames = Record<keyof Colors, string>;
export type ColorName = keyof ColorNames;
export type ColorModify = (c: ColorName, n: number) => string;

export interface Colors {
  [key: string]: Color;
  primary: Color;
  secondary: Color;
  bg: Color;
  fg: Color;
  shadow: Color;
  green: Color;
  red: Color;
  danger: Color;
  warn: Color;
  info: Color;
}

export interface ColorAdjustOptions {
  darker?: number;
  lighter?: number;
  alpha?: number;
  dynamic?: boolean;
}

export type ColorAdjust = (c: ColorName, options: ColorAdjustOptions) => Color;

export interface IColorTools {
  mode: string;
  colors: Partial<Colors>;
  toggle?: () => void;
  setTheme?: (mode: string) => void;
  get: (color: ColorName) => Color;
  darker: ColorModify;
  lighter: ColorModify;
  alpha: ColorModify;
  adjust: ColorAdjust;
}

export type ThemeOption = Partial<Colors>;

export type ThemeOptions = {
  [key: string]: ThemeOption;
  light: ThemeOption;
  dark: ThemeOption;
};

export interface ColorToolsArgs {
  mode: string;
  themes?: ThemeOptions;
  toggle?: () => void;
  setTheme?: (mode: string) => void;
}

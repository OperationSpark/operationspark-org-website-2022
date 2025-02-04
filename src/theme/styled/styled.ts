import 'styled-components';

type ColorWeight =
  | '0'
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type ColorRanges = Record<ColorWeight, string>;

interface BaseColors {
  fg: string;
  bg: string;
  bgHover: string;
  black: string;
  white: string;
  primary: ColorRanges;
  secondary: ColorRanges;
  border: ColorRanges;
  grey: ColorRanges;
  yellow: ColorRanges;
  red: ColorRanges;
  green: ColorRanges;
  magenta: ColorRanges;
  blue: ColorRanges;
}
interface DefaultColors extends BaseColors {
  alpha: {
    bg: string;
    fg: string;
    bg50: string;
    fg50: string;
    bg25: string;
    fg25: string;
    fg10: string;
    red: string;
    red25: string;
    red01: string;
  };

  purple: {
    [50]: string;
    [500]: string;
    [700]: string;
    [900]: string;
    alpha: {
      [500]: {
        100: string;
        200: string;
        500: string;
      };
      [700]: {
        100: string;
        200: string;
        500: string;
      };
      [900]: {
        100: string;
        200: string;
        500: string;
      };
    };
  };
}
declare module 'styled-components' {
  export interface DefaultTheme extends DefaultColors {
    colorMode: 'light' | 'dark';
    setColorMode: (newTheme: 'light' | 'dark' | 'system') => void;
    setNavHeight: (n: number) => void;
    isLightMode: boolean;
    isSystemMode: boolean;
    navHeight: number;

    /**
     * @returns RGBA string with alpha and brightness
     *
     * @example
     * theme.rgb('green', 0.5, 4)  // 'rgba(32, 255, 32, 0.5)'
     * theme.rgb('green', 0.5, -4) // 'rgba(0, 204, 0, 0.5)'
     * theme.rgb('green', 0.5)     // 'rgba(0, 255, 0, 0.5)'
     */
    rgb: (color: keyof BaseColors, alpha?: number, brightness?: number) => string;
    /**
     * @returns RGB only
     *
     * @example
     * theme.asRgb('green')     // '0, 255, 0'
     * theme.asRgb('green', 4)  // '32, 255, 32'
     * theme.asRgb('green', -4) // '0, 204, 0'
     */
    asRgb: (color: string, brightness?: number) => string;
  }
}

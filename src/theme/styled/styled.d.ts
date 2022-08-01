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

declare module 'styled-components' {
  export interface DefaultTheme {
    colorMode: 'light' | 'dark';
    isLightMode: boolean;
    fg: string;
    bg: string;
    bgHover: string;
    navHeight: number;
    setNavHeight: (n: number) => void;
    alpha: {
      bg: string;
      fg: string;
    };
    black: string;
    white: string;
    primary: ColorRanges;
    secondary: GradientRanges;
    border: GradientRanges;
    grey: GradientRanges;
    yellow: GradientRanges;
    red: GradientRanges;
    green: GradientRanges;
    magenta: GradientRanges;

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
}

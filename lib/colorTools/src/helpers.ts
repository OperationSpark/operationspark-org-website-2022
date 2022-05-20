import { Color, TColorRGBA } from './cTools';

/**
 *
 * @param c
 * @returns
 */
export const resolveColor = (c?: Color): TColorRGBA => {
  const defaultColor: TColorRGBA = [0, 0, 0, 1];
  if (!c) {
    console.error(`Color "${c}" is not defined`);
    return defaultColor;
  }

  if (Array.isArray(c)) {
    return c;
  } else if (!c || typeof c !== 'string') {
    return defaultColor;
  } else if (c.includes('rgb')) {
    (c.match(/([0-9]){1,3}/g) || ['0', '0', '0', '1']).forEach(
      (n: string, i: number) => {
        defaultColor[i] = Number(n);
      },
    );
    if (defaultColor.length > 4) {
      defaultColor[3] = Number(`${defaultColor[3]}.${defaultColor.pop()}`);
    }
  } else if ((c[0] === '#' && c.length === 7) || c.length === 6) {
    (c.match(/([0-9A-Za-z]){2}/g) || ['0', '0', '0', '1']).forEach(
      (n: string, i: number) => {
        defaultColor[i] = parseInt(n, 16);
      },
    );
  }
  return defaultColor;
};

export const minMax = (n: number) => (n < 0 ? 0 : n > 255 ? 255 : n);

export const adjustColorLightness = (color: TColorRGBA, x = 1): TColorRGBA => {
  const [r = 0, g = 0, b = 0, a = 1] = color;
  const n = Math.floor(8 * x);

  return [minMax(r + n), minMax(g + n), minMax(b + n), a];
};

export const adjustAlpha = (c: Color, a = 0.9): TColorRGBA => {
  const [r, g, b] = resolveColor(c);
  return [r, g, b, a];
};

export const rgbaToString = ([r, g, b, a]: [number, number, number, number]) =>
  `rgba(${r},${g},${b},${a})`;

import { resolveColor } from '../../helpers';
import { baseColors } from '../../colors/base';
import chalk from 'chalk';

describe('Resolve Color', () => {
  Object.values(baseColors).forEach((color) => {
    describe(chalk[color.name](`| ${color.name}`), () => {
      test(`Returns an array for hex string [${color.hex1}]`, () => {
        const colorArray = resolveColor(color.hex1);
        expect(Array.isArray(colorArray)).toBeTruthy();
        expect(colorArray).toEqual(color.expected);
      });

      test(`Returns an array for hex string (numbers only) [${color.hex2}]`, () => {
        const colorArray = resolveColor(color.hex2);
        expect(Array.isArray(colorArray)).toBeTruthy();
        expect(colorArray).toEqual(color.expected);
      });

      test(`Returns an array for RGB string [${color.rgb}]`, () => {
        const colorArray = resolveColor(color.rgb);
        expect(Array.isArray(colorArray)).toBeTruthy();
        expect(colorArray).toEqual(color.expected);
      });

      test(`Returns an array for RGBA string [${color.rgba}]`, () => {
        const colorArray = resolveColor(color.rgba);
        expect(Array.isArray(colorArray)).toBeTruthy();
        expect(colorArray).toEqual(color.expected);
      });

      [0, 0.25, 0.5, 0.75, 1].forEach((n) => {
        const expected = [...color.expected.slice(0, 3), n];
        const rgba = `rgb(${expected.join(', ')})`;
        test(`Should preserve alpha channel for RGBA string "${rgba}"`, () => {
          const colorArray = resolveColor(rgba);
          expect(colorArray).toEqual(expected);
        });
      });
    });
  });
});

import { ColorToolsArgs, IColorTools } from './cTools';
import colors from './colors';
import {
  resolveColor,
  rgbaToString,
  adjustColorLightness,
  adjustAlpha,
} from './helpers';

/**
 * @param mode Color theme
 */

const ColorTools = ({
  mode,
  themes,
  toggle,
  setTheme,
}: ColorToolsArgs): IColorTools => ({
  mode,
  colors: {
    ...colors[mode],
    ...themes?.common,
    ...themes?.[mode],
  },
  toggle,
  setTheme,
  get(color) {
    return this.colors[color] ?? 'rgba(0,0,0,1)';
  },
  darker(c, n = 1) {
    const color = resolveColor(this.colors[c]);
    return rgbaToString(adjustColorLightness(color, -(n ?? 1)));
  },
  lighter(c, n = 1) {
    const color = resolveColor(this.colors[c]);
    return rgbaToString(adjustColorLightness(color, n ?? 1));
  },
  alpha(c, a = 0.9) {
    return rgbaToString(adjustAlpha(this.get(c), a));
  },

  adjust(c, opts) {
    if (!opts) {
      return this.get(c) || 'rgba(0,0,0,1)';
    }
    let color = resolveColor(this.get(c));
    if (opts.alpha || opts.alpha === 0) {
      color = adjustAlpha(color, opts.alpha ?? 0.9);
    }
    if (opts.lighter) {
      color = adjustColorLightness(color, opts.lighter ?? 1);
    }
    if (opts.darker) {
      color = adjustColorLightness(color, -(opts.darker ?? 1));
    }
    return rgbaToString(color);
  },
});

export default ColorTools;

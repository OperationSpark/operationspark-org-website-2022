import { DefaultTheme } from 'styled-components';
import { ColorKey } from '../styled';

type BackdropFilterOptions = {
  /** Blur amount in pixels */
  blur: number;
  /** Background color key from theme */
  color: ColorKey;
  /** Opacity level for the background color if supported */
  opacity: number;
};

const defaultBackdropFilterOptions: BackdropFilterOptions = {
  blur: 8,
  color: 'bg',
  opacity: 0.75,
};
/**
 * @param options - Options for the backdrop filter
 * @param options.blur - Blur amount in pixels
 * @param options.color Background color key from theme. Default is 'bg'.
 * @param options.opacity - Opacity level for the background color if supported. Default is 0.75 (if backdropFilter is not supported, the opacity will be 1).
 * @returns A function that will be invoked by styled-components with the `props: { theme }` as the argument.
 */
export const backdropFilter =
  (options: Partial<BackdropFilterOptions> = defaultBackdropFilterOptions) =>
  ({ theme }: { theme: DefaultTheme }) => {
    const {
      blur = 8,
      color = 'bg',
      opacity = 0.75,
    } = { ...defaultBackdropFilterOptions, ...options };
    return `
    background: ${theme.rgb(color, 1)};
    @supports (backdrop-filter: blur(${blur}px)) {
      background: ${theme.rgb(color, opacity)};
      backdrop-filter: blur(${blur}px);
      -webkit-backdrop-filter: blur(${blur}px);
    }
  `;
  };

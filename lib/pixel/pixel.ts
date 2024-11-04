import { PixelWindow } from './types';

declare let window: PixelWindow;

export const pageView = () => {
  window.fbq('track', 'PageView');
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  window.fbq('track', name, options);
};

const pixel = {
  pageView,
  event,
};

export default pixel;

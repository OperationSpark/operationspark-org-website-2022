import { PixelWindow } from './types';
export const FB_PIXEL_ID = process.env.FB_PIXEL_ID;
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

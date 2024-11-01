import { GoogleAnalyticsWindow } from './types';
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
declare let window: GoogleAnalyticsWindow;

const event = (name: string, options = {}) => {
  window.gtag('track', name, options);
};

const ga = { event };

export default ga;

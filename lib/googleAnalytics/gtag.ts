import { GoogleAnalyticsWindow } from './types';

declare let window: GoogleAnalyticsWindow;

const event = (name: string, options = {}) => {
  window.gtag('track', name, options);
};

const ga = { event };

export default ga;

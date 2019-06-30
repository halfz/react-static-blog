// refer web/indexAnalytics.js
import { GA_ID } from 'const';

const hasAnalytics = typeof window !== 'undefined' && window.analytics;

const dummy = () => null;
const gtag = hasAnalytics ? window.analytics.gtag : dummy;
const fbq = hasAnalytics ? window.analytics.fbq : dummy;
const amp = hasAnalytics ? amplitude : null;

const pageView = async ({ pathname }) => {
  gtag('config', GA_ID);
  fbq('track', 'PageView');
  if (amp) {
    amp.getInstance().logEvent(`PageView${pathname}`);
  }
};

export default {
  pageView,
};

export type GAKeys = 'track';
export type GAQName = 'PageView' | string;

export function gtag(key: GAKeys, name: string): void;
export function gtag(key: GAKeys, name: string, options: Record<string, string | number>): void;

export interface GoogleAnalyticsWindow extends Window {
  gtag: typeof fbq;
}

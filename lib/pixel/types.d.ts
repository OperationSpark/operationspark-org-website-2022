export type FBQKeys = 'track';
export type FBQName = 'PageView' | string;

export function fbq(key: FBQKeys, name: string): void;
export function fbq(key: FBQKeys, name: string, options: Record<string, string | number>): void;

export interface PixelWindow extends Window {
  fbq: typeof fbq;
}

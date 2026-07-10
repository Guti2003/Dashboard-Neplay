export interface PlatformOption {
  slug: string;
  name: string;
  colorVar: string;
}

/** The 3 fixed platforms this app manages — mirrors the routes in app.routes.ts. */
export const PLATFORMS: PlatformOption[] = [
  { slug: 'netflix', name: 'Netflix', colorVar: '--color-netflix' },
  { slug: 'disney', name: 'Disney+', colorVar: '--color-disney' },
  { slug: 'amazon-prime', name: 'Amazon Prime', colorVar: '--color-amazon' },
];

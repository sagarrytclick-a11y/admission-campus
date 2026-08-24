// src/site-identity/assets.ts
// Asset paths and configurations for site identity

export const SITE_ASSETS = {
  // Logo variants
  logo: {
    main: "/logo.png",
    favicon: "/logo.png",
    appleTouchIcon: "/logo.png",
  },

  // PWA icons (use logo until dedicated icon-192/512 assets exist)
  icons: {
    icon192: "/logo.png",
    icon512: "/logo.png",
  },

  // Hero images (files in /public/Hero)
  hero: {
    main: "/Hero/hero-1.jpg",
  },
} as const;

// Helper functions for asset management
export const getAssetPath = (category: keyof typeof SITE_ASSETS, asset: string) => {
  const categoryAssets = SITE_ASSETS[category] as Record<string, string>;
  return categoryAssets[asset] || null;
};

export const getLogoUrl = (variant: keyof typeof SITE_ASSETS.logo = 'main') =>
  SITE_ASSETS.logo[variant];

export const getIconUrl = (size: keyof typeof SITE_ASSETS.icons) =>
  SITE_ASSETS.icons[size];

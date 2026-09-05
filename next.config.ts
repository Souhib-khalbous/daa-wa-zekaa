import type { NextConfig } from 'next';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const logoPath = resolve('public/brand/logo.png');
const logo = existsSync(logoPath) ? readFileSync(logoPath) : null;
const hasLogo = !!logo && logo.length >= 24 && logo.subarray(1, 4).toString() === 'PNG';

// Same detection for the social share image, so dropping the file in is all it takes.
const ogPath = resolve('public/brand/og.png');
const og = existsSync(ogPath) ? readFileSync(ogPath) : null;
const hasOg = !!og && og.length >= 24 && og.subarray(1, 4).toString() === 'PNG';

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/, so the
// deployed build carries a path prefix that local development must not have.
const isPages = process.env.GITHUB_PAGES === 'true';
const repo = 'daa-wa-zekaa';
const basePath = isPages ? `/${repo}` : '';

// Canonical tags, hreflang and Open Graph are absolute URLs. Falling back to
// localhost on a Pages build would ship them silently wrong, so fail instead.
if (isPages && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL must be set when GITHUB_PAGES=true. ' +
      `Expected the Pages origin, e.g. https://souhib-khalbous.github.io${basePath}`,
  );
}

const nextConfig: NextConfig = {
  output: 'export',
  experimental: { globalNotFound: true },
  basePath,
  assetPrefix: isPages ? `/${repo}/` : '',
  env: {
    NEXT_PUBLIC_HAS_LOGO: String(hasLogo),
    NEXT_PUBLIC_LOGO_WIDTH: String(hasLogo ? logo!.readUInt32BE(16) : 180),
    NEXT_PUBLIC_LOGO_HEIGHT: String(hasLogo ? logo!.readUInt32BE(20) : 72),
    // Next prefixes <Link> automatically but not raw strings: metadata icons,
    // the meta-refresh entry redirect, next/image src, or pathname parsing.
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_HAS_OG: String(hasOg),
    NEXT_PUBLIC_OG_WIDTH: String(hasOg ? og!.readUInt32BE(16) : 1200),
    NEXT_PUBLIC_OG_HEIGHT: String(hasOg ? og!.readUInt32BE(20) : 630),
  },
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;

import path from 'node:path';
import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL ?? 'http://localhost:1337';

const nextConfig: NextConfig = {
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [new URL('/uploads/**', strapiUrl)],
    dangerouslyAllowLocalIP:
      process.env.STRAPI_ALLOW_LOCAL_IP === 'true',
  },
};

export default nextConfig;

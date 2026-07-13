import path from 'node:path';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;

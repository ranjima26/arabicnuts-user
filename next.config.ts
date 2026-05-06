import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['figma:asset'] = path.resolve(__dirname, 'src/assets');
    return config;
  },
};

export default nextConfig;

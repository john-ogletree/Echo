import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Setting the output to 'server' is still the key change
  output: 'server',
  adapter: cloudflare(),
});
import { defineConfig } from 'astro/config';
// The astro/node adapter is needed to enable SSR
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [],
});
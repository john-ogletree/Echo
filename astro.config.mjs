// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        external: ['i18next', 'i18next-browser-languagedetector'],
      },
    },
  },
});

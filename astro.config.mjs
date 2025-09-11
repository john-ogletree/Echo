// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        'i18next': path.resolve(__dirname, './node_modules/i18next/dist/esm/i18next.js'),
        'i18next-browser-languagedetector': path.resolve(__dirname, './node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js'),
      },
    },
  },
});
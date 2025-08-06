import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
// import tailwind from '@astrojs/tailwind'; // This line is no longer needed

// https://astro.build/config
export default defineConfig({
  // The array is now empty
  integrations: [],

  vite: {
    plugins: [tailwindcss()]
  }
});
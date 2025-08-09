// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#F0EAD6',
        'surface': '#D4C9A8',
        'text': '#3B2F2A',
        'text-light': '#5B4F48',
        'heading': '#E07A5F',
        'accent': '#3D87A6',
        'border': '#A69E8C',
        'tag-bg': 'rgba(61, 135, 166, 0.15)',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
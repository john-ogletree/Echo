/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D1117',
        surface: '#161B22',
        text: '#E6EDF3',
        'text-light': '#8B949E',
        heading: '#FFFFFF',
        accent: '#58A6FF',
        border: '#30363D',
        'tag-bg': 'rgba(88, 166, 255, 0.15)',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      screens: {
        // Custom mobile breakpoint based on original CSS
        'mobile-sm': '480px',
        // 'md' already exists at 768px in Tailwind
        'lg': '920px', // Custom LG breakpoint
      },
      listStyleImage: {
        checkmark: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2358A6FF' viewBox='0 0 16 16'><path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/></svg>")`,
      },
    },
  },
  plugins: [],
};
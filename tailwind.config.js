/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './presets/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('tailwindcss-primeui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
};

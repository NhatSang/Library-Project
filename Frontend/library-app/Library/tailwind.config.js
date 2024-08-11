/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#05CDFA',
          light: '#05CDFA',
        },
        background: {
          dark: '#02222E',
          light: '#FFFFFF',
        },
        text: {
          dark: '#FFFFFF',
          light: '#000000',
        },
      },
    },
  },
  plugins: [],
};

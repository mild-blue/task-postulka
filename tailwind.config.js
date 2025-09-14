/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        accent: '#E5DBFF',
        background: {
          dark: '#12003E',
          medium: '#463868',
          light: '#4C1FBB',
        },
      },
    },
  },
  plugins: [],
};

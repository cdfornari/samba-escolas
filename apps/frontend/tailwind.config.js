/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        carnival_yellow: '#FFD500',
        carnival_green: '#009A44',
        carnival_blue: '#002B7F',
        carnival_red: '#FF4D4D',
        carnival_orange: '#FFA500',
        carnival_purple: '#A020F0',
      }
    },
  },
  plugins: [],
};

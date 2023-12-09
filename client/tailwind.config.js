/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c1': '#272727',
        'c2': '#404040',
        'c3': '#000000',
        'c4': '#5c5a5a',
        'c5': '#FFFFFF',
        'c6': '#383838',
        'online': '#22C55E',
        'offline': '#EF4444',
        'away': '#EAB308'
      }
    },
  },
  plugins: [],
}
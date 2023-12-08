/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '10/16': '8/16'
      },
      colors: {
        'c1': '#FFFFFF',
        'c2': '#EAEEF3',
        'c3': '#000000',
        'c4': '#2563EB',
        'c4-hover': '#104FBD',
        'online': '#22C55E',
        'offline': '#EF4444',
        'away': '#EAB308'
      }
    },
  },
  plugins: [],
}
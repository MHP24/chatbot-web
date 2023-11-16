/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '10/16': '10/16'
      },
      colors: {
        'c1': '#FFFFFF',
        'c2': '#E5E7EB',
        'c3': '#000000',
        'c4': '#2563EB',
        'online': '#22C55E',
        'offline': '#EF4444',
        'away': '#EAB308'
      }
    },
  },
  plugins: [],
}
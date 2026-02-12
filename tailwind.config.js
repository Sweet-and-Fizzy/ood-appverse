/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'appverse-red': '#C91235',
        'appverse-black': '#232323',
        'appverse-gray': '#DDDEDF',
        'appverse-pink': '#F2E2E5',
        'appverse-blue': '#0076AF',
        'appverse-green': '#00857A',
      },
      fontFamily: {
        'serif': ['"Serifa Std"', 'serif'],
        'sans': ['"Source Sans 3"', 'sans-serif'],
      },
      borderRadius: {
        'appverse': '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

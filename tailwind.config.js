/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'first': '#85B3E1',
        'second': '#666666',
      },
    },
  },
  plugins: [require('daisyui')],
}


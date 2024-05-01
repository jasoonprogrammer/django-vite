/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
      },
      height: {
        '95vh': '95vh',
        '90vh': '90vh'
      }
    },
  },
  plugins: [],
}


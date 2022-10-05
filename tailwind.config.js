/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#14213D',
        "secondary": '#FCA311',
        "app-gray": '#E5E5E5'
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

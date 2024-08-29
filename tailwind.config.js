const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.web.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.web.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PlayfairDisplay: ["Playfair Display", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        primary: {
          100: "#F0F4FF",
          200: "#D9E2FF",
          300: "#A6C1FF",
          400: "#598BFF",
          500: "#3366FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
      },
    },
  },
  plugins: [],
};

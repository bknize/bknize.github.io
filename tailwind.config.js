const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'serif': ['Playfair Display', 'serif'],
      'sans': ['Source Sans Pro', 'sans-serif'],
      'mono': ['Jost', 'sans-serif']
    },
    colors: {
      neutral: colors.trueGray,
      grey: colors.grey,
      cool: colors.coolGray,
      white: colors.white,
      accent: colors.amber
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

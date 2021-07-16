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
      gray: colors.blueGray,
      teal: colors.teal,
      blue: colors.blue,
      white: colors.white,
      sky: colors.sky
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

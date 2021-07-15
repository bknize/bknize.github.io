const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  //Purging for Production is configured in PostCSS Config
  purge:{    
    content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  },
  theme: {
    fontFamily: {
      'serif': ['Playfair Display', 'serif'],
      'sans': ['Source Sans Pro', 'sans-serif'],
      'mono': ['Jost', 'sans-serif']
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};

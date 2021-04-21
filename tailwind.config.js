module.exports = {
  purge: ['./src/**/*.html', './src/**/*.md', './src/**/*.njk'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      height: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '180': '45rem',
      },
      lineHeight: {
        '12': '3rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
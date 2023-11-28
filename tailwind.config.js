/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
    minWidth: {
      'xs': '16rem',
      'sm': '24rem',
      'md': '28rem',
      'lg': '32rem'
    },
    zIndex: {
      '1': '1'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}


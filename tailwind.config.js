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
      'lg': '32rem',
      '60': '15rem'
    },
    zIndex: {
      '1': '1'
    },
    minHeight: {
      '60': '15rem'
    },
    maxWidth: {
      '60': '15rem',
      'sm': '24rem'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}


module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ifblue: {
          DEFAULT: '#1D0070'
        },
      },
      fontFamily: {
        'extended': ['extended-regular', 'helvetica', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

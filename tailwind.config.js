module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        plus: '0.3125rem',
      },
      spacing: {
        px3: '0.1875rem',
        4.5: '1.125rem',
      },
      minWidth: {
        6: '1.5rem',
      },
      boxShadow: {
        navbar: '0px 4px 12px rgba(0, 0, 0, 0.12)',
      },
      colors: {
        alertyellow: {
          DEFAULT: '#FFF18A',
        },
        alertred: {
          DEFAULT: '#F15929',
        },
        ifbeige: {
          DEFAULT: '#FFF4E0',
        },
        iflightblue: {
          DEFAULT: '#033CE0',
        },
        ifblue: {
          DEFAULT: '#1D0070',
        },
        iflightgray: {
          DEFAULT: '#ECECEC',
        },
        ifgray: {
          DEFAULT: '#6A737D',
        },
        iforange: {
          DEFAULT: '#FFA542',
        },
        ifpink: {
          DEFAULT: '#FFC2EB',
        },
        ifcubepink: {
          DEFAULT: '#FF94DB',
        },
      },
      fontFamily: {
        favorit: ['favorit-regular', 'helvetica', 'sans-serif'],
        extended: ['extended-regular', 'helvetica', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

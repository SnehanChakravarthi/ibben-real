/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik-Regular', 'sans-serif'],
        'rubik-bold': ['Rubik-Bold', 'sans-serif'],
        'rubik-extra-bold': ['Rubik-ExtraBold', 'sans-serif'],
        'rubik-medium': ['Rubik-Medium', 'sans-serif'],
        'rubik-semi-bold': ['Rubik-SemiBold', 'sans-serif'],
        'rubik-light': ['Rubik-Light', 'sans-serif'],
      },
      colors: {
        primary: {
          100: 'rgb(43 92 24 / 0.3)',
          200: 'rgb(43 92 24 / 0.6)',
          300: '#2B5C18',
        },
        accent: {
          100: '#FBF8F0',
          200: '#F2E1C9',
          300: '#EAC6A0',
        },
        black: {
          DEFAULT: '#000000',
          100: '#8C8E98',
          200: '#666876',
          300: '#191D31',
        },
        danger: '#F75555',
      },
    },
  },
  plugins: [],
};

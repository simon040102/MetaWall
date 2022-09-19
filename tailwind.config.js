/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#EFECE7',
      secondary: '#03438D',
      white: '#FFFFFF',
      black: '#000000',
      success: '#A8B0B9',
      error: '#F57375',
      water: '#E2EDFA',
      red: '#DE4B63',
      green: '#83C51D',
      yellow: '#FAA722',
      gray: '#9B9893',
      gray100: '#EFECE7',
      gray200:'#A8B0B9',
      yellow100: '#EEC32A',
      
    },
    extend: {
      spacing: {
        536: '30rem',
        336: '21rem',
      },
    },
  },
  plugins: [],
};

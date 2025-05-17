/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      'banner-pattern': "url('src/assets/banner-dog.svg')",
    },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
      },
      colors: {
        primary: '#e52472',
        secondary: '#23c3e3',
        'card-grey': '#F2F2F2',
        'card-blue': '#CEE2FF',
        'card-yellow': '#FFD343',
        'navy-blue': '#0F0A2B',
        'secondary-light': '#232220',
        'text-light': '#a3a3a3',
        'secondary-gray': '#BDBDBD',
        'background-gray': '#ECECEC',
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  plugins: [],
}
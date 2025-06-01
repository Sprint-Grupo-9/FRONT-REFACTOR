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
        primary: '#E52472',
        secondary: '#64748b',
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
      keyframes: {
        'paw-1': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '25%': { opacity: '1', transform: 'scale(1)' },
        },
        'paw-2': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'paw-3': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '75%': { opacity: '1', transform: 'scale(1)' },
        },
        'paw-4': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'paw-1': 'paw-1 2s infinite',
        'paw-2': 'paw-2 2s infinite',
        'paw-3': 'paw-3 2s infinite',
        'paw-4': 'paw-4 2s infinite',
      },
    },
  },
  plugins: [],
}
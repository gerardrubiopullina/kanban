/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C1D95',    
        background: '#2E1065', 
        accent: '#34D399',
        text: {
          primary: '#FFFFFF',
          secondary: '#D1FAE5'
        }
      }
    },
  },
  plugins: [
    scrollbar
  ],
}


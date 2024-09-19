/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#FF7D29',
        secandary:'#f96d10',
        gray:'#f3f2f2',
        darkgray:'#e4e4e4'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


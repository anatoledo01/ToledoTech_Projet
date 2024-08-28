/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".//*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
          "home": "url('/Imagens/bg.png')"
      }
    },
  },
  plugins: [],
}
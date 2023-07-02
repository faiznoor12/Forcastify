/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'spectral': [ 'Spectral', 'serif'],
        'teko': [ 'Teko', 'sans-serif']
      },
    },
  },
  plugins: [],
}


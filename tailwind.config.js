/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-color': '#FF844B',
        'secondary-color': '#ED9200',
        'tertiary-color': '#12C036',
        'light-gray': 'rgba(236, 236, 236, 0.85)'
      },
      spacing: {
        '368px': '368px',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '320': '80rem',
        '464': '116rem'
      },
    },
  },
  plugins: [],
}

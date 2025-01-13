/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        metamorphous: ['var(--font-metamorphous)'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // M&M inspired fantasy palette
        parchment: {
          light: '#F5E6D3',
          DEFAULT: '#E8D5B7',
          dark: '#D4C4A8',
        },
        stone: {
          light: '#8B8680',
          DEFAULT: '#5C5850',
          dark: '#3A3633',
        },
        bronze: {
          light: '#D4AF37',
          DEFAULT: '#B8860B',
          dark: '#8B6914',
        },
        leather: {
          light: '#8B7355',
          DEFAULT: '#654321',
          dark: '#3E2723',
        },
      },
      fontFamily: {
        medieval: ['Georgia', 'serif'],
        game: ['Courier New', 'monospace'],
      },
      backgroundImage: {
        'parchment-texture': "url('/images/parchment-bg.png')",
        'stone-texture': "url('/images/stone-bg.png')",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Strict dark game palette
        'game-bg': '#1a1614',
        'game-panel': '#2B2520',
        'game-panel-light': '#342E28',
        'game-border': '#8B6914',
        'game-accent': '#D4AF37',
        'game-text': '#C4B5A0',
        'game-text-dim': '#8B7E71',
        'game-text-bright': '#E8D5B7',
        // Functional colors
        'stat-green': '#5A8A4A',
        'stat-red': '#8A4A4A',
        'quest-complete': '#5A8A4A',
      },
      fontFamily: {
        medieval: ['"Cinzel"', 'Georgia', 'serif'],
        game: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}

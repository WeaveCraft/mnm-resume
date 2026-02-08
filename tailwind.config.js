/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stone UI frame palette (M&M inventory screen)
        'stone-dark': '#3A3A3E',
        'stone-mid': '#4E4E52',
        'stone-light': '#5E5E62',
        'stone-highlight': '#6E6E72',
        // Dark inner panels
        'panel-bg': '#1A1A1E',
        'panel-dark': '#141418',
        'panel-border': '#2E2E32',
        // Game accent colors
        'game-gold': '#D4AF37',
        'game-gold-dim': '#8B6914',
        'game-text': '#C4B5A0',
        'game-text-dim': '#8B7E71',
        'game-text-bright': '#E8D5B7',
        // Status bar colors
        'hp-red': '#C44040',
        'mana-blue': '#4060C4',
        'endurance-yellow': '#C4A040',
        'stat-green': '#5A8A4A',
        'stat-red': '#8A4A4A',
      },
      fontFamily: {
        medieval: ['"Cinzel"', 'Georgia', 'serif'],
        game: ['"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}

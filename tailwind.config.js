/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm brown-gray UI frame palette (M&M in-game inventory)
        'stone-dark': '#3A3530',
        'stone-mid': '#524A42',
        'stone-light': '#605850',
        'stone-highlight': '#6E645A',
        // Dark inner panels (warm dark brown-black)
        'panel-bg': '#1A1816',
        'panel-dark': '#141210',
        'panel-border': '#2E2A24',
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

# Viktor Hurtig - Monsters & Memories Character Sheet Resume

An interactive, game-themed resume styled after the Monsters & Memories MMORPG character inspection screen. This unique portfolio showcases Viktor Hurtig's skills as a Unity Programmer candidate in an engaging, fantasy RPG format.

## 🎮 Features

- **3D Character Model**: Rotating voxel-style character built with Three.js
- **Animated Stat Bars**: Interactive attribute display with tooltips showing detailed skills
- **Equipment System**: Technologies displayed as equipped items with stats
- **Quest Log**: Career progression shown as completed and ongoing quests
- **Fully Responsive**: Works on desktop and mobile devices
- **M&M-Themed Design**: Stone panels, bronze accents, parchment textures matching M&M aesthetic

## 🎯 What Makes This Special

This isn't just a resume - it's a demonstration of:
- Creative problem-solving
- Understanding of the M&M game design philosophy
- Frontend development skills (React, Next.js, TypeScript)
- 3D graphics implementation (Three.js)
- Attention to detail and polish

## 📊 Character Stats

The resume presents Viktor's skills as RPG attributes:

- **Strength (90/100)**: C# Mastery & Technical Prowess
- **Agility (95/100)**: Learning Speed & Adaptability  
- **Intelligence (88/100)**: Problem-Solving & System Design
- **Charisma (80/100)**: Communication & Teamwork
- **Stamina (92/100)**: Work Ethic & Dedication
- **Wisdom (75/100)**: Best Practices & Code Quality
- **Dexterity (85/100)**: Versatility Across Tech Stacks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the character sheet!

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom fantasy theme
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended) or any static host

## 📦 Deployment

### Deploy to Vercel (Recommended - Free)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and deploy
5. Your site will be live at `your-project.vercel.app`

### Deploy to Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `out`

### Deploy to GitHub Pages

```bash
npm run build
# Deploy the 'out' directory to gh-pages branch
```

## 🎨 Customization Guide

### Update Your Information

Edit `pages/index.tsx`:

```typescript
const characterData = {
  name: "Your Name",
  race: "Your Background",
  class: "Your Target Role",
  // ... etc
};
```

### Modify Stats

Change the stat values and descriptions in the `stats` array in `pages/index.tsx`

### Change Equipment

Update the `equipment` array to reflect your tech stack

### Update Quests

Modify the `quests` object to show your career progression

### Customize Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  parchment: { /* your colors */ },
  bronze: { /* your colors */ },
  // etc.
}
```

## 📁 Project Structure

```
mnm-resume/
├── components/
│   ├── StatBar.tsx         # Animated stat bars with tooltips
│   ├── EquipmentSlot.tsx   # Equipment display components
│   └── CharacterModel.tsx  # 3D character model
├── pages/
│   ├── index.tsx           # Main character sheet page
│   ├── _app.tsx            # App wrapper
│   └── _document.tsx       # HTML document structure
├── styles/
│   └── globals.css         # Global styles & fantasy theme
├── public/
│   └── images/             # Images and assets
├── tailwind.config.js      # Tailwind configuration
└── package.json
```

## 💡 Key Components

### StatBar Component
Interactive stat display with hover tooltips showing detailed information about each skill category.

### EquipmentSlot Component
Displays technologies as equipped items. Hover to see item stats and descriptions.

### CharacterModel Component
3D voxel-style character model using Three.js. Can be rotated and features animated equipment (C# shield, Unity sword).

## 🎯 Purpose

This resume was created specifically for the Monsters & Memories Unity Programmer application to demonstrate:

1. **Genuine Interest**: Deep understanding of M&M's aesthetic and philosophy
2. **Technical Skills**: React, TypeScript, 3D graphics, responsive design
3. **Creativity**: Unique approach to presenting qualifications
4. **Passion**: Willingness to go above and beyond

## 📧 Contact

**Viktor Hurtig**
- GitHub: [@WeaveCraft](https://github.com/WeaveCraft)
- Email: [Your Email]
- Location: Södermanland, Sweden

Applying for: Unity Programmer at Monsters & Memories

## 📄 License

This project is MIT licensed. Feel free to use it as inspiration for your own creative resume!

## 🙏 Acknowledgments

- Monsters & Memories team for the inspiration
- The classic MMORPG community
- EverQuest and similar games that defined a genre

---

**"Ready to join your guild and help build the next classic MMORPG!"**

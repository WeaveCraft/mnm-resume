# Monsters & Memories Character Sheet Resume

An interactive, RPG-themed character sheet resume built as a web application. Inspired by classic MMORPG character inspection screens, it presents professional experience through the lens of fantasy RPG mechanics — stats, equipment, quests, factions, and more.

## Features

- **Interactive Character Sheet** — Tabbed interface with Inventory, Factions, Faiths, Ledger, Guild, and Social panels
- **3D Dungeon Scene** — Explorable environment with torches, particle effects, and orbit camera controls (Three.js)
- **Animated Stat Bars** — Seven core RPG attributes with hover tooltips showing detailed skill breakdowns
- **Equipment System** — Technologies displayed as equipped items with stats and descriptions
- **Inventory & Bags** — Skills organized into categorized bags (Backend, Frontend, DevOps, GameDev)
- **Quest Log** — Career progression shown as main quests, completed quests, and side quests with progress bars
- **Faction Reputation** — Professional affiliations displayed as faction standings with reputation bars
- **Faiths System** — Development philosophies presented as in-game religions with devotion levels
- **Buff System** — Current achievements and traits shown as active buffs
- **Unity WebGL Integration** — Embedded Unity game build with loading states and React-Unity communication bridge
- **Cinematic Intro** — Animated splash sequence on first load
- **Fully Responsive** — Works on desktop and mobile

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14, React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS, custom fantasy theme (1,400+ lines) |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Animation | Framer Motion |
| Game Integration | React Unity WebGL |
| Fonts | Cinzel (medieval serif), IBM Plex Mono |
| Build | Static export (no server required) |

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the character sheet.

### Production Build

```bash
npm run build
```

The static output is generated in the `out/` directory and can be hosted on any static file server, Vercel, Netlify, or GitHub Pages.

## Project Structure

```
mnm-resume/
├── components/
│   ├── AbilitySlot.tsx        # Ability display
│   ├── BuffIcon.tsx           # Buff/effect display
│   ├── CharacterModel.tsx     # Character portrait
│   ├── DungeonScene.tsx       # 3D dungeon (Three.js)
│   ├── EquipmentSlot.tsx      # Equipment item slots
│   ├── GamePanel.tsx          # Reusable panel wrapper
│   ├── HandInDialog.tsx       # NPC interaction dialog
│   ├── IntroSplash.tsx        # Cinematic intro sequence
│   ├── ResistanceItem.tsx     # Resistance stat display
│   ├── StatBar.tsx            # Animated stat bars
│   ├── TabNavigation.tsx      # Tab switching
│   └── UnityPlayer.tsx        # Unity WebGL integration
├── pages/
│   ├── index.tsx              # Main character sheet
│   ├── _app.tsx               # App wrapper
│   └── _document.tsx          # HTML document structure
├── styles/
│   └── globals.css            # Fantasy-themed styling
├── public/
│   ├── images/                # Character portrait assets
│   └── unity-build/           # Unity WebGL build files
├── unity-scripts/
│   ├── HandInManager.cs       # Unity C# script
│   └── WebGLBridge.jslib      # JS bridge for Unity-React
├── tailwind.config.js         # Custom fantasy color theme
├── next.config.js             # Static export configuration
└── UNITY_SETUP.md             # Unity WebGL build guide
```

## Unity WebGL Setup

See [UNITY_SETUP.md](./UNITY_SETUP.md) for instructions on building and integrating a Unity project as an embedded WebGL demo.

## Credits & Contact

Built by [WeaveCraft](https://github.com/WeaveCraft).

Inspired by [Monsters & Memories](https://www.monstersandmemories.com/) and the classic MMORPG genre.

## License

MIT

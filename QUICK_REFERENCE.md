# ⚡ Quick Reference Card

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Visit http://localhost:3000

# Build for production
npm run build

# Test production build
npm start

# Deploy (after pushing to GitHub)
# → Connect to Vercel and it auto-deploys
```

---

## Key Files to Edit

### 1. Your Information (`pages/index.tsx`)

**Lines 25-30**: Basic character info
```typescript
const characterData = {
  name: "Viktor Hurtig",          // ← Your name
  race: "Full-Stack Developer",   // ← Your background
  class: "Unity Programmer",      // ← Target role
  level: 28,                      // ← Age or experience
  guild: "Seeking: M&M",          // ← Goal
};
```

**Lines 35-110**: Your stats (7 attributes)
```typescript
{
  value: 90,  // ← Change this (0-100)
  description: "Your tagline",
  details: [
    "Point 1",
    "Point 2",
  ]
}
```

**Lines 150-200**: Your equipment (tech stack)
```typescript
{
  name: "Technology Name",
  icon: "🗡️",
  stats: ["Skill +50", "Another +30"]
}
```

**Lines 250-280**: Your quest log
```typescript
quests.mainQuest.objectives  // ← Update your goals
quests.completedQuests       // ← Past achievements
quests.sideQuests            // ← Current learning
```

### 2. Colors (`tailwind.config.js`)

```javascript
parchment: { light: '#F5E6D3', DEFAULT: '#E8D5B7' },
bronze: { light: '#D4AF37', DEFAULT: '#B8860B' },
stone: { light: '#8B8680', DEFAULT: '#5C5850' },
```

### 3. Contact Info (Bottom of `pages/index.tsx`)

```typescript
<a href="mailto:YOUR_EMAIL">Apply to M&M</a>
```

---

## File Structure

```
mnm-resume/
├── pages/index.tsx       ← Main resume page (EDIT THIS)
├── components/           ← Reusable UI pieces
│   ├── StatBar.tsx       ← Stat display
│   ├── EquipmentSlot.tsx ← Equipment items
│   ├── CharacterModel.tsx ← 3D model
│   └── IntroSplash.tsx   ← Intro animation
├── styles/globals.css    ← All styling
├── tailwind.config.js    ← Colors & theme
└── package.json          ← Dependencies
```

---

## Quick Customization

### Change a Stat Value
1. Open `pages/index.tsx`
2. Find `const stats = [`
3. Change the `value:` number (0-100)
4. Save and refresh browser

### Add New Equipment
1. Open `pages/index.tsx`
2. Find `const equipment = [`
3. Copy an existing item
4. Paste and modify:
   ```typescript
   {
     name: "New Tech",
     icon: "🔧",
     type: "Tool" as const,
     description: "What it does",
     stats: ["+50 Some Skill"]
   }
   ```

### Update Quest Progress
1. Find `const quests = {`
2. Update `completed:` from `false` to `true`
3. Or change `progress:` number (0-100)

---

## Deployment (5 Minutes)

### Using Vercel (Easiest):

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

2. **Deploy:**
- Go to vercel.com
- Sign in with GitHub
- Import your repo
- Click "Deploy"
- Done! 🎉

**Result:** Live site at `your-project.vercel.app`

---

## Testing Checklist

Before deploying:
- [ ] Run `npm run dev` - everything works?
- [ ] Hover over stats - tooltips appear?
- [ ] Click equipment - details show?
- [ ] 3D model loads and rotates?
- [ ] All tabs work (Stats, Equipment, Quests)?
- [ ] Mobile responsive?
- [ ] No console errors?

---

## Common Quick Fixes

**Problem:** npm install fails
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Styles don't apply
```bash
npm run build
```

**Problem:** 3D model doesn't show
- Wait 2-3 seconds (loads client-side)
- Check browser console for errors

---

## Key Features

✅ 3D rotating character model
✅ 7 animated stat bars with tooltips
✅ 6 equipment slots with hover details
✅ Quest log with progress tracking
✅ Intro splash screen
✅ Full M&M fantasy aesthetic
✅ Mobile responsive
✅ Fast loading
✅ SEO optimized
✅ Ready to deploy

---

## Support Files

- `README.md` - Full project documentation
- `DEPLOYMENT.md` - Detailed deploy guide
- `PROJECT_OVERVIEW.md` - Complete walkthrough

---

## Final Steps Before Sending

1. [ ] Update ALL personal info in index.tsx
2. [ ] Test locally: `npm run dev`
3. [ ] Deploy to Vercel
4. [ ] Test deployed site on phone
5. [ ] Copy URL for application email
6. [ ] Send application to M&M! 🚀

---

**Remember:** This resume shows:
- Your technical skills (React, TypeScript, 3D)
- Your creativity and passion
- Your understanding of M&M's aesthetic
- Your dedication to the application

**You've got this!** ⚔️🎮

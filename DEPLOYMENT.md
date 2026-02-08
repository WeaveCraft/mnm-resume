# 🚀 Deployment Guide - M&M Character Sheet Resume

## Quick Deploy to Vercel (Recommended - Takes 5 minutes!)

### Prerequisites
- A GitHub account
- Your project code

### Step 1: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
   - Name it something like `mnm-character-resume`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have one)

2. In your project directory, run:
```bash
git init
git add .
git commit -m "Initial commit - M&M Character Sheet Resume"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with your GitHub account (or log in)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
6. Click "Deploy"
7. Wait 2-3 minutes for deployment
8. Your site will be live at `your-project.vercel.app`!

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (if you have one)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 5-30 minutes)

### Step 4: Share Your Resume!

Your M&M character sheet resume is now live! Share it with:
- Shawn & Ali at Monsters & Memories
- Your network on LinkedIn
- Potential employers
- Twitter/X with #gamedev

---

## Alternative Deployment Options

### Deploy to Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Sign up / Log in
4. Click "Add new site" → "Import an existing project"
5. Connect to GitHub and select your repo
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
7. Click "Deploy"

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"deploy": "npm run build && gh-pages -d out"
```

3. Deploy:
```bash
npm run deploy
```

4. Enable GitHub Pages in repo settings:
   - Go to Settings → Pages
   - Source: gh-pages branch
   - Save

5. Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## Customizing for Your Application

### Before Deploying, Update These:

1. **Contact Information** (pages/index.tsx):
   - Email address
   - GitHub username
   - LinkedIn profile

2. **Character Data** (pages/index.tsx):
   - All personal information
   - Stats values (be honest!)
   - Equipment (your tech stack)
   - Quest log (your experience)

3. **Meta Tags** (pages/_document.tsx):
   - Page title
   - Description
   - OpenGraph tags for social sharing

4. **README** (README.md):
   - Add your actual email
   - Update GitHub links
   - Add any additional projects

### Testing Before Deploy

Always test locally first:
```bash
npm run dev
# Visit http://localhost:3000
# Test all tabs, hover effects, 3D model
```

Build and test production:
```bash
npm run build
npm start
```

---

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails on Vercel
- Check Node version (use 18 or higher)
- Ensure all dependencies are in package.json
- Check build logs for specific errors

### 3D Model not loading
- This is normal on first load
- The model loads client-side only
- Check browser console for WebGL errors

### Styles not applying
```bash
npm run build
# Check if Tailwind generated properly
```

---

## Performance Tips

1. **Optimize Images**: Compress any images you add
2. **Lazy Load**: Heavy components already use dynamic imports
3. **Analytics**: Add Vercel Analytics or Google Analytics
4. **SEO**: Update meta tags for better search visibility

---

## Monitoring & Updates

### After Deployment:

1. **Monitor**: Check Vercel dashboard for traffic and errors
2. **Update**: Push changes to GitHub, Vercel auto-deploys
3. **Analytics**: Enable Vercel Analytics in dashboard (free)
4. **Share**: Get the link and send it with your application!

---

## Final Checklist

Before sending to M&M:

- [ ] All personal info updated
- [ ] Stats accurately reflect your skills
- [ ] Equipment shows your actual tech stack
- [ ] Quest log shows your real experience
- [ ] Contact links work
- [ ] Tested on mobile and desktop
- [ ] 3D model loads and rotates
- [ ] All tooltips work
- [ ] Deployed and accessible
- [ ] Custom domain set up (optional)
- [ ] Shared on social media (optional)

---

## 🎯 Sending Your Application

When you apply to M&M, include:

**Email Subject**: "Unity Programmer Application - Viktor Hurtig [Character Inspection Ready]"

**Body**:
```
Hi Shawn & Ali,

I'm applying for the Unity Programmer position. Rather than send a traditional resume, 
I've created an interactive character sheet inspired by M&M's design:

🔗 [YOUR_VERCEL_URL]

Key stats:
- C# Mastery: 90/100
- Learning Speed: 95/100
- Problem-Solving: 88/100

I understand you value talent and ambition over years of industry experience. While my 
professional background is in web development, I've built this character sheet to 
demonstrate both my technical capabilities and my genuine passion for game development 
and M&M specifically.

Looking forward to discussing how I can contribute to the team.

Best regards,
Viktor
```

---

Good luck with your application! 🎮⚔️

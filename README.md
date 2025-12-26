# TriAce 2025 Tournament Website

Complete tournament management system with live scoring, standings, and Firebase integration.

## 🚀 Quick Deploy to Netlify with Auto-Updates

### **Option 1: Auto-Deploy via GitHub (RECOMMENDED)**

This enables **automatic deployment** - every time you update your code and push to GitHub, Netlify automatically deploys the changes!

#### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** button → **"New repository"**
3. Name it `triace-2025` (or any name)
4. Choose **Public** or **Private**
5. **Don't** check "Initialize with README"
6. Click **"Create repository"**

#### Step 2: Push Your Code to GitHub
Open terminal/command prompt in your `triace-2025` folder and run:

```bash
git init
git add .
git commit -m "Initial commit - TriAce 2025 tournament site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/triace-2025.git
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your actual GitHub username)*

#### Step 3: Connect to Netlify for Auto-Deploy
1. Go to [Netlify](https://app.netlify.com)
2. Sign in (or create account)
3. Click **"Add new site"** → **"Import an existing project"**
4. Click **"Deploy with GitHub"**
5. Authorize Netlify (if first time)
6. Select your **`triace-2025`** repository
7. **Build settings:**
   - Build command: *(leave empty)*
   - Publish directory: `.` or `/`
8. Click **"Deploy site"**

#### Step 4: You're Live! ✅
- Site deploys in ~1 minute
- Live URL: `https://random-name-12345.netlify.app`
- **Auto-deploy is ON!** Every GitHub push triggers deployment

#### Future Updates (Auto-Deploy)
```bash
# Make your changes to files
# Then:
git add .
git commit -m "Updated teams/scores/rules"
git push

# Netlify automatically deploys! No manual work needed.
```

#### Customize Your Domain
1. Go to your Netlify site dashboard
2. **Site settings** → **Domain management**
3. Click **"Add custom domain"** or **"Change site name"**
4. Set it to something like `triace-2025.netlify.app`

---

### **Option 2: Manual Drag & Drop (No Auto-Deploy)**

**⚠️ Warning:** You'll need to manually re-upload every time you make changes.

1. Go to [Netlify](https://app.netlify.com)
2. Drag the entire `triace-2025` folder onto Netlify
3. Site goes live immediately
4. For updates: drag & drop again (overwrites)

---

## 🔥 Firebase Configuration

The site uses **Firebase Realtime Database** for live scoring and data sync.

**Current Config:** Uses `koc2-20fb8` project (pre-configured)

### To Use Your Own Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable **Realtime Database**
4. Set database rules (Database → Rules):
```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```
5. Get config: Project Settings → General → Your apps → Config
6. Update in **4 files**:
   - `standings.html` (around line 284)
   - `scoring.html` (around line 284)
   - `history.html` (around line 284)
   - `teams.html` (around line 323)

---

## 📁 File Structure

```
triace-2025/
├── index.html          # Home page
├── rules.html          # Tournament rules & format
├── schedule.html       # Match schedule (placeholder)
├── standings.html      # Live Group A & B standings
├── scoring.html        # Score entry (password protected)
├── history.html        # Match history with details
├── teams.html          # Team rosters (admin edit mode)
├── styles.css          # Global stylesheet
├── script.js           # Mobile menu JavaScript
├── triace-logo.png     # Tournament logo (120px)
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

---

## 🔐 Admin Passwords

### **Score Entry Page:**
- Admin: `ADMIN#2025`
- Team passwords: `A1#`, `A2#`, `A3#`, ... `B9#`

### **Teams Page (Edit Mode):**
- Admin: `ADMIN#2025`
- Allows editing: Balls Collected & Fees Status

---

## 📊 Features

✅ **Live Standings** - Real-time Group A & B tables synced with Firebase  
✅ **Score Entry** - Password-protected match submission with parser  
✅ **Match History** - Complete records with expandable details  
✅ **Team Management** - Track balls collected & fees (admin only)  
✅ **Mobile Responsive** - Works perfectly on phones/tablets  
✅ **Auto-Deploy** - Push to GitHub → auto-updates site  

---

## 🔄 Git Workflow (for Auto-Deploy)

```bash
# Make changes to your files

# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Updated team rosters and scores"

# Push to GitHub (triggers auto-deploy)
git push

# Netlify deploys automatically in ~30 seconds!
```

---

**🎾 TriAce 2025 — Powered by Prosper Open**

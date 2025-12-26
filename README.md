# TriAce 2025 Tournament Website

A complete tournament management website for TriAce 2025 tennis tournament featuring 18 teams across 2 groups.

## Features

- 🏠 **Home Page**: Tournament overview and quick links
- 📋 **Rules Page**: Complete tournament rules, format, and competition structure
- 👥 **Teams Page**: All 18 teams with player rosters
- 📅 **Schedule Page**: Match schedules (placeholder ready)
- 📊 **Scorecard Page**: Live standings with Firebase integration

## Technology Stack

- Pure HTML/CSS/JavaScript
- Firebase Realtime Database for score tracking
- Responsive design for mobile and desktop
- Modern gradient UI with navy/ice blue theme

## Deployment to Netlify

### Option 1: Drag & Drop
1. Zip all files in this folder
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the zip file
4. Your site will be live instantly!

### Option 2: Git Deploy
1. Push this folder to a GitHub repository
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect your repository
5. Build settings are already configured in `netlify.toml`
6. Deploy!

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## File Structure

```
triace-2025/
├── index.html          # Home page
├── rules.html          # Tournament rules
├── teams.html          # Team rosters
├── schedule.html       # Match schedule
├── scorecard.html      # Live scorecard with Firebase
├── styles.css          # Main stylesheet
├── script.js           # JavaScript for mobile menu
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

## Customization

### Update Team Rosters
Edit `teams.html` to add actual player names for all teams.

### Update Firebase Config
If you want to use your own Firebase database, update the config in `scorecard.html`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // ... etc
};
```

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --navy: #001F3F;
  --ice: #4DBFFF;
  --cyan: #00E0FF;
  /* ... etc */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This tournament website is created for TriAce 2025 - Presented by Prosper Open.

---

**Powered by Prosper Open** 🎾

# 🚀 Inferno Roasts - Quick Start Guide

## Get Started in 5 Minutes

### 1. Explore the App

The app is already running and ready to use! Navigate through these key features:

#### 🏠 Landing Page (`/`)
- View the **Wall of Fame** with top roasts
- See feature highlights
- Click **"START ROASTING"** to begin

#### 🔥 The Oven (`/dashboard`)
**Main roast generator interface:**

1. **Choose Input Type**:
   - 📸 Photo: Upload an image
   - 📝 Text: Enter text to roast

2. **Select Heat Level**:
   - 🌶️ **Mild**: Light teasing
   - 🔥 **Medium**: Sharp wit
   - 💀 **Spicy**: Brutal honesty
   - ☢️ **TOXIC**: Absolute destruction

3. **Generate**: Click the fire button!

4. **Your Roasts**: View history on the right panel
   - ❤️ Like roasts
   - 📋 Copy to clipboard
   - 🔊 Text-to-speech
   - ⬇️ Download as image
   - 🔗 Share

#### 🏆 Leaderboard (`/leaderboard`)
- View top roasters
- See your rank
- Track likes and streaks

#### 👤 Profile (`/profile`)
- Check your **Roast Level** (XP-based)
- View **Achievements**:
  - 🔥 First Burn
  - 🛡️ Thick-Skinned
  - 💀 Charred
  - ☢️ Toxic Warrior
  - 🔥 On Fire (7-day streak)
  - ⚡ Viral Sensation
- Track your stats

#### 👑 Premium (`/premium`)
- Upgrade to **Fireproof Pass** ($9.99/month)
- Get unlimited roasts
- Remove ads (in production)
- Exclusive badge

### 2. Try These Features

#### Generate Your First Roast
```
1. Go to /dashboard
2. Select "Text" mode
3. Type: "I'm a professional gamer"
4. Set heat to "Medium"
5. Click "GENERATE ROAST"
6. Watch the fire animation! 🔥
```

#### Test the Heat Levels
Try generating roasts at different levels to see the difference:
- **Mild**: Playful and friendly
- **Toxic**: Notice the **glitch effect** on the text!

#### Unlock an Achievement
Generate 1 roast to unlock **"First Burn"** 🏆

#### Check Your XP
- Each roast gives XP based on heat level
- Mild: 10 XP
- Medium: 20 XP
- Spicy: 30 XP
- Toxic: 50 XP
- Level up every 100 XP!

### 3. Explore Components

#### Custom Components Location
All custom components are in `/src/app/components/`:

- `HeatSelector.tsx` - The heat level slider
- `RoastCard.tsx` - Roast display cards
- `GlitchText.tsx` - Toxic glitch effect
- `AchievementToast.tsx` - Achievement notifications
- `DynamicShareCard.tsx` - Social media cards
- `BurnAnimation.tsx` - Loading animation
- `Navigation.tsx` - Responsive nav

#### Test the Glitch Effect
1. Generate a **TOXIC** level roast
2. Watch for the RGB glitch animation on the text!

### 4. Understanding the Architecture

#### State Management (Zustand)
Open DevTools and check localStorage:
```javascript
// Your data is stored as 'inferno-storage'
// Includes:
{
  user: {
    roastLevel: 1,
    xp: 0,
    streak: 0,
    totalRoasts: 0,
    isPremium: false
  },
  roasts: [...],
  achievements: [...],
  credits: 5 // Free users start with 5
}
```

#### Theme System
Check `/src/styles/theme.css` for custom colors:
```css
--flame-orange: #FF4500
--cyan-neon: #00F0FF
--toxic-green: #39FF14
```

### 5. Customization Ideas

#### Change Brand Colors
Edit `/src/styles/theme.css`:
```css
:root {
  --flame-orange: #YOUR_COLOR;
  --cyan-neon: #YOUR_COLOR;
  --toxic-green: #YOUR_COLOR;
}
```

#### Add New Heat Level
1. Update type in `/src/stores/infernoStore.ts`
2. Add color in `/src/lib/utils.ts`
3. Update `HeatSelector` component
4. Add prompt template in `/src/lib/mockData.ts`

#### Create New Achievement
Edit `/src/stores/infernoStore.ts`:
```typescript
const defaultAchievements: Achievement[] = [
  {
    id: 'your-achievement',
    name: 'Achievement Name',
    description: 'How to unlock it',
    icon: '🎯',
    progress: 0,
    maxProgress: 10,
  },
  // ... existing achievements
];
```

### 6. Mobile Testing

The app is **mobile-first**. Test on mobile:

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device
4. Note the bottom navigation bar
5. Try the hamburger menu

### 7. Animations to Watch For

- ✨ Page transitions (smooth fade-in)
- 🔥 Fire animation during generation
- ⚡ Glitch effect on toxic roasts
- 🏆 Achievement toast pop-up
- 💫 Heat selector glow effects
- 🎯 Active tab indicator slide

### 8. Pro Tips

#### Keyboard Shortcuts
- `Cmd/Ctrl + N`: Go to dashboard (new roast)
- `Cmd/Ctrl + K`: Quick search (planned feature)

#### Free vs Premium
- **Free**: 5 credits (resets on page refresh in demo)
- **Premium**: Unlimited roasts (click upgrade in /premium)

#### Share a Roast
1. Generate a roast
2. Click the share icon (🔗)
3. Uses Web Share API if available
4. Falls back to copying URL

#### Download as Image
*(In production, this would use html2canvas)*
1. Generate a roast
2. Click download icon (⬇️)
3. See console for implementation notes

### 9. Production Deployment

To deploy this for real:

#### Required Setup
1. **Backend API Proxy**
   ```typescript
   // api/roast.ts
   import OpenAI from 'openai';
   
   export async function POST(req) {
     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
     // ... proxy the request
   }
   ```

2. **Environment Variables**
   ```env
   OPENAI_API_KEY=sk-...
   DATABASE_URL=postgresql://...
   STRIPE_SECRET_KEY=sk_live_...
   ```

3. **Database** (Supabase recommended)
   - Users table
   - Roasts table
   - Achievements table
   - Analytics table

4. **Payment Processing** (Stripe)
   - Monthly subscription ($9.99)
   - Webhook handling
   - Customer portal

5. **Image Storage** (Cloudinary/S3)
   - Photo uploads
   - Generated share cards
   - CDN delivery

### 10. Troubleshooting

#### Roasts not generating?
- Check that credits > 0 (top right)
- Upload a photo or enter text first
- Select a heat level

#### Achievements not unlocking?
- Check localStorage for `inferno-storage`
- Generate more roasts to hit milestones
- Refresh page if needed

#### Premium not working?
- Click "Upgrade Now" in `/premium`
- Check user.isPremium in DevTools
- In production, integrate Stripe

#### Glitch effect not showing?
- Only appears on **TOXIC** level roasts
- Make sure you selected toxic heat
- Effect triggers every 3 seconds

### 11. Next Steps

Ready to take it further?

1. ✅ **Done**: Explore the complete UI/UX
2. 🔄 **Next**: Integrate real OpenAI API
3. 🎨 **Customize**: Adjust colors and branding
4. 🚀 **Deploy**: Set up backend and database
5. 💰 **Monetize**: Enable Stripe payments
6. 📊 **Analyze**: Add analytics tracking
7. 🎯 **Market**: Launch on Product Hunt

### 12. Support Resources

- **README.md** - Project overview
- **TECHNICAL_DOCS.md** - Deep technical details
- **PROJECT_SUMMARY.md** - Complete feature list
- Inline code comments - Detailed explanations

### 13. Demo Credentials

The app uses **localStorage** for persistence:
- No login required
- Data persists in browser
- Clear localStorage to reset

### 14. Have Fun! 🔥

The app is fully interactive and ready to explore. Try:

1. Generate 10 roasts to unlock "Thick-Skinned"
2. Test all 4 heat levels
3. Share a roast with friends
4. Check the leaderboard
5. Upgrade to premium
6. Try the admin moderation panel

**Enjoy roasting! May the burns be legendary. 🔥👑**

---

Built with ❤️ and 🔥 using **Figma Make**

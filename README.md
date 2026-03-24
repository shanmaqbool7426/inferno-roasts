# 🔥 Inferno Roasts - AI Roast App

A premium, mobile-first AI-powered roast generator with a dark glassmorphic design and viral-ready features.

## 🎨 Design Identity

### Theme: "Dark Mode Architecture"
- **Base Colors**: Deep blacks (#0a0a0a, #111) with neon accents
- **Accent Colors**:
  - **Flame Orange**: #FF4500, #FF6B35 (primary actions)
  - **Cyan Neon**: #00F0FF, #00C9FF (secondary highlights)
  - **Toxic Green**: #39FF14, #00FF41 (premium/toxic features)
  
### Visual Effects
- **Glassmorphism**: Backdrop blur with rgba backgrounds
- **Glow Effects**: Dynamic shadows based on heat levels
- **Glitch Animation**: Special effect for toxic-level roasts
- **Motion**: Smooth page transitions and micro-interactions

### Typography
- **Headings**: Orbitron (bold, futuristic)
- **Body**: Inter (clean, readable)

## 📁 Architecture

### Folder Structure
```
src/
├── app/
│   ├── App.tsx                 # Main app component
│   ├── routes.ts               # React Router configuration
│   ├── components/             # Reusable components
│   │   ├── Navigation.tsx      # Mobile-first navigation
│   │   ├── HeatSelector.tsx    # Heat level slider
│   │   ├── RoastCard.tsx       # Roast display card
│   │   ├── GlitchText.tsx      # Toxic level text effect
│   │   └── AchievementToast.tsx # Achievement notifications
│   └── pages/                  # Route pages
│       ├── Landing.tsx         # Home page with wall of fame
│       ├── Dashboard.tsx       # The "Oven" - roast generator
│       ├── RoastDetail.tsx     # Individual roast page
│       ├── Leaderboard.tsx     # "The Burn Ward" rankings
│       ├── Profile.tsx         # User profile & achievements
│       ├── Premium.tsx         # "Fireproof Pass" subscription
│       ├── Admin.tsx           # Content moderation
│       └── NotFound.tsx        # 404 page
├── stores/
│   └── infernoStore.ts         # Zustand global state
├── lib/
│   ├── mockData.ts             # Mock roasts & leaderboard
│   └── utils.ts                # Helper functions
└── styles/
    ├── theme.css               # Inferno color palette
    └── fonts.css               # Typography imports
```

## 🛠️ Technical Stack

- **Framework**: React 18 + TypeScript
- **Routing**: React Router v7 (Data Mode)
- **State Management**: Zustand with persistence
- **Animations**: Motion (Framer Motion)
- **Styling**: Tailwind CSS v4 + Custom theme
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 🎮 Features

### Core Features
1. **Photo & Text Roasts**: Upload images or enter text to roast
2. **4 Heat Levels**: 
   - 🌶️ Mild: Light-hearted fun
   - 🔥 Medium: Sharp wit
   - 💀 Spicy: Brutally honest
   - ☢️ Toxic: Absolute destruction
3. **Shareable Roasts**: Copy, download, share functionality
4. **Text-to-Speech**: Hear roasts spoken aloud
5. **XP & Leveling System**: Gain XP and level up
6. **Achievements**: Unlock badges and milestones
7. **Streak Tracking**: Daily roast streaks
8. **Leaderboard**: Weekly rankings
9. **Premium Tier**: Unlimited roasts + exclusive features

### Component Highlights

#### HeatSelector
- Custom slider with 4 heat levels
- Dynamic color and glow effects
- Animated icons and tooltips
- Real-time visual feedback

#### RoastCard
- Glassmorphic design
- Share, copy, download, TTS buttons
- Like/unlike functionality
- Heat level indicator
- Special glitch effect for toxic roasts

#### GlitchText
- RGB channel separation effect
- Timed glitch intervals
- Multiple intensity levels
- Cyberpunk aesthetic

#### AchievementToast
- Animated entry/exit
- Progress bars
- Floating particle effects
- Auto-dismiss with manual close option

## 🤖 AI Integration Guide

### OpenAI Integration (Production)

```typescript
// In production, replace generateRoast() in utils.ts with:

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRoast(
  targetType: 'photo' | 'text',
  targetData: string,
  heatLevel: HeatLevel
): Promise<string> {
  const systemPrompt = roastPromptTemplates[heatLevel].system;
  
  if (targetType === 'photo') {
    // Use GPT-4 Vision
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Roast this photo:' },
            { type: 'image_url', image_url: { url: targetData } },
          ],
        },
      ],
      max_tokens: 200,
    });
    
    return response.choices[0].message.content;
  } else {
    // Use GPT-4 for text
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Roast this: ${targetData}` },
      ],
      max_tokens: 200,
    });
    
    return response.choices[0].message.content;
  }
}
```

### Content Moderation

```typescript
// Add moderation before displaying roasts
const moderationResponse = await openai.moderations.create({
  input: roastContent,
});

const flagged = moderationResponse.results[0].flagged;

if (flagged) {
  // Handle flagged content
  // Log for admin review, don't display to user
  console.log('Content flagged for review');
  throw new Error('Content violates guidelines');
}
```

## 🎯 State Management (Zustand)

The app uses Zustand for global state with localStorage persistence:

```typescript
const { user, addRoast, achievements } = useInfernoStore();

// Add a new roast (auto-updates XP, streak, achievements)
addRoast(roastData);

// Check premium status
if (user.isPremium) {
  // Unlimited roasts
}

// Use credit (free users)
const hasCredit = useCredit();
```

## 🎨 Custom Tailwind Classes

```css
/* Heat level colors */
text-heat-mild       /* Orange */
text-heat-medium     /* Orange-Red */
text-heat-spicy      /* Red */
text-heat-toxic      /* Toxic Green */

/* Brand colors */
text-flame-orange
text-cyan-neon
text-toxic-green

/* Surfaces */
bg-surface           /* #111 */
bg-surface-light     /* #1a1a1a */
bg-glass-bg          /* rgba(17,17,17,0.7) */
border-glass-border  /* rgba(255,255,255,0.1) */
```

## 📱 Responsive Design

- **Mobile-First**: Bottom navigation bar
- **Desktop**: Top navigation bar
- **Breakpoints**: Standard Tailwind (sm, md, lg, xl)
- **Touch-Friendly**: Large tap targets, swipe gestures

## 🚀 Performance Optimizations

1. **Code Splitting**: React Router lazy loading
2. **Image Optimization**: Max 5MB, automatic compression
3. **Animation Performance**: GPU-accelerated transforms
4. **State Persistence**: localStorage with Zustand
5. **Memoization**: React.memo on expensive components

## 🔒 Safety & Moderation

### Auto-Flagging System
- Hate speech detection
- Explicit content filtering
- Violence/self-harm prevention
- PII scrubbing

### Admin Panel
- Manual review queue
- AI confidence scores
- Approve/reject workflow
- Analytics dashboard

## 🎁 Premium Features

### Fireproof Pass ($9.99/month)
- ♾️ Unlimited roast generation
- ⚡ Priority AI processing
- 🚫 Ad-free experience
- 👑 Exclusive premium badge
- ✨ Early access to new features
- 🎨 Custom heat level presets

## 📊 Analytics & Metrics

Track these metrics for growth:
- Daily Active Users (DAU)
- Roasts generated per user
- Share/viral rate
- Premium conversion rate
- Retention (7-day, 30-day)
- Average session duration

## 🔄 Future Enhancements

1. **Voice Roasts**: Generate audio roasts with different voices
2. **Roast Battles**: Challenge friends to roast-offs
3. **Custom AI Personalities**: Choose comedian styles
4. **NFT Roasts**: Mint legendary roasts as NFTs
5. **API Access**: Developer API for integrations
6. **Mobile App**: React Native version

## 📝 Prompt Engineering Examples

See `/src/lib/mockData.ts` for detailed prompt templates:
- System messages for each heat level
- Example responses
- Temperature and token settings
- Moderation guidelines

## 🎪 Marketing & Virality

### Shareable Features
- Auto-generated OG images for social media
- One-click share to Twitter/Instagram
- Downloadable roast images with watermark
- Unique share URLs with preview

### Growth Tactics
- Wall of Fame showcasing best roasts
- Weekly leaderboard competitions
- Referral program (planned)
- Social media contests

## 📄 License

This is a demonstration project for Figma Make. In production, implement proper licensing.

---

**Built with 🔥 by Inferno Labs**

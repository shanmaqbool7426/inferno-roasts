# 🔥 Inferno Roasts - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Specifications](#component-specifications)
3. [State Management](#state-management)
4. [AI Integration](#ai-integration)
5. [Routing & Navigation](#routing--navigation)
6. [Styling & Theming](#styling--theming)
7. [Performance](#performance)
8. [Security](#security)

---

## Architecture Overview

### Tech Stack
```
React 18.3.1 + TypeScript
├── React Router 7.13.0 (Data Mode)
├── Zustand 5.0+ (State Management)
├── Motion 12.23+ (Animations - Framer Motion)
├── Tailwind CSS 4.1+ (Styling)
├── Radix UI (Primitives)
└── Lucide React (Icons)
```

### Project Structure
```
src/
├── app/                    # Application code
│   ├── App.tsx            # Root component
│   ├── routes.ts          # Router configuration
│   ├── components/        # Reusable UI components
│   └── pages/            # Route-specific pages
├── stores/               # Zustand stores
├── lib/                  # Utilities & helpers
├── hooks/               # Custom React hooks
└── styles/              # CSS & themes
```

---

## Component Specifications

### 1. HeatSelector
**Purpose**: Interactive slider for choosing roast intensity

**Props**:
```typescript
interface HeatSelectorProps {
  value: HeatLevel;           // Current heat level
  onChange: (level: HeatLevel) => void;
  disabled?: boolean;
}

type HeatLevel = 'mild' | 'medium' | 'spicy' | 'toxic';
```

**Features**:
- 4 heat levels with distinct visual styles
- Animated slider track with gradient fill
- Icon-based level indicators
- Hover tooltips
- Dynamic glow effects based on selection
- Color transitions: Orange → Red → Toxic Green

**Technical Details**:
- Uses Motion for smooth animations
- CSS gradients change dynamically
- Box shadows adjust based on heat level
- Keyboard accessible (arrow keys)

---

### 2. RoastCard
**Purpose**: Display roast with interactive actions

**Props**:
```typescript
interface RoastCardProps {
  roast: Roast;
  onLike?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

interface Roast {
  id: string;
  content: string;
  heatLevel: HeatLevel;
  targetType: 'photo' | 'text';
  targetData: string;
  likes: number;
  timestamp: number;
  isPublic: boolean;
}
```

**Features**:
- Glassmorphic design with backdrop blur
- Copy to clipboard
- Text-to-Speech playback
- Share via Web Share API
- Download as image (placeholder)
- Like/unlike functionality
- Heat level indicator
- Responsive layout

**Technical Details**:
- Uses `navigator.clipboard` API
- Integrates Web Speech API for TTS
- Conditional rendering based on `showActions`
- Special glitch effect for toxic roasts

---

### 3. GlitchText
**Purpose**: Cyberpunk glitch effect for toxic-level content

**Props**:
```typescript
interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}
```

**Features**:
- RGB channel separation
- Random glitch intervals
- 3 intensity levels
- Text shadow animations
- Multiple overlay layers

**Technical Details**:
- Uses CSS `clip-path` for layer slicing
- Motion for transform animations
- Timed intervals for glitch triggers
- Color-separated layers: cyan, orange, green

---

### 4. AchievementToast
**Purpose**: Animated notification for unlocked achievements

**Props**:
```typescript
interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
  duration?: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress?: number;
  maxProgress?: number;
}
```

**Features**:
- Slide-in animation from top-right
- Floating particle effects
- Progress bar (if applicable)
- Auto-dismiss with configurable duration
- Manual close button
- Toxic green glow effect

---

### 5. Navigation
**Purpose**: Responsive navigation for mobile and desktop

**Features**:
- Desktop: Top horizontal nav
- Mobile: Bottom tab bar
- Mobile menu overlay
- Active route indicator (animated)
- User stats display
- Credit counter
- Premium badge indicator

**Technical Details**:
- Uses `useLocation()` for active state
- Layout ID for smooth tab transitions
- Conditional rendering based on screen size
- Z-index management for overlays

---

### 6. DynamicShareCard
**Purpose**: Generate shareable social media images

**Props**:
```typescript
interface DynamicShareCardProps {
  roast: Roast;
  username?: string;
  className?: string;
}
```

**Features**:
- 1:1 aspect ratio (Instagram-optimized)
- Brand header with logo
- Heat level indicator
- Large, readable text
- Footer with attribution
- Decorative background effects

**Technical Details**:
- ID attribute for targeting with html2canvas
- CSS gradients for background
- Responsive text sizing
- Export-ready design

---

## State Management

### Zustand Store Structure

```typescript
interface InfernoStore {
  // User Profile
  user: UserProfile;
  setUser: (user: Partial<UserProfile>) => void;
  addXP: (amount: number) => void;
  
  // Roasts
  roasts: Roast[];
  addRoast: (roast: Roast) => void;
  likeRoast: (id: string) => void;
  deleteRoast: (id: string) => void;
  
  // Achievements
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  updateAchievementProgress: (id: string, progress: number) => void;
  
  // App State
  currentHeatLevel: HeatLevel;
  setHeatLevel: (level: HeatLevel) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  
  // Credits
  credits: number;
  useCredit: () => boolean;
  addCredits: (amount: number) => void;
}
```

### Persistence
- Uses `zustand/middleware` persist
- Storage key: `'inferno-storage'`
- Syncs to localStorage automatically
- Rehydrates on app load

---

## AI Integration

### Roast Generation Flow

1. **User Input**: Photo upload or text entry
2. **Heat Level Selection**: Choose intensity
3. **Credit Check**: Verify user has credits (or premium)
4. **API Call**: Send to OpenAI API
5. **Moderation**: Check content safety
6. **Display**: Show roast to user
7. **XP Award**: Add XP based on heat level

### OpenAI API Integration (Production)

```typescript
// Vision API for photo roasts
const response = await openai.chat.completions.create({
  model: 'gpt-4-vision-preview',
  messages: [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Roast this photo:' },
        { type: 'image_url', image_url: { url: base64Image } },
      ],
    },
  ],
  max_tokens: 200,
  temperature: 0.9, // High creativity
});

// Text API for text roasts
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Roast this: ${text}` },
  ],
  max_tokens: 200,
  temperature: 0.9,
});
```

### Prompt Engineering

Each heat level has a specific system prompt:

**Mild**:
```
You are a playful, witty comedian who creates light-hearted roasts.
- Gentle and teasing, never mean-spirited
- Clever wordplay
- Suitable for all audiences
- Under 150 characters
```

**Medium**:
```
You are a sharp-witted stand-up comedian.
- Witty with a bite
- Sarcastic observations
- Pop culture references
- Under 180 characters
```

**Spicy**:
```
You are a savage, no-holds-barred roast master.
- Brutally honest
- Creative comparisons
- Sharp observations
- Under 200 characters
```

**Toxic**:
```
You are an absolutely SAVAGE roast machine.
- Devastatingly sharp
- Multiple layers of insults
- Unforgettable and legendary
- Under 250 characters
- NO hate speech or slurs
```

### Content Moderation

```typescript
// Before displaying roast
const moderationResult = await openai.moderations.create({
  input: roastContent,
});

if (moderationResult.results[0].flagged) {
  // Flag for admin review
  await flagContentForReview(roastContent);
  throw new Error('Content flagged');
}
```

---

## Routing & Navigation

### Route Structure

```typescript
const routes = [
  { path: '/', component: Landing },
  { path: '/dashboard', component: Dashboard },
  { path: '/roast/:id', component: RoastDetail },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/profile', component: Profile },
  { path: '/premium', component: Premium },
  { path: '/admin', component: Admin },
  { path: '*', component: NotFound },
];
```

### React Router Data Mode
```typescript
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Landing /></Layout>,
  },
  // ... more routes
]);

// In App.tsx
<RouterProvider router={router} />
```

### Navigation Guards (Future)
```typescript
// Protect admin route
if (!user.isAdmin && path === '/admin') {
  navigate('/');
}

// Premium-only features
if (!user.isPremium && action === 'customHeat') {
  showPremiumModal();
}
```

---

## Styling & Theming

### Tailwind CSS v4 Configuration

Custom colors defined in `/src/styles/theme.css`:

```css
:root {
  /* Brand Colors */
  --flame-orange: #FF4500;
  --cyan-neon: #00F0FF;
  --toxic-green: #39FF14;
  
  /* Heat Levels */
  --heat-mild: #FFA500;
  --heat-medium: #FF6B35;
  --heat-spicy: #FF4500;
  --heat-toxic: #39FF14;
  
  /* Surfaces */
  --surface: #111111;
  --surface-light: #1a1a1a;
  --glass-bg: rgba(17, 17, 17, 0.7);
}
```

### Glassmorphism Recipe
```css
.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(17, 17, 17, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Glow Effects
```css
/* Heat-based glow */
.heat-glow-spicy {
  box-shadow: 0 0 30px rgba(255, 69, 0, 0.5);
}

.heat-glow-toxic {
  box-shadow: 0 0 30px rgba(57, 255, 20, 0.6);
}
```

---

## Performance

### Optimization Strategies

1. **Code Splitting**: Route-based lazy loading
2. **Image Optimization**: 
   - Max 5MB uploads
   - Compress before upload
   - Use WebP when possible
3. **Animation Performance**:
   - Use `transform` and `opacity` only
   - Enable GPU acceleration
   - Avoid layout thrashing
4. **State Persistence**:
   - Debounce localStorage writes
   - Only persist essential state
5. **Memoization**:
   - `React.memo` for expensive components
   - `useMemo` for computed values
   - `useCallback` for event handlers

### Bundle Size
- Target: < 500KB gzipped
- Tree-shake unused libraries
- Dynamic imports for heavy features

---

## Security

### Content Safety

1. **Input Validation**:
   - File type checking (images only)
   - Size limits (5MB)
   - Sanitize text input

2. **Content Moderation**:
   - OpenAI Moderation API
   - Pattern-based filtering
   - Admin review queue

3. **API Security**:
   - Never expose API keys in frontend
   - Use backend proxy for OpenAI calls
   - Rate limiting per user

4. **Data Privacy**:
   - No PII collection
   - Optional account system
   - User can delete all data

### Environment Variables (Production)
```env
VITE_OPENAI_API_KEY=sk-...
VITE_API_URL=https://api.infernoroasts.app
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
```

---

## Deployment Checklist

- [ ] Set environment variables
- [ ] Configure OpenAI API
- [ ] Set up content moderation
- [ ] Enable analytics
- [ ] Configure CDN for images
- [ ] Set up error tracking (Sentry)
- [ ] Enable rate limiting
- [ ] Configure CORS
- [ ] Set up monitoring
- [ ] Test payment integration (Premium)

---

**Last Updated**: March 24, 2026
**Version**: 1.0.0
**Built with**: Figma Make

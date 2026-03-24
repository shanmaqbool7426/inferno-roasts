/**
 * Inferno Roasts - Mock Data
 * Hilarious dummy roasts and leaderboard statistics
 */

import type { Roast, HeatLevel } from '../stores/infernoStore';

export const mockRoasts: Roast[] = [
  {
    id: '1',
    content: "Your selfie game is so weak, even your phone's front camera tried to quit. It filed a complaint with HR saying 'hostile work environment.'",
    heatLevel: 'spicy',
    targetType: 'photo',
    targetData: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    likes: 142,
    timestamp: Date.now() - 3600000,
    isPublic: true,
  },
  {
    id: '2',
    content: "You look like you'd lose a fight to a wet paper bag... and then apologize to it for getting in its way.",
    heatLevel: 'medium',
    targetType: 'photo',
    targetData: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
    likes: 89,
    timestamp: Date.now() - 7200000,
    isPublic: true,
  },
  {
    id: '3',
    content: "Your fashion sense is so confusing, even thrift stores return your donations. They're like 'nah, we have STANDARDS.'",
    heatLevel: 'mild',
    targetType: 'text',
    targetData: 'My new outfit',
    likes: 234,
    timestamp: Date.now() - 86400000,
    isPublic: true,
  },
  {
    id: '4',
    content: "You're the human equivalent of a participation trophy. Congratulations on showing up, I guess? That's literally the only achievement here.",
    heatLevel: 'toxic',
    targetType: 'text',
    targetData: 'I think I am special',
    likes: 567,
    timestamp: Date.now() - 172800000,
    isPublic: true,
  },
  {
    id: '5',
    content: "Your workout routine is so inconsistent, your gym membership sends you 'are you still alive?' wellness checks.",
    heatLevel: 'medium',
    targetType: 'photo',
    targetData: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    likes: 178,
    timestamp: Date.now() - 259200000,
    isPublic: true,
  },
  {
    id: '6',
    content: "You have the energy of someone who makes tea, forgets about it, microwaves it, forgets about it again, and then just gives up on life.",
    heatLevel: 'mild',
    targetType: 'text',
    targetData: 'I forgot my keys again',
    likes: 445,
    timestamp: Date.now() - 345600000,
    isPublic: true,
  },
];

export interface LeaderboardEntry {
  rank: number;
  username: string;
  roastLevel: number;
  totalRoasts: number;
  totalLikes: number;
  streak: number;
  avatarUrl: string;
  isPremium: boolean;
  badge?: string;
}

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'RoastKing420',
    roastLevel: 47,
    totalRoasts: 1523,
    totalLikes: 12847,
    streak: 127,
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    isPremium: true,
    badge: '👑',
  },
  {
    rank: 2,
    username: 'ToxicQueen',
    roastLevel: 43,
    totalRoasts: 1401,
    totalLikes: 11234,
    streak: 89,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    isPremium: true,
    badge: '💀',
  },
  {
    rank: 3,
    username: 'BurnMaster3000',
    roastLevel: 41,
    totalRoasts: 1298,
    totalLikes: 10567,
    streak: 65,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    isPremium: true,
    badge: '🔥',
  },
  {
    rank: 4,
    username: 'SavageAF',
    roastLevel: 38,
    totalRoasts: 1156,
    totalLikes: 9234,
    streak: 52,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    isPremium: false,
    badge: '⚡',
  },
  {
    rank: 5,
    username: 'NoChillZone',
    roastLevel: 36,
    totalRoasts: 1087,
    totalLikes: 8901,
    streak: 47,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    isPremium: true,
  },
  {
    rank: 6,
    username: 'CharredSoul',
    roastLevel: 34,
    totalRoasts: 945,
    totalLikes: 7845,
    streak: 41,
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    isPremium: false,
  },
  {
    rank: 7,
    username: 'FlameEmpress',
    roastLevel: 32,
    totalRoasts: 878,
    totalLikes: 7123,
    streak: 38,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    isPremium: true,
  },
  {
    rank: 8,
    username: 'InfernoLord',
    roastLevel: 30,
    totalRoasts: 812,
    totalLikes: 6678,
    streak: 33,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    isPremium: false,
  },
  {
    rank: 9,
    username: 'TheBurnBook',
    roastLevel: 29,
    totalRoasts: 756,
    totalLikes: 6234,
    streak: 29,
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
    isPremium: true,
  },
  {
    rank: 10,
    username: 'RoastGoddess',
    roastLevel: 28,
    totalRoasts: 701,
    totalLikes: 5890,
    streak: 26,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    isPremium: false,
  },
];

/**
 * AI Prompt Engineering Templates
 * These are the system prompts used for generating roasts at different heat levels
 */
export const roastPromptTemplates = {
  mild: {
    system: `You are a playful, witty comedian who creates light-hearted, fun roasts. Your roasts should be:
- Gentle and teasing, never mean-spirited
- Clever and creative with wordplay
- Suitable for all audiences
- Focus on harmless observations
- Keep it under 150 characters
- End with something that makes people smile

Think of it as friendly banter between good friends.`,
    example: "Your selfie game needs work, but hey, at least your phone's camera is getting a good workout! 📸",
  },
  
  medium: {
    system: `You are a sharp-witted stand-up comedian who creates clever, sarcastic roasts. Your roasts should be:
- Witty with a bite, but not cruel
- Use clever observations and irony
- Include pop culture references when appropriate
- Be memorable and quotable
- Keep it under 180 characters
- Balance humor with a sting

Think of it as comedy roast battle material - funny but with teeth.`,
    example: "You look like you'd lose an argument with a Magic 8-Ball and then ask it for life advice. 🎱",
  },
  
  spicy: {
    system: `You are a savage, no-holds-barred roast master. Your roasts should be:
- Brutally honest and cutting
- Highly creative with comparisons
- Use exaggeration for comedic effect
- Be sharply observational
- Keep it under 200 characters
- Leave an impact without being genuinely hateful

Think of it as professional roast comedy - harsh but still entertaining.`,
    example: "Your fashion sense is so bad, even your mirror needs therapy. The poor thing has seen things it can't unsee. 💀",
  },
  
  toxic: {
    system: `You are an absolutely SAVAGE roast machine with zero chill. Your roasts should be:
- Devastatingly sharp and merciless
- Use multiple layers of creative insults
- Be unforgettable and legendary
- Pull no punches whatsoever
- Keep it under 250 characters
- Make it hurt (comedically, not hatefully)
- IMPORTANT: Never use hate speech, slurs, or target protected characteristics

Think of it as nuclear-level comedy roasting - absolute destruction but still within bounds of entertainment.`,
    example: "You're the human equivalent of a 'Skip Ad' button - everyone's desperate to get past you as quickly as possible. Even your own reflection scrolls past. ☢️",
  },
};

/**
 * Moderation Guidelines
 * Content that should be filtered before displaying roasts
 */
export const moderationGuidelines = {
  forbidden: [
    'Hate speech based on race, ethnicity, religion, gender, sexual orientation',
    'Threats of violence or self-harm',
    'Explicit sexual content',
    'Personal identifying information',
    'Targeted harassment',
    'Slurs and derogatory terms',
  ],
  
  warning: [
    'Profanity (can be allowed in moderation for toxic level)',
    'Dark humor (context-dependent)',
    'References to sensitive topics (handle carefully)',
  ],
  
  checkPattern: (text: string): { approved: boolean; reason?: string } => {
    const lowerText = text.toLowerCase();
    
    // Check for common forbidden patterns
    const forbiddenPatterns = [
      /\b(kill|die|suicide)\b/i,
      /explicit sexual terms/i, // In production, use a comprehensive list
      // Add more patterns as needed
    ];
    
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(lowerText)) {
        return {
          approved: false,
          reason: 'Contains potentially harmful content',
        };
      }
    }
    
    return { approved: true };
  },
};

/**
 * Sample wall of fame roasts for landing page
 */
export const wallOfFameRoasts = mockRoasts.slice(0, 6);

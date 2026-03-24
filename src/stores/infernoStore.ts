/**
 * Inferno Roasts - Global State Management with Zustand
 * Manages user profile, roast history, achievements, and app state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type HeatLevel = 'mild' | 'medium' | 'spicy' | 'toxic';

export interface Roast {
  id: string;
  content: string;
  heatLevel: HeatLevel;
  targetType: 'photo' | 'text';
  targetData: string; // URL or text content
  likes: number;
  timestamp: number;
  isPublic: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress?: number;
  maxProgress?: number;
}

export interface UserProfile {
  username: string;
  roastLevel: number;
  xp: number;
  streak: number;
  lastRoastDate: number;
  totalRoasts: number;
  isPremium: boolean;
  avatarUrl?: string;
}

interface InfernoStore {
  // User Profile
  user: UserProfile;
  setUser: (user: Partial<UserProfile>) => void;
  addXP: (amount: number) => void;
  
  // Roast History
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
  
  // Credits (for non-premium users)
  credits: number;
  useCredit: () => boolean;
  addCredits: (amount: number) => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-roast',
    name: 'First Burn',
    description: 'Generate your first roast',
    icon: '🔥',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'thick-skinned',
    name: 'Thick-Skinned',
    description: 'Get roasted 10 times',
    icon: '🛡️',
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'charred',
    name: 'Charred',
    description: 'Generate 50 roasts',
    icon: '💀',
    progress: 0,
    maxProgress: 50,
  },
  {
    id: 'toxic-warrior',
    name: 'Toxic Warrior',
    description: 'Generate 10 toxic level roasts',
    icon: '☢️',
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'seven-day-streak',
    name: 'On Fire',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    progress: 0,
    maxProgress: 7,
  },
  {
    id: 'viral-roast',
    name: 'Viral Sensation',
    description: 'Get 100 likes on a single roast',
    icon: '⚡',
    progress: 0,
    maxProgress: 100,
  },
];

export const useInfernoStore = create<InfernoStore>()(
  persist(
    (set, get) => ({
      // Initial User Profile
      user: {
        username: 'RoastMaster',
        roastLevel: 1,
        xp: 0,
        streak: 0,
        lastRoastDate: 0,
        totalRoasts: 0,
        isPremium: false,
      },
      
      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
      
      addXP: (amount) =>
        set((state) => {
          const newXP = state.user.xp + amount;
          const newLevel = Math.floor(newXP / 100) + 1; // 100 XP per level
          return {
            user: {
              ...state.user,
              xp: newXP,
              roastLevel: newLevel,
            },
          };
        }),
      
      // Roast Management
      roasts: [],
      
      addRoast: (roast) =>
        set((state) => {
          // Update streak
          const now = Date.now();
          const lastDate = new Date(state.user.lastRoastDate).toDateString();
          const today = new Date(now).toDateString();
          const yesterday = new Date(now - 86400000).toDateString();
          
          let newStreak = state.user.streak;
          if (lastDate === yesterday) {
            newStreak += 1;
          } else if (lastDate !== today) {
            newStreak = 1;
          }
          
          // Calculate XP based on heat level
          const xpMap: Record<HeatLevel, number> = {
            mild: 10,
            medium: 20,
            spicy: 30,
            toxic: 50,
          };
          
          const xpGained = xpMap[roast.heatLevel];
          const newXP = state.user.xp + xpGained;
          const newLevel = Math.floor(newXP / 100) + 1;
          
          return {
            roasts: [roast, ...state.roasts],
            user: {
              ...state.user,
              xp: newXP,
              roastLevel: newLevel,
              streak: newStreak,
              lastRoastDate: now,
              totalRoasts: state.user.totalRoasts + 1,
            },
          };
        }),
      
      likeRoast: (id) =>
        set((state) => ({
          roasts: state.roasts.map((roast) =>
            roast.id === id ? { ...roast, likes: roast.likes + 1 } : roast
          ),
        })),
      
      deleteRoast: (id) =>
        set((state) => ({
          roasts: state.roasts.filter((roast) => roast.id !== id),
        })),
      
      // Achievements
      achievements: defaultAchievements,
      
      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id
              ? { ...achievement, unlockedAt: Date.now() }
              : achievement
          ),
        })),
      
      updateAchievementProgress: (id, progress) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) => {
            if (achievement.id === id) {
              const newProgress = Math.min(progress, achievement.maxProgress || progress);
              const shouldUnlock =
                !achievement.unlockedAt &&
                achievement.maxProgress &&
                newProgress >= achievement.maxProgress;
              
              return {
                ...achievement,
                progress: newProgress,
                ...(shouldUnlock && { unlockedAt: Date.now() }),
              };
            }
            return achievement;
          }),
        })),
      
      // App State
      currentHeatLevel: 'medium',
      setHeatLevel: (level) => set({ currentHeatLevel: level }),
      
      isGenerating: false,
      setIsGenerating: (generating) => set({ isGenerating: generating }),
      
      // Credits System
      credits: 5, // Free users get 5 credits
      
      useCredit: () => {
        const state = get();
        if (state.user.isPremium) return true; // Premium users have unlimited
        
        if (state.credits > 0) {
          set({ credits: state.credits - 1 });
          return true;
        }
        return false;
      },
      
      addCredits: (amount) =>
        set((state) => ({ credits: state.credits + amount })),
    }),
    {
      name: 'inferno-storage',
    }
  )
);

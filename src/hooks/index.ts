/**
 * Custom React Hooks for Inferno Roasts
 */

import { useEffect } from 'react';
import { useInfernoStore } from '../stores/infernoStore';

/**
 * Hook to check and update achievements
 */
export function useAchievements() {
  const { user, roasts, achievements, updateAchievementProgress, unlockAchievement } = useInfernoStore();
  
  useEffect(() => {
    // Check first roast achievement
    if (user.totalRoasts >= 1) {
      const firstRoast = achievements.find(a => a.id === 'first-roast');
      if (firstRoast && !firstRoast.unlockedAt) {
        updateAchievementProgress('first-roast', 1);
      }
    }
    
    // Check thick-skinned achievement
    const thickSkinned = achievements.find(a => a.id === 'thick-skinned');
    if (thickSkinned && user.totalRoasts >= 10 && !thickSkinned.unlockedAt) {
      updateAchievementProgress('thick-skinned', user.totalRoasts);
    }
    
    // Check charred achievement
    const charred = achievements.find(a => a.id === 'charred');
    if (charred && user.totalRoasts >= 50 && !charred.unlockedAt) {
      updateAchievementProgress('charred', user.totalRoasts);
    }
    
    // Check toxic warrior achievement
    const toxicRoasts = roasts.filter(r => r.heatLevel === 'toxic').length;
    const toxicWarrior = achievements.find(a => a.id === 'toxic-warrior');
    if (toxicWarrior && toxicRoasts >= 10 && !toxicWarrior.unlockedAt) {
      updateAchievementProgress('toxic-warrior', toxicRoasts);
    }
    
    // Check streak achievement
    const streakAchievement = achievements.find(a => a.id === 'seven-day-streak');
    if (streakAchievement && user.streak >= 7 && !streakAchievement.unlockedAt) {
      updateAchievementProgress('seven-day-streak', user.streak);
    }
    
    // Check viral roast achievement
    const viralRoast = roasts.find(r => r.likes >= 100);
    if (viralRoast) {
      const viralAchievement = achievements.find(a => a.id === 'viral-roast');
      if (viralAchievement && !viralAchievement.unlockedAt) {
        updateAchievementProgress('viral-roast', viralRoast.likes);
      }
    }
  }, [user.totalRoasts, user.streak, roasts, achievements, updateAchievementProgress, unlockAchievement]);
}

/**
 * Hook to format and display time
 */
export function useTimeAgo(timestamp: number) {
  const formatTimeAgo = (ts: number): string => {
    const seconds = Math.floor((Date.now() - ts) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };
  
  return formatTimeAgo(timestamp);
}

/**
 * Hook to handle keyboard shortcuts
 */
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K for quick search (future feature)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        console.log('Quick search shortcut');
      }
      
      // Cmd/Ctrl + N for new roast
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault();
        window.location.href = '/dashboard';
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
}

/**
 * Hook to detect mobile device
 */
export function useIsMobile() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return isMobile;
}

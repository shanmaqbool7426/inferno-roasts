/**
 * Inferno Roasts - Utility Functions
 * Helper functions for the application
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { HeatLevel } from '../stores/infernoStore';

/**
 * Tailwind class merge utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get heat level color for UI theming
 */
export function getHeatColor(level: HeatLevel): string {
  const colors: Record<HeatLevel, string> = {
    mild: 'text-heat-mild',
    medium: 'text-heat-medium',
    spicy: 'text-heat-spicy',
    toxic: 'text-heat-toxic',
  };
  return colors[level];
}

/**
 * Get heat level background gradient
 */
export function getHeatGradient(level: HeatLevel): string {
  const gradients: Record<HeatLevel, string> = {
    mild: 'from-orange-500/20 to-yellow-500/20',
    medium: 'from-orange-600/20 to-red-500/20',
    spicy: 'from-red-600/20 to-orange-500/20',
    toxic: 'from-toxic-green/20 to-cyan-neon/20',
  };
  return gradients[level];
}

/**
 * Get heat level glow effect
 */
export function getHeatGlow(level: HeatLevel): string {
  const glows: Record<HeatLevel, string> = {
    mild: 'shadow-[0_0_20px_rgba(255,165,0,0.3)]',
    medium: 'shadow-[0_0_20px_rgba(255,107,53,0.4)]',
    spicy: 'shadow-[0_0_20px_rgba(255,69,0,0.5)]',
    toxic: 'shadow-[0_0_30px_rgba(57,255,20,0.6)]',
  };
  return glows[level];
}

/**
 * Format timestamp to relative time
 */
export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}

/**
 * Calculate XP required for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  return currentLevel * 100;
}

/**
 * Calculate XP progress percentage
 */
export function getXPProgress(currentXP: number, currentLevel: number): number {
  const baseXP = (currentLevel - 1) * 100;
  const levelXP = currentXP - baseXP;
  const requiredXP = 100;
  return Math.min((levelXP / requiredXP) * 100, 100);
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Download text as image (for share cards)
 * This would integrate with html2canvas or similar in production
 */
export function downloadAsImage(elementId: string, filename: string): void {
  // In a real implementation, you'd use html2canvas or similar
  console.log(`Downloading ${elementId} as ${filename}`);
  // For now, this is a placeholder that shows the concept
}

/**
 * Share via Web Share API
 */
export async function shareContent(data: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }
  
  try {
    await navigator.share(data);
    return true;
  } catch (err) {
    if ((err as Error).name !== 'AbortError') {
      console.error('Share failed:', err);
    }
    return false;
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a JPG, PNG, or WebP image',
    };
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image must be less than 5MB',
    };
  }
  
  return { valid: true };
}

/**
 * Convert file to base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Get heat level emoji
 */
export function getHeatEmoji(level: HeatLevel): string {
  const emojis: Record<HeatLevel, string> = {
    mild: '🌶️',
    medium: '🔥',
    spicy: '💀',
    toxic: '☢️',
  };
  return emojis[level];
}

/**
 * Get heat level label
 */
export function getHeatLabel(level: HeatLevel): string {
  const labels: Record<HeatLevel, string> = {
    mild: 'Mild Roast',
    medium: 'Medium Burn',
    spicy: 'Spicy Savage',
    toxic: 'TOXIC DESTRUCTION',
  };
  return labels[level];
}

/**
 * Simulate AI roast generation
 * In production, this would call OpenAI API
 */
export async function generateRoast(
  targetType: 'photo' | 'text',
  targetData: string,
  heatLevel: HeatLevel
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Mock responses based on heat level
  const mockResponses: Record<HeatLevel, string[]> = {
    mild: [
      "Your vibe is giving 'I peaked in high school' energy, but in the most wholesome way possible! 😊",
      "You look like you'd apologize to a chair after bumping into it. Adorable, really. 🪑",
      "Your aesthetic screams 'I tried,' and honestly? We respect the effort. Keep going! ✨",
    ],
    medium: [
      "You're giving strong 'main character in a movie nobody asked for' vibes. 🎬",
      "If confidence was a currency, you'd be living paycheck to paycheck, my friend. 💸",
      "You look like you'd lose an argument with a houseplant and then water it as an apology. 🌱",
    ],
    spicy: [
      "Your personality is duller than a butter knife at a sword fight. Actually, the butter knife would win. 🗡️",
      "You're the human version of a participation trophy. Congrats on existing, I guess? 🏆",
      "If mediocrity was a person, it would look at you and say 'aim higher.' 💀",
    ],
    toxic: [
      "You're proof that evolution can go in reverse. Scientists are currently studying your DNA as a case study in 'what not to do.' 🧬☢️",
      "Your existence is like a software bug that nobody can fix because the original developer quit in disgust. Even the error log is embarrassed. 💻",
      "If there was an award for disappointing absolutely everyone who's ever met you, you'd somehow find a way to disappoint the committee too. 🏆☢️",
    ],
  };
  
  const responses = mockResponses[heatLevel];
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Format large numbers (e.g., 1234 -> 1.2K)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

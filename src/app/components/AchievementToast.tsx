/**
 * AchievementToast Component
 * Animated badges that appear when user unlocks achievements
 */

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Achievement } from '../../stores/infernoStore';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
  duration?: number;
}

export function AchievementToast({
  achievement,
  onClose,
  duration = 5000,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          className={cn(
            'fixed top-4 right-4 z-50',
            'w-80 max-w-[calc(100vw-2rem)]'
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden',
              'backdrop-blur-xl bg-glass-bg',
              'border-2 border-toxic-green rounded-2xl',
              'shadow-[0_0_30px_rgba(57,255,20,0.4)]',
              'p-4'
            )}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-toxic-green rounded-full"
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: '100%',
                    opacity: 0.8,
                  }}
                  animate={{
                    y: '-20%',
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-toxic-green" />
                  <span className="text-sm font-orbitron text-toxic-green">
                    ACHIEVEMENT UNLOCKED!
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Achievement details */}
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="text-5xl"
                >
                  {achievement.icon}
                </motion.div>
                
                <div className="flex-1">
                  <h4 className="font-orbitron font-bold text-lg mb-1">
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  
                  {/* Progress bar if applicable */}
                  {achievement.maxProgress && achievement.progress !== undefined && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (achievement.progress / achievement.maxProgress) * 100
                            }%`,
                          }}
                          className="h-full bg-gradient-to-r from-toxic-green to-cyan-neon"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>
                          {achievement.progress} / {achievement.maxProgress}
                        </span>
                        <span>
                          {Math.round(
                            (achievement.progress / achievement.maxProgress) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(57,255,20,0.4)',
                  '0 0 40px rgba(57,255,20,0.6)',
                  '0 0 20px rgba(57,255,20,0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

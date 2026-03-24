/**
 * BurnAnimation Component
 * Fire transition effect displayed during roast generation
 */

import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BurnAnimationProps {
  message?: string;
  className?: string;
}

export function BurnAnimation({
  message = 'Generating your roast...',
  className,
}: BurnAnimationProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'bg-background/95 backdrop-blur-xl',
        'flex items-center justify-center',
        className
      )}
    >
      <div className="text-center space-y-8">
        {/* Animated flames */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Center flame */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Flame className="w-32 h-32 text-flame-orange drop-shadow-[0_0_30px_rgba(255,69,0,0.8)]" />
          </motion.div>
          
          {/* Left flame */}
          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
              x: [-20, -25, -20],
              rotate: [-15, -20, -15],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Flame className="w-24 h-24 text-flame-orange-light drop-shadow-[0_0_20px_rgba(255,107,53,0.6)]" />
          </motion.div>
          
          {/* Right flame */}
          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
              x: [20, 25, 20],
              rotate: [15, 20, 15],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Flame className="w-24 h-24 text-flame-orange-light drop-shadow-[0_0_20px_rgba(255,107,53,0.6)]" />
          </motion.div>
          
          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-flame-orange rounded-full blur-[60px]"
          />
        </div>
        
        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-orbitron font-bold text-2xl mb-2">{message}</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <span>🔥</span>
            <span>Heating up the AI</span>
            <span>🔥</span>
          </motion.div>
        </motion.div>
        
        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-flame-orange rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

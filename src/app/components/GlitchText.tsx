/**
 * GlitchText Component
 * Special text effect for toxic-level roasts with cyberpunk glitch animation
 */

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchText({ 
  children, 
  className, 
  intensity = 'medium' 
}: GlitchTextProps) {
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, intensity === 'high' ? 2000 : intensity === 'medium' ? 3000 : 5000);
    
    return () => clearInterval(glitchInterval);
  }, [intensity]);
  
  return (
    <div className={cn('relative inline-block', className)}>
      {/* Main text */}
      <motion.span
        className="relative z-10 inline-block"
        animate={
          glitchActive
            ? {
                x: [0, -2, 2, -1, 1, 0],
                textShadow: [
                  '0 0 0px transparent',
                  '2px 0 0px #00F0FF, -2px 0 0px #FF4500',
                  '-2px 0 0px #00F0FF, 2px 0 0px #39FF14',
                  '0 0 0px transparent',
                ],
              }
            : {}
        }
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Glitch layers */}
      {glitchActive && (
        <>
          <span
            className={cn(
              'absolute top-0 left-0 text-cyan-neon opacity-70',
              'pointer-events-none'
            )}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translateX(-2px)',
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className={cn(
              'absolute top-0 left-0 text-flame-orange opacity-70',
              'pointer-events-none'
            )}
            style={{
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translateX(2px)',
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className={cn(
              'absolute top-0 left-0 text-toxic-green opacity-60',
              'pointer-events-none'
            )}
            style={{
              clipPath: 'polygon(0 20%, 100% 20%, 100% 80%, 0 80%)',
              transform: 'translateY(1px)',
            }}
            aria-hidden="true"
          >
            {children}
          </span>
        </>
      )}
    </div>
  );
}

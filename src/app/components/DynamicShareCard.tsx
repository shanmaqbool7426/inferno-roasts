/**
 * DynamicShareCard Component
 * Generates shareable image cards for social media
 * Can be exported as PNG for Instagram/Twitter
 */

import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import { cn, getHeatColor, getHeatEmoji } from '../../lib/utils';
import type { Roast } from '../../stores/infernoStore';

interface DynamicShareCardProps {
  roast: Roast;
  username?: string;
  className?: string;
}

export function DynamicShareCard({
  roast,
  username = 'Anonymous',
  className,
}: DynamicShareCardProps) {
  return (
    <div
      id={`share-card-${roast.id}`}
      className={cn(
        'relative w-full aspect-square max-w-[1080px]',
        'bg-gradient-to-br from-background via-surface to-surface-light',
        'p-12 flex flex-col justify-between',
        'overflow-hidden',
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 69, 0, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Brand header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-flame-orange to-toxic-green flex items-center justify-center">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="font-orbitron font-bold text-2xl">INFERNO</p>
            <p className="text-sm text-muted-foreground">ROASTS</p>
          </div>
        </div>
        
        {/* Heat indicator */}
        <div className={cn(
          'px-6 py-3 rounded-xl',
          'border-2',
          'backdrop-blur-xl bg-glass-bg',
          getHeatColor(roast.heatLevel),
          'border-current',
          'flex items-center gap-2'
        )}>
          <span className="text-3xl">{getHeatEmoji(roast.heatLevel)}</span>
          <span className="font-orbitron font-bold text-xl uppercase">
            {roast.heatLevel}
          </span>
        </div>
      </div>
      
      {/* Roast content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight"
        >
          "{roast.content}"
        </motion.p>
      </div>
      
      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between text-muted-foreground">
        <p className="text-xl">
          Roasted by <span className="text-foreground font-bold">{username}</span>
        </p>
        <p className="text-xl font-orbitron">
          infernoroasts.app
        </p>
      </div>
      
      {/* Decorative glow */}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2',
          'w-[600px] h-[600px]',
          'rounded-full blur-[150px]',
          'pointer-events-none'
        )}
        style={{
          background: roast.heatLevel === 'toxic'
            ? 'radial-gradient(circle, rgba(57,255,20,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,69,0,0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

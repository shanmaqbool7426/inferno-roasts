/**
 * HeatSelector Component
 * Custom slider for selecting roast intensity with dynamic glow effects
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Skull, Zap, Leaf } from 'lucide-react';
import { cn, getHeatColor, getHeatGlow, getHeatLabel } from '../../lib/utils';
import type { HeatLevel } from '../../stores/infernoStore';

interface HeatSelectorProps {
  value: HeatLevel;
  onChange: (level: HeatLevel) => void;
  disabled?: boolean;
}

const heatLevels: Array<{
  value: HeatLevel;
  label: string;
  icon: typeof Flame;
  position: number;
}> = [
  { value: 'mild', label: 'Mild', icon: Leaf, position: 0 },
  { value: 'medium', label: 'Medium', icon: Flame, position: 33.33 },
  { value: 'spicy', label: 'Spicy', icon: Zap, position: 66.66 },
  { value: 'toxic', label: 'TOXIC', icon: Skull, position: 100 },
];

export function HeatSelector({ value, onChange, disabled }: HeatSelectorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const currentLevel = heatLevels.find((l) => l.value === value) || heatLevels[1];
  
  const getBackgroundGradient = () => {
    const gradients: Record<HeatLevel, string> = {
      mild: 'linear-gradient(90deg, #FFA500 0%, #FF8C00 100%)',
      medium: 'linear-gradient(90deg, #FF6B35 0%, #FF4500 100%)',
      spicy: 'linear-gradient(90deg, #FF4500 0%, #CC3700 100%)',
      toxic: 'linear-gradient(90deg, #39FF14 0%, #00F0FF 100%)',
    };
    return gradients[value];
  };
  
  return (
    <div className="w-full space-y-4">
      {/* Label */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Heat Level</span>
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            'font-orbitron font-bold text-lg',
            getHeatColor(value),
            getHeatGlow(value)
          )}
        >
          {getHeatLabel(value)}
        </motion.span>
      </div>
      
      {/* Slider Track */}
      <div className="relative">
        <div
          className={cn(
            'h-3 rounded-full bg-surface-light border border-glass-border',
            'relative overflow-hidden'
          )}
        >
          {/* Progress fill */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: getBackgroundGradient(),
              width: `${currentLevel.position}%`,
            }}
            animate={{
              boxShadow: isDragging
                ? `0 0 30px ${value === 'toxic' ? '#39FF14' : '#FF4500'}`
                : `0 0 15px ${value === 'toxic' ? '#39FF14' : '#FF4500'}`,
            }}
          />
        </div>
        
        {/* Heat level markers */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {heatLevels.map((level) => {
            const Icon = level.icon;
            const isActive = level.value === value;
            
            return (
              <button
                key={level.value}
                onClick={() => !disabled && onChange(level.value)}
                disabled={disabled}
                className={cn(
                  'relative z-10 group',
                  'transition-all duration-200',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
                onMouseEnter={() => !disabled && setIsDragging(true)}
                onMouseLeave={() => setIsDragging(false)}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    rotate: isActive ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{
                    scale: { duration: 0.2 },
                    rotate: { duration: 0.6, repeat: isActive ? Infinity : 0 },
                  }}
                  className={cn(
                    'w-8 h-8 rounded-full',
                    'flex items-center justify-center',
                    'border-2 transition-all duration-200',
                    isActive
                      ? cn(
                          'bg-surface border-current',
                          getHeatColor(level.value),
                          getHeatGlow(level.value)
                        )
                      : 'bg-surface-light border-glass-border text-muted-foreground',
                    'hover:scale-110'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                
                {/* Tooltip */}
                <div
                  className={cn(
                    'absolute bottom-full mb-2 left-1/2 -translate-x-1/2',
                    'opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-200',
                    'pointer-events-none'
                  )}
                >
                  <div className="bg-surface border border-glass-border rounded-lg px-3 py-1.5 text-xs whitespace-nowrap backdrop-blur-xl">
                    {level.label}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5">
                    <div className="w-2 h-2 bg-surface border-l border-b border-glass-border rotate-45" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Description */}
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-center text-muted-foreground"
      >
        {value === 'mild' &&
          'Light-hearted fun • Perfect for sensitive souls'}
        {value === 'medium' &&
          'Sharp wit with a bite • Comedy roast material'}
        {value === 'spicy' &&
          'Brutally honest • No holds barred'}
        {value === 'toxic' &&
          '☢️ ABSOLUTE DESTRUCTION • For those who can handle it'}
      </motion.p>
    </div>
  );
}

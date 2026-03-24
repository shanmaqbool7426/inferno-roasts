/**
 * Navigation Component
 * Mobile-first navigation with glassmorphic design
 */

import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import {
  Flame,
  Trophy,
  User,
  Crown,
  Shield,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useInfernoStore } from '../../stores/infernoStore';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Oven', icon: Flame },
  { path: '/leaderboard', label: 'Burn Ward', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/premium', label: 'Fireproof', icon: Crown },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, credits } = useInfernoStore();
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-glass-bg border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-flame-orange to-toxic-green flex items-center justify-center"
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>
              <span className="font-orbitron font-bold text-xl bg-gradient-to-r from-flame-orange via-toxic-green to-cyan-neon bg-clip-text text-transparent">
                INFERNO ROASTS
              </span>
            </Link>
            
            {/* Nav items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'relative px-4 py-2 rounded-lg',
                      'flex items-center gap-2',
                      'transition-all duration-200',
                      'group',
                      isActive
                        ? 'text-flame-orange'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-light'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-flame-orange/10 rounded-lg border border-flame-orange/30"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            
            {/* User info */}
            <div className="flex items-center gap-4">
              {!user.isPremium && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-light rounded-lg border border-glass-border">
                  <Flame className="w-4 h-4 text-flame-orange" />
                  <span className="text-sm">{credits} credits</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-light rounded-lg border border-glass-border">
                <span className="text-sm text-muted-foreground">Level</span>
                <span className="font-orbitron font-bold text-flame-orange">
                  {user.roastLevel}
                </span>
                {user.isPremium && (
                  <Crown className="w-4 h-4 text-toxic-green" />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-glass-bg border-t border-glass-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl',
                  'transition-all duration-200',
                  isActive
                    ? 'text-flame-orange'
                    : 'text-muted-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 bg-flame-orange/10 rounded-xl border border-flame-orange/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={cn('w-5 h-5 relative z-10')} />
                <span className="text-xs relative z-10">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">More</span>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col h-full p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-flame-orange to-toxic-green flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <span className="font-orbitron font-bold text-xl">INFERNO</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* User stats */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-surface-light rounded-xl p-4 border border-glass-border">
                <div className="text-2xl font-orbitron font-bold text-flame-orange mb-1">
                  {user.roastLevel}
                </div>
                <div className="text-xs text-muted-foreground">Roast Level</div>
              </div>
              
              <div className="bg-surface-light rounded-xl p-4 border border-glass-border">
                <div className="text-2xl font-orbitron font-bold text-cyan-neon mb-1">
                  {user.streak}
                </div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              
              <div className="bg-surface-light rounded-xl p-4 border border-glass-border">
                <div className="text-2xl font-orbitron font-bold text-toxic-green mb-1">
                  {user.totalRoasts}
                </div>
                <div className="text-xs text-muted-foreground">Total Roasts</div>
              </div>
              
              <div className="bg-surface-light rounded-xl p-4 border border-glass-border">
                <div className="text-2xl font-orbitron font-bold text-flame-orange mb-1">
                  {user.isPremium ? '∞' : credits}
                </div>
                <div className="text-xs text-muted-foreground">Credits Left</div>
              </div>
            </div>
            
            {/* All menu items */}
            <div className="space-y-2 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3 rounded-xl',
                      'transition-all duration-200',
                      isActive
                        ? 'bg-flame-orange/10 text-flame-orange border border-flame-orange/30'
                        : 'text-muted-foreground hover:bg-surface-light'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Spacer for fixed nav */}
      <div className="h-16 hidden md:block" />
      <div className="h-20 md:hidden" />
    </>
  );
}

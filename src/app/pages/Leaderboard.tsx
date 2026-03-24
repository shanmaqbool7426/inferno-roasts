/**
 * Leaderboard Page - "The Burn Ward"
 * Weekly rankings of top roasters
 */

import { motion } from 'motion/react';
import { Trophy, Crown, Flame, Zap, TrendingUp } from 'lucide-react';
import { mockLeaderboard } from '../../lib/mockData';
import { cn, formatNumber } from '../../lib/utils';
import { useInfernoStore } from '../../stores/infernoStore';

export function Leaderboard() {
  const { user } = useInfernoStore();
  
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-flame-orange to-toxic-green bg-clip-text text-transparent">
              THE BURN WARD
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Top roasters of the week. Think you can compete?
          </p>
        </motion.div>
        
        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {/* 2nd Place */}
          <div className="col-span-1 pt-8">
            <div className="backdrop-blur-xl bg-glass-bg border-2 border-cyan-neon/30 rounded-2xl p-4 text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-4 border-cyan-neon/50">
                <img
                  src={mockLeaderboard[1].avatarUrl}
                  alt={mockLeaderboard[1].username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-4xl mb-2">🥈</div>
              <p className="font-orbitron font-bold truncate">
                {mockLeaderboard[1].username}
              </p>
              <p className="text-2xl font-bold text-cyan-neon mb-1">
                {mockLeaderboard[1].roastLevel}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatNumber(mockLeaderboard[1].totalLikes)} likes
              </p>
            </div>
          </div>
          
          {/* 1st Place */}
          <div className="col-span-1">
            <div className="backdrop-blur-xl bg-glass-bg border-2 border-flame-orange rounded-2xl p-4 text-center shadow-[0_0_30px_rgba(255,69,0,0.4)]">
              <Crown className="w-8 h-8 text-flame-orange mx-auto mb-2" />
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-4 border-flame-orange">
                <img
                  src={mockLeaderboard[0].avatarUrl}
                  alt={mockLeaderboard[0].username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-5xl mb-2">👑</div>
              <p className="font-orbitron font-bold text-lg truncate">
                {mockLeaderboard[0].username}
              </p>
              <p className="text-3xl font-bold text-flame-orange mb-1">
                {mockLeaderboard[0].roastLevel}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatNumber(mockLeaderboard[0].totalLikes)} likes
              </p>
            </div>
          </div>
          
          {/* 3rd Place */}
          <div className="col-span-1 pt-8">
            <div className="backdrop-blur-xl bg-glass-bg border-2 border-toxic-green/30 rounded-2xl p-4 text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-4 border-toxic-green/50">
                <img
                  src={mockLeaderboard[2].avatarUrl}
                  alt={mockLeaderboard[2].username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-4xl mb-2">🥉</div>
              <p className="font-orbitron font-bold truncate">
                {mockLeaderboard[2].username}
              </p>
              <p className="text-2xl font-bold text-toxic-green mb-1">
                {mockLeaderboard[2].roastLevel}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatNumber(mockLeaderboard[2].totalLikes)} likes
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Rest of leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {mockLeaderboard.slice(3).map((entry, index) => (
            <div
              key={entry.rank}
              className={cn(
                'backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-4',
                'flex items-center gap-4',
                'hover:border-flame-orange/30 transition-all duration-200'
              )}
            >
              {/* Rank */}
              <div className="w-8 text-center">
                <span className="font-orbitron font-bold text-xl text-muted-foreground">
                  {entry.rank}
                </span>
              </div>
              
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-glass-border">
                <img
                  src={entry.avatarUrl}
                  alt={entry.username}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold">{entry.username}</p>
                  {entry.badge && <span>{entry.badge}</span>}
                  {entry.isPremium && <Crown className="w-4 h-4 text-toxic-green" />}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {entry.totalRoasts} roasts
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {entry.streak} day streak
                  </span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="text-right">
                <p className="font-orbitron font-bold text-xl text-flame-orange">
                  {entry.roastLevel}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(entry.totalLikes)} likes
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Current user position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 backdrop-blur-xl bg-gradient-to-r from-flame-orange/10 to-toxic-green/10 border-2 border-flame-orange/50 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-flame-orange" />
              <p className="font-medium">Your Rank: <span className="font-orbitron font-bold text-flame-orange">Not ranked yet</span></p>
            </div>
            <p className="text-sm text-muted-foreground">
              Level {user.roastLevel} • {user.totalRoasts} roasts
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

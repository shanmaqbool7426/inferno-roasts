/**
 * Profile Page
 * User profile with XP, achievements, and roast history
 */

import { motion } from 'motion/react';
import { Flame, Trophy, Zap, Calendar, Crown, Edit } from 'lucide-react';
import { useInfernoStore } from '../../stores/infernoStore';
import { cn, getXPProgress, getXPForNextLevel } from '../../lib/utils';

export function Profile() {
  const { user, achievements, roasts } = useInfernoStore();
  
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);
  const xpProgress = getXPProgress(user.xp, user.roastLevel);
  const xpForNext = getXPForNextLevel(user.roastLevel);
  
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-flame-orange to-toxic-green p-1">
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-6xl">
                  🔥
                </div>
              </div>
              {user.isPremium && (
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-toxic-green rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.6)]">
                  <Crown className="w-6 h-6 text-black" />
                </div>
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="font-orbitron font-bold text-3xl">{user.username}</h1>
                <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-muted-foreground mb-4">
                {user.isPremium ? '👑 Premium Member' : '🔥 Free Member'}
              </p>
              
              {/* XP Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-orbitron text-flame-orange">Level {user.roastLevel}</span>
                  <span className="text-muted-foreground">{user.xp} / {xpForNext} XP</span>
                </div>
                <div className="h-3 bg-surface-light rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    className="h-full bg-gradient-to-r from-flame-orange to-toxic-green shadow-[0_0_15px_rgba(255,69,0,0.6)]"
                  />
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-light rounded-xl p-4 text-center border border-glass-border">
                <p className="text-3xl font-orbitron font-bold text-flame-orange mb-1">
                  {user.totalRoasts}
                </p>
                <p className="text-xs text-muted-foreground">Total Roasts</p>
              </div>
              <div className="bg-surface-light rounded-xl p-4 text-center border border-glass-border">
                <p className="text-3xl font-orbitron font-bold text-cyan-neon mb-1">
                  {user.streak}
                </p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-orbitron font-bold text-2xl mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-flame-orange" />
            Achievements
          </h2>
          
          {/* Unlocked */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">
                Unlocked ({unlockedAchievements.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {unlockedAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="backdrop-blur-xl bg-glass-bg border-2 border-toxic-green rounded-xl p-4 text-center"
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <p className="font-bold mb-1">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Locked */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Locked ({lockedAchievements.length})
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {lockedAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-4 text-center opacity-60"
                >
                  <div className="text-4xl mb-2 grayscale">{achievement.icon}</div>
                  <p className="font-bold mb-1">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                  {achievement.maxProgress && (
                    <div>
                      <div className="h-1.5 bg-surface-light rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-muted-foreground"
                          style={{
                            width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {achievement.progress} / {achievement.maxProgress}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-orbitron font-bold text-2xl mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-neon" />
            Statistics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-6">
              <Flame className="w-8 h-8 text-flame-orange mb-3" />
              <p className="text-3xl font-orbitron font-bold mb-1">{roasts.length}</p>
              <p className="text-sm text-muted-foreground">Roasts Generated</p>
            </div>
            
            <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-6">
              <Trophy className="w-8 h-8 text-cyan-neon mb-3" />
              <p className="text-3xl font-orbitron font-bold mb-1">
                {roasts.reduce((sum, r) => sum + r.likes, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </div>
            
            <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-6">
              <Calendar className="w-8 h-8 text-toxic-green mb-3" />
              <p className="text-3xl font-orbitron font-bold mb-1">{user.streak}</p>
              <p className="text-sm text-muted-foreground">Current Streak</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

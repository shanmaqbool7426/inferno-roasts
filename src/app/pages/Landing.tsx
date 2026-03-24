/**
 * Landing Page
 * High-conversion landing page with hero section, wall of fame, and CTA
 */

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Flame, Zap, Shield, Crown, ArrowRight, Sparkles } from 'lucide-react';
import { RoastCard } from '../components/RoastCard';
import { GlitchText } from '../components/GlitchText';
import { wallOfFameRoasts } from '../../lib/mockData';
import { cn } from '../../lib/utils';

export function Landing() {
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255, 69, 0, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(57, 255, 20, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(0, 240, 255, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255, 69, 0, 0.15) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light border border-glass-border"
            >
              <Sparkles className="w-4 h-4 text-toxic-green" />
              <span className="text-sm">AI-Powered Roast Generator</span>
            </motion.div>
            
            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="font-orbitron font-bold text-5xl md:text-7xl lg:text-8xl mb-6">
                <span className="bg-gradient-to-r from-flame-orange via-toxic-green to-cyan-neon bg-clip-text text-transparent">
                  GET ROASTED
                </span>
                <br />
                <GlitchText intensity="low">
                  <span className="text-4xl md:text-6xl lg:text-7xl">
                    BY AI
                  </span>
                </GlitchText>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Upload a photo or enter text. Choose your heat level. 
                Watch the AI absolutely destroy you. Share the burn. 🔥
              </p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'group relative px-8 py-4 rounded-xl',
                    'bg-gradient-to-r from-flame-orange to-flame-orange-light',
                    'text-white font-bold text-lg',
                    'shadow-[0_0_30px_rgba(255,69,0,0.5)]',
                    'hover:shadow-[0_0_50px_rgba(255,69,0,0.7)]',
                    'transition-all duration-300',
                    'flex items-center gap-2'
                  )}
                >
                  <Flame className="w-5 h-5" />
                  START ROASTING
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link to="/premium">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'px-8 py-4 rounded-xl',
                    'backdrop-blur-xl bg-glass-bg',
                    'border-2 border-toxic-green',
                    'text-toxic-green font-bold text-lg',
                    'hover:bg-toxic-green/10',
                    'transition-all duration-300',
                    'flex items-center gap-2'
                  )}
                >
                  <Crown className="w-5 h-5" />
                  GO PREMIUM
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-flame-orange to-flame-orange-light flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-orbitron font-bold text-xl">4 Heat Levels</h3>
            <p className="text-muted-foreground">
              From mild banter to toxic destruction. Choose your pain level carefully.
            </p>
          </div>
          
          <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-neon to-cyan-glow flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-orbitron font-bold text-xl">AI-Powered</h3>
            <p className="text-muted-foreground">
              Advanced AI trained on savage comedy. It sees everything. It roasts everything.
            </p>
          </div>
          
          <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-toxic-green to-toxic-green-bright flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-orbitron font-bold text-xl">Shareable</h3>
            <p className="text-muted-foreground">
              Download as image, copy link, share everywhere. Make your roasts go viral.
            </p>
          </div>
        </motion.div>
      </section>
      
      {/* Wall of Fame */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-flame-orange to-toxic-green bg-clip-text text-transparent">
              WALL OF FAME
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            The most legendary burns in Inferno history
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallOfFameRoasts.map((roast, index) => (
            <motion.div
              key={roast.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <RoastCard roast={roast} showActions={false} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-6 py-3 rounded-xl',
                'backdrop-blur-xl bg-glass-bg',
                'border border-glass-border',
                'hover:border-flame-orange/30',
                'transition-all duration-300'
              )}
            >
              View Full Leaderboard →
            </motion.button>
          </Link>
        </motion.div>
      </section>
      
      {/* Final CTA */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={cn(
            'backdrop-blur-xl bg-glass-bg',
            'border-2 border-flame-orange',
            'rounded-3xl p-8 md:p-12',
            'text-center space-y-6',
            'shadow-[0_0_50px_rgba(255,69,0,0.3)]'
          )}
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl">
            Ready to get absolutely{' '}
            <span className="text-flame-orange">destroyed?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of brave souls who've faced the Inferno.
            Warning: May cause laughter, tears, and existential crises.
          </p>
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-8 py-4 rounded-xl',
                'bg-gradient-to-r from-flame-orange to-flame-orange-light',
                'text-white font-bold text-lg',
                'shadow-[0_0_30px_rgba(255,69,0,0.5)]',
                'hover:shadow-[0_0_50px_rgba(255,69,0,0.7)]',
                'transition-all duration-300'
              )}
            >
              BRING THE HEAT 🔥
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

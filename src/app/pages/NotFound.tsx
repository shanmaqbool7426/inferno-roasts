/**
 * NotFound Page - 404
 * Custom 404 error page
 */

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Flame, Home } from 'lucide-react';
import { GlitchText } from '../components/GlitchText';
import { cn } from '../../lib/utils';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pb-20 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* 404 */}
          <div>
            <GlitchText intensity="high">
              <h1 className="font-orbitron font-bold text-9xl bg-gradient-to-r from-flame-orange via-toxic-green to-cyan-neon bg-clip-text text-transparent">
                404
              </h1>
            </GlitchText>
          </div>
          
          {/* Icon */}
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Flame className="w-24 h-24 mx-auto text-flame-orange" />
          </motion.div>
          
          {/* Message */}
          <div className="space-y-4">
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl">
              Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground">
              Looks like this page got roasted so hard it disappeared. 
              Even we can't find it anymore. 🔥
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex items-center justify-center gap-2 px-8 py-4 rounded-xl',
                  'bg-gradient-to-r from-flame-orange to-flame-orange-light',
                  'text-white font-bold',
                  'shadow-[0_0_30px_rgba(255,69,0,0.5)]',
                  'hover:shadow-[0_0_50px_rgba(255,69,0,0.7)]',
                  'transition-all duration-300'
                )}
              >
                <Home className="w-5 h-5" />
                Go Home
              </motion.button>
            </Link>
            
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex items-center justify-center gap-2 px-8 py-4 rounded-xl',
                  'backdrop-blur-xl bg-glass-bg',
                  'border-2 border-toxic-green',
                  'text-toxic-green font-bold',
                  'hover:bg-toxic-green/10',
                  'transition-all duration-300'
                )}
              >
                <Flame className="w-5 h-5" />
                Start Roasting
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

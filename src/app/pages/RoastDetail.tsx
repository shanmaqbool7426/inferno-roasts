/**
 * RoastDetail Page
 * Individual shareable roast page with Open Graph support
 */

import { motion } from 'motion/react';
import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { RoastCard } from '../components/RoastCard';
import { mockRoasts } from '../../lib/mockData';
import { useInfernoStore } from '../../stores/infernoStore';

export function RoastDetail() {
  const { id } = useParams<{ id: string }>();
  const { roasts, likeRoast } = useInfernoStore();
  
  // Check user roasts first, then mock roasts
  const allRoasts = [...roasts, ...mockRoasts];
  const roast = allRoasts.find(r => r.id === id);
  
  if (!roast) {
    return (
      <div className="min-h-screen pb-20 md:pb-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-4xl">🔥</p>
          <h2 className="font-orbitron font-bold text-2xl">Roast Not Found</h2>
          <p className="text-muted-foreground">This roast has been extinguished.</p>
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-flame-orange text-white font-bold"
            >
              Generate New Roast
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </motion.button>
        </Link>
        
        {/* Roast card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <RoastCard
            roast={roast}
            onLike={() => likeRoast(roast.id)}
            showActions={true}
          />
        </motion.div>
        
        {/* Share prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-8"
        >
          <h3 className="font-orbitron font-bold text-xl mb-2">
            Share this legendary burn!
          </h3>
          <p className="text-muted-foreground mb-6">
            Let the world witness this roast. Make it viral. 🔥
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 rounded-xl bg-surface-light border border-glass-border hover:border-flame-orange/30 transition-all">
              Copy Link
            </button>
            <button className="px-6 py-3 rounded-xl bg-surface-light border border-glass-border hover:border-flame-orange/30 transition-all">
              Download Image
            </button>
            <button className="px-6 py-3 rounded-xl bg-flame-orange text-white font-bold">
              Share Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

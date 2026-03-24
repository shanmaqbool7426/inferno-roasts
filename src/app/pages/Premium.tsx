/**
 * Premium Page - "Fireproof Pass"
 * Premium subscription page with pricing and features
 */

import { motion } from 'motion/react';
import { Check, Crown, Flame, Zap, Shield, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '../../lib/utils';
import { GlitchText } from '../components/GlitchText';
import { useInfernoStore } from '../../stores/infernoStore';
import { toast } from 'sonner';

const features = [
  { icon: Flame, text: 'Unlimited Roast Generation', free: '5 per day', premium: true },
  { icon: Zap, text: 'Priority AI Processing', free: false, premium: true },
  { icon: Shield, text: 'Ad-Free Experience', free: false, premium: true },
  { icon: Crown, text: 'Exclusive Premium Badge', free: false, premium: true },
  { icon: Sparkles, text: 'Early Access to New Features', free: false, premium: true },
  { icon: Flame, text: 'Custom Heat Level Presets', free: false, premium: true },
];

export function Premium() {
  const { user, setUser } = useInfernoStore();
  
  const handleUpgrade = () => {
    // In production, this would integrate with payment processing
    setUser({ isPremium: true });
    toast.success('Welcome to Premium! 🔥👑');
  };
  
  if (user.isPremium) {
    return (
      <div className="min-h-screen pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="backdrop-blur-xl bg-gradient-to-br from-toxic-green/20 to-flame-orange/20 border-2 border-toxic-green rounded-3xl p-12">
              <Crown className="w-24 h-24 text-toxic-green mx-auto mb-6" />
              <h1 className="font-orbitron font-bold text-4xl mb-4">
                You're Already Premium! 👑
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Enjoy unlimited roasts and exclusive features.
              </p>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-flame-orange to-toxic-green text-white font-bold text-lg"
                >
                  Start Roasting →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light border border-glass-border mb-6">
            <Crown className="w-4 h-4 text-toxic-green" />
            <span className="text-sm">Unlock Your Full Potential</span>
          </div>
          
          <h1 className="font-orbitron font-bold text-5xl md:text-6xl mb-6">
            <GlitchText intensity="low">
              <span className="bg-gradient-to-r from-toxic-green to-flame-orange bg-clip-text text-transparent">
                FIREPROOF PASS
              </span>
            </GlitchText>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlimited roasts, exclusive features, and the power to roast without limits.
          </p>
        </motion.div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-8"
          >
            <h3 className="font-orbitron font-bold text-2xl mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-5xl font-orbitron font-bold">$0</span>
              <span className="text-muted-foreground">/forever</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const included = feature.free !== false;
                return (
                  <li key={index} className="flex items-start gap-3">
                    {included ? (
                      <Check className="w-5 h-5 text-cyan-neon mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    )}
                    <span className={cn(!included && 'text-muted-foreground line-through')}>
                      {feature.text}
                      {typeof feature.free === 'string' && (
                        <span className="text-muted-foreground text-sm"> ({feature.free})</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            
            <Link to="/dashboard">
              <button className="w-full py-3 rounded-xl border-2 border-glass-border hover:border-flame-orange/30 transition-all duration-200">
                Current Plan
              </button>
            </Link>
          </motion.div>
          
          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              'relative backdrop-blur-xl bg-gradient-to-br from-toxic-green/10 to-flame-orange/10',
              'border-2 border-toxic-green rounded-2xl p-8',
              'shadow-[0_0_50px_rgba(57,255,20,0.3)]'
            )}
          >
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-toxic-green rounded-full text-black font-bold text-sm">
              MOST POPULAR
            </div>
            
            <h3 className="font-orbitron font-bold text-2xl mb-2 flex items-center gap-2">
              <Crown className="w-6 h-6 text-toxic-green" />
              Premium
            </h3>
            <div className="mb-6">
              <span className="text-5xl font-orbitron font-bold text-toxic-green">$9.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-toxic-green mt-0.5 flex-shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                );
              })}
            </ul>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpgrade}
              className={cn(
                'w-full py-4 rounded-xl',
                'bg-gradient-to-r from-toxic-green to-flame-orange',
                'text-black font-bold text-lg',
                'shadow-[0_0_30px_rgba(57,255,20,0.5)]',
                'hover:shadow-[0_0_50px_rgba(57,255,20,0.7)]',
                'transition-all duration-300'
              )}
            >
              Upgrade Now 🔥
            </motion.button>
          </motion.div>
        </div>
        
        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-8"
        >
          <h2 className="font-orbitron font-bold text-2xl mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="font-bold mb-2">Can I cancel anytime?</h4>
              <p className="text-muted-foreground">
                Yes! Cancel anytime, no questions asked. Your premium status will remain active until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">What happens to my roasts if I downgrade?</h4>
              <p className="text-muted-foreground">
                All your existing roasts remain saved. You'll just be limited to 5 new roasts per day on the free plan.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Is my data safe?</h4>
              <p className="text-muted-foreground">
                Absolutely. We use industry-standard encryption and never share your data. Your roasts are yours alone.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

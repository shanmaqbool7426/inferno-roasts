/**
 * Admin Page
 * Content moderation queue (demo functionality)
 */

import { motion } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { mockRoasts } from '../../lib/mockData';

export function Admin() {
  const [moderationQueue] = useState(mockRoasts.slice(0, 3));
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected'>>({});
  
  const handleDecision = (id: string, decision: 'approved' | 'rejected') => {
    setDecisions(prev => ({ ...prev, [id]: decision }));
  };
  
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
            <Shield className="w-4 h-4 text-cyan-neon" />
            <span className="text-sm">Admin Access Only</span>
          </div>
          
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-cyan-neon to-toxic-green bg-clip-text text-transparent">
              CONTENT MODERATION
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Review flagged content and ensure community safety
          </p>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-6">
            <AlertTriangle className="w-8 h-8 text-flame-orange mb-3" />
            <p className="text-3xl font-orbitron font-bold mb-1">3</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </div>
          
          <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-6">
            <CheckCircle className="w-8 h-8 text-toxic-green mb-3" />
            <p className="text-3xl font-orbitron font-bold mb-1">127</p>
            <p className="text-sm text-muted-foreground">Approved Today</p>
          </div>
          
          <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-6">
            <XCircle className="w-8 h-8 text-destructive mb-3" />
            <p className="text-3xl font-orbitron font-bold mb-1">8</p>
            <p className="text-sm text-muted-foreground">Rejected Today</p>
          </div>
          
          <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-xl p-6">
            <Shield className="w-8 h-8 text-cyan-neon mb-3" />
            <p className="text-3xl font-orbitron font-bold mb-1">99.4%</p>
            <p className="text-sm text-muted-foreground">Accuracy Rate</p>
          </div>
        </motion.div>
        
        {/* Moderation Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="font-orbitron font-bold text-2xl mb-4">Pending Review</h2>
          
          {moderationQueue.map((roast, index) => {
            const decision = decisions[roast.id];
            
            return (
              <motion.div
                key={roast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'backdrop-blur-xl bg-glass-bg border rounded-2xl p-6',
                  decision === 'approved' && 'border-toxic-green',
                  decision === 'rejected' && 'border-destructive',
                  !decision && 'border-glass-border'
                )}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-lg bg-surface-light text-sm">
                        {roast.heatLevel.toUpperCase()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {roast.targetType === 'photo' ? '📸 Photo' : '📝 Text'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ID: {roast.id}
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed">{roast.content}</p>
                  </div>
                </div>
                
                {/* AI Analysis */}
                <div className="mb-4 p-4 bg-surface-light rounded-xl border border-glass-border">
                  <p className="text-sm font-medium mb-2">AI Moderation Analysis:</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>✓ No hate speech detected</p>
                    <p>✓ No explicit content</p>
                    <p>✓ Within community guidelines</p>
                    <p className="text-toxic-green">Confidence: 98.7%</p>
                  </div>
                </div>
                
                {/* Actions */}
                {!decision ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDecision(roast.id, 'approved')}
                      className={cn(
                        'flex-1 py-3 rounded-xl',
                        'bg-toxic-green/10 border-2 border-toxic-green',
                        'text-toxic-green font-bold',
                        'hover:bg-toxic-green/20',
                        'transition-all duration-200',
                        'flex items-center justify-center gap-2'
                      )}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve
                    </button>
                    
                    <button
                      onClick={() => handleDecision(roast.id, 'rejected')}
                      className={cn(
                        'flex-1 py-3 rounded-xl',
                        'bg-destructive/10 border-2 border-destructive',
                        'text-destructive font-bold',
                        'hover:bg-destructive/20',
                        'transition-all duration-200',
                        'flex items-center justify-center gap-2'
                      )}
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                ) : (
                  <div
                    className={cn(
                      'py-3 rounded-xl text-center font-bold',
                      decision === 'approved' && 'bg-toxic-green/10 text-toxic-green',
                      decision === 'rejected' && 'bg-destructive/10 text-destructive'
                    )}
                  >
                    {decision === 'approved' ? '✓ Approved' : '✗ Rejected'}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

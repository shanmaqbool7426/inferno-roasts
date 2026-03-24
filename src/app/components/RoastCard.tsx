/**
 * RoastCard Component
 * Glassmorphic card displaying a roast with share, copy, and TTS functionality
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Copy,
  Share2,
  Heart,
  Download,
  Volume2,
  Check,
  Trash2,
} from 'lucide-react';
import { cn, getHeatColor, getHeatGlow, formatTimeAgo, copyToClipboard, getHeatEmoji } from '../../lib/utils';
import type { Roast } from '../../stores/infernoStore';
import { GlitchText } from './GlitchText';
import { toast } from 'sonner';

interface RoastCardProps {
  roast: Roast;
  onLike?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export function RoastCard({
  roast,
  onLike,
  onDelete,
  showActions = true,
}: RoastCardProps) {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const handleCopy = async () => {
    const success = await copyToClipboard(roast.content);
    if (success) {
      setCopied(true);
      toast.success('Roast copied to clipboard! 🔥');
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/roast/${roast.id}`;
    const shareData = {
      title: 'Check out this roast! 🔥',
      text: roast.content,
      url: shareUrl,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await copyToClipboard(shareUrl);
          toast.success('Share link copied!');
        }
      }
    } else {
      await copyToClipboard(shareUrl);
      toast.success('Share link copied!');
    }
  };
  
  const handleTTS = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(roast.content);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      toast.error('Text-to-speech not supported');
    }
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
    if (!isLiked) {
      toast.success('Roast liked! 🔥');
    }
  };
  
  const handleDownload = () => {
    // In production, this would generate and download an image
    toast.success('Generating shareable image...');
    // Placeholder for actual implementation
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        'group relative',
        'backdrop-blur-xl bg-glass-bg',
        'border border-glass-border rounded-2xl',
        'p-6 space-y-4',
        'hover:border-opacity-30 transition-all duration-300',
        getHeatGlow(roast.heatLevel)
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Heat indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              'w-10 h-10 rounded-full',
              'flex items-center justify-center',
              'border-2',
              getHeatColor(roast.heatLevel),
              'border-current',
              'text-xl'
            )}
          >
            {getHeatEmoji(roast.heatLevel)}
          </motion.div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className={cn('text-sm font-orbitron', getHeatColor(roast.heatLevel))}>
                {roast.heatLevel.toUpperCase()}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(roast.timestamp)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {roast.targetType === 'photo' ? '📸 Photo Roast' : '📝 Text Roast'}
            </span>
          </div>
        </div>
        
        {showActions && onDelete && (
          <button
            onClick={onDelete}
            className={cn(
              'opacity-0 group-hover:opacity-100',
              'transition-opacity duration-200',
              'p-2 rounded-lg hover:bg-destructive/20',
              'text-muted-foreground hover:text-destructive'
            )}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Roast content */}
      <div className="space-y-3">
        {roast.heatLevel === 'toxic' ? (
          <GlitchText className="text-base leading-relaxed">
            {roast.content}
          </GlitchText>
        ) : (
          <p className="text-base leading-relaxed">{roast.content}</p>
        )}
      </div>
      
      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-glass-border">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                'transition-all duration-200',
                'hover:bg-surface-light',
                isLiked ? 'text-flame-orange' : 'text-muted-foreground'
              )}
            >
              <Heart
                className={cn('w-4 h-4', isLiked && 'fill-current')}
              />
              <span className="text-sm">{roast.likes + (isLiked ? 1 : 0)}</span>
            </motion.button>
          </div>
          
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleTTS}
              className={cn(
                'p-2 rounded-lg transition-colors duration-200',
                'hover:bg-surface-light text-muted-foreground hover:text-foreground',
                isSpeaking && 'text-cyan-neon'
              )}
              title="Text to Speech"
            >
              <Volume2 className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className={cn(
                'p-2 rounded-lg transition-colors duration-200',
                'hover:bg-surface-light text-muted-foreground hover:text-foreground',
                copied && 'text-toxic-green'
              )}
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-surface-light text-muted-foreground hover:text-foreground"
              title="Download as image"
            >
              <Download className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-surface-light text-muted-foreground hover:text-foreground"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

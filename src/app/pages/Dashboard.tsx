/**
 * Dashboard Page - The "Oven"
 * Central hub for generating roasts with photo/text upload and heat selector
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Type, Flame, Loader2, ImageIcon, X } from 'lucide-react';
import { HeatSelector } from '../components/HeatSelector';
import { RoastCard } from '../components/RoastCard';
import { AchievementToast } from '../components/AchievementToast';
import { BurnAnimation } from '../components/BurnAnimation';
import { useInfernoStore } from '../../stores/infernoStore';
import { cn, generateId, validateImageFile, fileToBase64, generateRoast } from '../../lib/utils';
import { toast } from 'sonner';
import type { HeatLevel } from '../../stores/infernoStore';

type InputMode = 'photo' | 'text';

export function Dashboard() {
  const {
    currentHeatLevel,
    setHeatLevel,
    addRoast,
    roasts,
    likeRoast,
    deleteRoast,
    isGenerating,
    setIsGenerating,
    useCredit,
    user,
    achievements,
  } = useInfernoStore();
  
  const [inputMode, setInputMode] = useState<InputMode>('photo');
  const [textInput, setTextInput] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [unlockedAchievement, setUnlockedAchievement] = useState<typeof achievements[0] | null>(null);
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }
    
    setPhotoFile(file);
    const base64 = await fileToBase64(file);
    setPhotoPreview(base64);
  };
  
  const handleGenerate = async () => {
    // Check if user has credits
    if (!useCredit()) {
      toast.error('Out of credits! Upgrade to premium for unlimited roasts.');
      return;
    }
    
    // Validate input
    if (inputMode === 'photo' && !photoFile) {
      toast.error('Please upload a photo');
      return;
    }
    
    if (inputMode === 'text' && !textInput.trim()) {
      toast.error('Please enter some text');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Simulate AI generation
      const roastContent = await generateRoast(
        inputMode,
        inputMode === 'photo' ? photoPreview! : textInput,
        currentHeatLevel
      );
      
      // Create roast
      const newRoast = {
        id: generateId(),
        content: roastContent,
        heatLevel: currentHeatLevel,
        targetType: inputMode,
        targetData: inputMode === 'photo' ? photoPreview! : textInput,
        likes: 0,
        timestamp: Date.now(),
        isPublic: true,
      };
      
      addRoast(newRoast);
      
      // Check for first roast achievement
      if (user.totalRoasts === 1) {
        const achievement = achievements.find(a => a.id === 'first-roast');
        if (achievement && !achievement.unlockedAt) {
          setUnlockedAchievement(achievement);
        }
      }
      
      // Reset inputs
      setTextInput('');
      setPhotoPreview(null);
      setPhotoFile(null);
      
      toast.success('Roast generated! 🔥');
    } catch (error) {
      toast.error('Failed to generate roast. Try again!');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const userRoasts = roasts.filter(r => r.timestamp > 0);
  
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-flame-orange to-toxic-green bg-clip-text text-transparent">
              THE OVEN
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Time to get roasted. Choose your target wisely... or don't. 🔥
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Input Mode Selection */}
            <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-6 space-y-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setInputMode('photo')}
                  disabled={isGenerating}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl',
                    'transition-all duration-200',
                    'border-2',
                    inputMode === 'photo'
                      ? 'border-flame-orange bg-flame-orange/10 text-flame-orange'
                      : 'border-glass-border hover:border-glass-border/50'
                  )}
                >
                  <ImageIcon className="w-5 h-5" />
                  <span className="font-medium">Photo</span>
                </button>
                
                <button
                  onClick={() => setInputMode('text')}
                  disabled={isGenerating}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl',
                    'transition-all duration-200',
                    'border-2',
                    inputMode === 'text'
                      ? 'border-flame-orange bg-flame-orange/10 text-flame-orange'
                      : 'border-glass-border hover:border-glass-border/50'
                  )}
                >
                  <Type className="w-5 h-5" />
                  <span className="font-medium">Text</span>
                </button>
              </div>
              
              {/* Photo Upload */}
              {inputMode === 'photo' && (
                <div>
                  {!photoPreview ? (
                    <label
                      className={cn(
                        'group relative block',
                        'border-2 border-dashed border-glass-border rounded-xl',
                        'p-12 text-center cursor-pointer',
                        'hover:border-flame-orange/50 hover:bg-flame-orange/5',
                        'transition-all duration-200',
                        isGenerating && 'pointer-events-none opacity-50'
                      )}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={isGenerating}
                        className="hidden"
                      />
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground group-hover:text-flame-orange transition-colors" />
                      <p className="text-lg mb-2">Upload a photo</p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG, or WebP • Max 5MB
                      </p>
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => {
                          setPhotoPreview(null);
                          setPhotoFile(null);
                        }}
                        disabled={isGenerating}
                        className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Text Input */}
              {inputMode === 'text' && (
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isGenerating}
                  placeholder="Enter something you want to get roasted for... your outfit, your hobbies, your life choices..."
                  className={cn(
                    'w-full h-32 px-4 py-3 rounded-xl',
                    'bg-surface-light border border-glass-border',
                    'placeholder:text-muted-foreground',
                    'focus:outline-none focus:border-flame-orange/50 focus:ring-2 focus:ring-flame-orange/20',
                    'transition-all duration-200',
                    'resize-none'
                  )}
                />
              )}
              
              {/* Heat Selector */}
              <HeatSelector
                value={currentHeatLevel}
                onChange={setHeatLevel}
                disabled={isGenerating}
              />
              
              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className={cn(
                  'w-full py-4 rounded-xl',
                  'bg-gradient-to-r from-flame-orange to-flame-orange-light',
                  'text-white font-bold text-lg',
                  'shadow-[0_0_30px_rgba(255,69,0,0.5)]',
                  'hover:shadow-[0_0_50px_rgba(255,69,0,0.7)]',
                  'transition-all duration-300',
                  'flex items-center justify-center gap-3',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>ROASTING IN PROGRESS...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5" />
                    <span>GENERATE ROAST</span>
                  </>
                )}
              </motion.button>
              
              {!user.isPremium && (
                <p className="text-xs text-center text-muted-foreground">
                  {useInfernoStore.getState().credits} credits remaining
                </p>
              )}
            </div>
          </motion.div>
          
          {/* Recent Roasts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-orbitron font-bold text-2xl">Your Roasts</h2>
              <span className="text-sm text-muted-foreground">
                {userRoasts.length} total
              </span>
            </div>
            
            {userRoasts.length === 0 ? (
              <div className="backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl p-12 text-center">
                <Flame className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  No roasts yet. Time to face the heat! 🔥
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                <AnimatePresence mode="popLayout">
                  {userRoasts.map((roast) => (
                    <motion.div
                      key={roast.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <RoastCard
                        roast={roast}
                        onLike={() => likeRoast(roast.id)}
                        onDelete={() => deleteRoast(roast.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Achievement Toast */}
      {unlockedAchievement && (
        <AchievementToast
          achievement={unlockedAchievement}
          onClose={() => setUnlockedAchievement(null)}
        />
      )}
    </div>
  );
}
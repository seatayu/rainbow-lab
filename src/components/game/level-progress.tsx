import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { cn } from '@/lib/utils';
import { useAudioManager } from '@/hooks/use-audio-manager';
export function LevelProgress() {
  const currentLevel = useGameStore((s) => s.level);
  const progress = useGameStore((s) => s.levelProgress);
  const setLevel = useGameStore((s) => s.setLevel);
  const { playSfx } = useAudioManager();
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className="w-full bg-white/40 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/20 shadow-inner">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {levels.map((lvl) => {
          const isUnlocked = progress[lvl]?.unlocked;
          const stars = progress[lvl]?.stars || 0;
          const isActive = currentLevel === lvl;
          return (
            <motion.button
              key={lvl}
              whileHover={isUnlocked ? { scale: 1.05, y: -2 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
              onClick={() => {
                if (isUnlocked) {
                  playSfx('click');
                  setLevel(lvl);
                }
              }}
              className={cn(
                "flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-between py-3 transition-all border-b-4",
                isActive ? "bg-indigo-500 border-indigo-700 text-white shadow-lg" : 
                isUnlocked ? "bg-white border-zinc-200 text-foreground" : "bg-zinc-100 border-zinc-300 text-zinc-400 opacity-60 cursor-not-allowed"
              )}
            >
              <span className="text-xs font-black">LVL {lvl}</span>
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-3 h-3", 
                      i < stars ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 fill-zinc-100"
                    )} 
                  />
                ))}
              </div>
              {!isUnlocked && <Lock className="w-3 h-3 mt-1" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
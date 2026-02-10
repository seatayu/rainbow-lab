import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { mixRYB } from '@/lib/color-math';
import { cn } from '@/lib/utils';
import { Bubbles, Sparkles } from './visual-effects';
export function Beaker() {
  const drops = useGameStore((s) => s.drops);
  const isWon = useGameStore((s) => s.isWon);
  const mixedColor = React.useMemo(() => mixRYB(drops), [drops]);
  const totalDrops = drops.r + drops.y + drops.b;
  const fillHeight = Math.min(90, (totalDrops * 8) + 15);
  return (
    <div className="relative w-72 h-80 mx-auto">
      <AnimatePresence>
        {isWon && <Sparkles active={isWon} />}
      </AnimatePresence>
      {/* Outer Beaker Glass */}
      <div className={cn(
        "absolute inset-0 border-4 border-white/60 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-b-[5rem] rounded-t-xl shadow-2xl overflow-hidden transition-all duration-500",
        isWon && "ring-8 ring-yellow-400/50 scale-105 border-yellow-200/60"
      )}>
        {/* Measurement Lines */}
        <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-around py-12 pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-1 w-full bg-foreground rounded-full" />
          ))}
        </div>
        {/* Liquid Container */}
        <motion.div
          initial={false}
          animate={{
            height: `${fillHeight}%`,
            backgroundColor: mixedColor
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 40 }}
          className="absolute bottom-0 left-0 right-0 origin-bottom"
        >
          <Bubbles count={totalDrops > 0 ? 5 : 0} />
          {/* Animated Liquid Surface */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              scaleX: [1, 1.02, 1]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute -top-6 left-0 right-0 h-12 opacity-30 mix-blend-overlay"
            style={{ backgroundColor: 'white', borderRadius: '50% 50% 0 0' }}
          />
          {/* Glow effect for won state */}
          {isWon && (
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
            />
          )}
        </motion.div>
      </div>
      {/* Reflections */}
      <div className="absolute top-8 left-8 w-6 h-40 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-md pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full blur-xl pointer-events-none" />
    </div>
  );
}
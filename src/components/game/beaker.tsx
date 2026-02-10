import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { mixRYB } from '@/lib/color-math';
export function Beaker() {
  const drops = useGameStore((s) => s.drops);
  const mixedColor = React.useMemo(() => mixRYB(drops), [drops]);
  const totalDrops = drops.r + drops.y + drops.b;
  // Calculate height based on drops, maxing out at 90%
  const fillHeight = Math.min(90, (totalDrops * 8) + 10);
  return (
    <div className="relative w-64 h-80 mx-auto">
      {/* Beaker Glass */}
      <div className="absolute inset-0 border-4 border-white/40 bg-white/10 backdrop-blur-sm rounded-b-[4rem] rounded-t-lg shadow-xl overflow-hidden">
        {/* Measurement Lines */}
        <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-8 pointer-events-none opacity-30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1 w-full bg-foreground" />
          ))}
        </div>
        {/* Liquid */}
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ 
              height: `${fillHeight}%`,
              backgroundColor: mixedColor 
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 60 }}
            className="absolute bottom-0 left-0 right-0 origin-bottom"
          >
            {/* Animated Liquid Surface */}
            <motion.div 
              animate={{
                y: [0, -4, 0],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-4 left-0 right-0 h-8 opacity-40"
              style={{ backgroundColor: 'inherit', borderRadius: '50% 50% 0 0' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Glossy Reflection */}
      <div className="absolute top-4 left-6 w-4 h-32 bg-white/20 rounded-full blur-sm pointer-events-none" />
    </div>
  );
}
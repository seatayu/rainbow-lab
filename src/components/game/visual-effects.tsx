import React from 'react';
import { motion } from 'framer-motion';
export function Bubbles({ count = 5 }: { count?: number }) {
  const [particles, setParticles] = React.useState<{ id: number; x: number; size: number }[]>([]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-10),
        { id: Date.now(), x: Math.random() * 80 + 10, size: Math.random() * 8 + 4 }
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '100%', opacity: 0, scale: 0.5 }}
          animate={{ y: '-20%', opacity: [0, 0.4, 0], scale: 1 }}
          transition={{ duration: 3, ease: 'linear' }}
          className="absolute bg-white/40 rounded-full blur-[1px]"
          style={{ left: `${p.x}%`, width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}
export function Sparkles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute -inset-10 flex items-center justify-center pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{ 
            scale: [0, 1, 0], 
            x: (Math.random() - 0.5) * 200, 
            y: (Math.random() - 0.5) * 200,
            rotate: Math.random() * 360 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-4 h-4 text-yellow-400"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
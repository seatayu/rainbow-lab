import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { GameHeader } from '@/components/game/game-header';
import { Beaker } from '@/components/game/beaker';
import { Controls } from '@/components/game/controls';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
export function HomePage() {
  const isWon = useGameStore((s) => s.isWon);
  const nextLevel = useGameStore((s) => s.nextLevel);
  const level = useGameStore((s) => s.level);
  React.useEffect(() => {
    if (isWon) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF3C3C', '#FFE600', '#3282FF']
      });
    }
  }, [isWon]);
  return (
    <div className="min-h-screen bg-[#F0F4F8] text-foreground relative overflow-hidden flex flex-col items-center font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <ThemeToggle />
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-8 md:py-10 lg:py-12 flex flex-col gap-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <GameHeader />
          </motion.div>
          <main className="flex flex-col items-center gap-12">
            <div className="relative group">
              <motion.div
                animate={isWon ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
                transition={{ duration: 0.5, repeat: isWon ? Infinity : 0 }}
              >
                <Beaker />
              </motion.div>
              <AnimatePresence>
                {isWon && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-6 -right-6 bg-yellow-400 p-3 rounded-full shadow-lg border-4 border-white z-20"
                  >
                    <Star className="w-8 h-8 text-white fill-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Controls />
          </main>
          <footer className="mt-auto text-center py-6 text-muted-foreground/60 text-xs font-bold uppercase tracking-widest">
            Rainbow Lab v1.0 • Built for Little Scientists
          </footer>
        </div>
      </div>
      {/* Success Modal */}
      <AnimatePresence>
        {isWon && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 max-w-md w-full text-center shadow-2xl border-b-8 border-indigo-500"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-indigo-500" />
                </div>
              </div>
              <h2 className="text-4xl font-black mb-2 text-foreground">Amazing!</h2>
              <p className="text-muted-foreground font-medium mb-8">
                You've mastered the mix for Level {level}. Ready for a bigger challenge?
              </p>
              <Button 
                onClick={nextLevel}
                size="lg"
                className="w-full h-16 text-xl font-bold rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_8px_0_0_#3730A3] active:shadow-none active:translate-y-2 transition-all"
              >
                Next Level <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
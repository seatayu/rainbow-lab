import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Star, Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { GameHeader } from '@/components/game/game-header';
import { Beaker } from '@/components/game/beaker';
import { Controls } from '@/components/game/controls';
import { LevelProgress } from '@/components/game/level-progress';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAudioManager } from '@/hooks/use-audio-manager';
export function HomePage() {
  const isWon = useGameStore((s) => s.isWon);
  const nextLevel = useGameStore((s) => s.nextLevel);
  const level = useGameStore((s) => s.level);
  const audioEnabled = useGameStore((s) => s.audioEnabled);
  const toggleAudio = useGameStore((s) => s.toggleAudio);
  const { playSfx, initAudio } = useAudioManager();
  const handleUtility = React.useCallback((action: () => void) => {
    initAudio();
    playSfx('click');
    action();
  }, [initAudio, playSfx]);
  const getColorFact = (lvl: number) => {
    const facts: Record<number, string> = {
      1: "Orange is a secondary color made by mixing Red and Yellow!",
      2: "Green is a secondary color made by mixing Yellow and Blue!",
      3: "Purple is a secondary color made by mixing Red and Blue!",
      4: "Vermilion is a tertiary color between Red and Orange!",
      5: "Lime is a bright tertiary color between Yellow and Green!",
      6: "Deep Blue is a calm color often found in the deep ocean.",
      7: "Brick red is a warm earth tone used for buildings.",
      8: "Amber is a golden-yellow color named after fossilized resin.",
      9: "Midnight blue represents the color of the night sky.",
      10: "Slate is a sophisticated grey-blue found in mountain rocks."
    };
    return facts[lvl] || "Every color tells a story in the Rainbow Lab!";
  };
  React.useEffect(() => {
    if (isWon) {
      playSfx('fanfare');
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF3C3C', '#FFE600', '#3282FF', '#A855F7']
      });
    }
  }, [isWon, playSfx]);
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-zinc-950 text-foreground relative overflow-hidden flex flex-col items-center">
      {/* Playful Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[10%] w-64 h-64 bg-red-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02]"
             style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="py-8 md:py-10 lg:py-12 flex flex-col gap-8">
          <header className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex-1 w-full">
              <GameHeader />
            </motion.div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => { initAudio(); toggleAudio(); }}
                className="w-12 h-12 rounded-2xl border-b-4 active:border-b-0 transition-all bg-white/80"
              >
                {audioEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
              </Button>
              <ThemeToggle className="relative top-0 right-0 w-12 h-12 rounded-2xl border-b-4 active:border-b-0 transition-all bg-white/80" />
            </div>
          </header>
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 flex flex-col items-center gap-12">
              <motion.div
                animate={isWon ? { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] } : {}}
                transition={{ duration: 0.6, repeat: isWon ? Infinity : 0 }}
                className="relative"
              >
                <Beaker />
                <AnimatePresence>
                  {isWon && (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 10 }}
                      className="absolute -top-10 -right-10 bg-yellow-400 p-4 rounded-[2rem] shadow-2xl border-4 border-white z-20"
                    >
                      <Star className="w-10 h-10 text-white fill-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <Controls />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
              <div className="sticky top-12">
                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter text-muted-foreground flex items-center gap-2">
                  <Star className="w-5 h-5" /> Rainbow Map
                </h3>
                <LevelProgress />
                <div className="mt-8 p-6 bg-white/50 backdrop-blur-md rounded-[2.5rem] border-2 border-white border-b-8 border-b-indigo-200">
                  <h4 className="font-black text-indigo-600 uppercase text-sm mb-2">Did you know?</h4>
                  <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                    {getColorFact(level)}
                  </p>
                </div>
              </div>
            </div>
          </main>
          <footer className="text-center py-10 opacity-40 font-black text-xs uppercase tracking-widest">
            Rainbow Lab • Discovery Awaits
          </footer>
        </div>
      </div>
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-indigo-950/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-[4rem] p-12 max-w-md w-full text-center shadow-[0_32px_0_0_rgba(79,70,229,0.2)] border-b-[16px] border-indigo-500"
            >
              <div className="mb-8 flex justify-center">
                <div className="w-32 h-32 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center relative">
                  <Sparkles className="w-16 h-16 text-indigo-500" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-indigo-400/20 rounded-full"
                  />
                </div>
              </div>
              <h2 className="text-5xl font-black mb-4 text-foreground tracking-tight">SUPER!</h2>
              <p className="text-muted-foreground font-bold text-lg mb-10">
                You've mastered Level {level}! {getColorFact(level)}
              </p>
              <Button
                onClick={() => handleUtility(nextLevel)}
                size="lg"
                className="w-full h-20 text-2xl font-black rounded-3xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_10px_0_0_#3730A3] active:shadow-none active:translate-y-2 transition-all"
              >
                LEVEL UP <ArrowRight className="ml-3 h-8 w-8" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Undo2, Pipette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/game-store';
import { useAudioManager } from '@/hooks/use-audio-manager';
import { cn } from '@/lib/utils';
export function Controls() {
  const addDrop = useGameStore((s) => s.addDrop);
  const undo = useGameStore((s) => s.undo);
  const reset = useGameStore((s) => s.reset);
  const history = useGameStore((s) => s.history);
  const { playSfx, initAudio } = useAudioManager();
  const colors = [
    { id: 'r', label: 'Red', hex: '#FF3C3C', border: 'border-red-600', shadow: 'shadow-red-900/40' },
    { id: 'y', label: 'Yellow', hex: '#FFE600', border: 'border-yellow-500', shadow: 'shadow-yellow-900/40' },
    { id: 'b', label: 'Blue', hex: '#3282FF', border: 'border-blue-600', shadow: 'shadow-blue-900/40' }
  ] as const;
  const handleDrop = (id: 'r' | 'y' | 'b') => {
    initAudio();
    playSfx('plop');
    addDrop(id);
  };
  const handleUtility = (action: () => void) => {
    initAudio();
    playSfx('click');
    action();
  };
  return (
    <div className="flex flex-col gap-10 items-center w-full max-w-lg mx-auto">
      <div className="flex justify-center gap-8">
        {colors.map((color) => (
          <div key={color.id} className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.85, y: 8 }}
              onClick={() => handleDrop(color.id)}
              className={cn(
                "w-24 h-24 rounded-full border-b-[8px] flex items-center justify-center transition-all shadow-xl active:border-b-0",
                color.border,
                color.shadow
              )}
              style={{ backgroundColor: color.hex }}
            >
              <Pipette className="w-12 h-12 text-white drop-shadow-lg" />
            </motion.button>
            <span className="font-black text-muted-foreground uppercase text-xs tracking-widest">{color.label}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleUtility(undo)}
          disabled={history.length === 0}
          className="rounded-2xl px-8 h-14 border-b-4 active:border-b-0 active:translate-y-1 transition-all font-black text-lg bg-white/80"
        >
          <Undo2 className="mr-2 h-6 w-6" /> UNDO
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleUtility(reset)}
          className="rounded-2xl px-8 h-14 border-b-4 border-destructive/20 active:border-b-0 active:translate-y-1 transition-all font-black text-lg hover:bg-destructive/10 hover:text-destructive bg-white/80"
        >
          <RotateCcw className="mr-2 h-6 w-6" /> START OVER
        </Button>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Undo2, Pipette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/game-store';
export function Controls() {
  const addDrop = useGameStore((s) => s.addDrop);
  const undo = useGameStore((s) => s.undo);
  const reset = useGameStore((s) => s.reset);
  const history = useGameStore((s) => s.history);
  const colors = [
    { id: 'r', label: 'Red', hex: '#FF3C3C', border: 'border-red-600' },
    { id: 'y', label: 'Yellow', hex: '#FFE600', border: 'border-yellow-500' },
    { id: 'b', label: 'Blue', hex: '#3282FF', border: 'border-blue-600' }
  ] as const;
  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
      <div className="flex justify-center gap-6">
        {colors.map((color) => (
          <div key={color.id} className="flex flex-col items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, y: 5 }}
              onClick={() => addDrop(color.id)}
              className={`w-20 h-20 rounded-full shadow-[0_8px_0_0_rgba(0,0,0,0.1)] active:shadow-none flex items-center justify-center transition-transform ${color.border}`}
              style={{ backgroundColor: color.hex }}
            >
              <Pipette className="w-10 h-10 text-white drop-shadow-md" />
            </motion.button>
            <span className="font-bold text-muted-foreground uppercase text-xs tracking-widest">{color.label}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={undo}
          disabled={history.length === 0}
          className="rounded-full px-6 border-b-4 active:border-b-0 transition-all"
        >
          <Undo2 className="mr-2 h-5 w-5" /> Undo
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={reset}
          className="rounded-full px-6 border-b-4 active:border-b-0 transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          <RotateCcw className="mr-2 h-5 w-5" /> Reset
        </Button>
      </div>
    </div>
  );
}
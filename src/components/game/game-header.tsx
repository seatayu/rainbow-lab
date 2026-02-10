import React from 'react';
import { Target, Beaker as BeakerIcon } from 'lucide-react';
import { useGameStore } from '@/store/game-store';
import { mixRYB } from '@/lib/color-math';
export function GameHeader() {
  const level = useGameStore((s) => s.level);
  const target = useGameStore((s) => s.target);
  const drops = useGameStore((s) => s.drops);
  const targetHex = React.useMemo(() => mixRYB(target), [target]);
  const currentHex = React.useMemo(() => mixRYB(drops), [drops]);
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white/50 backdrop-blur-md rounded-3xl border-2 border-white/20 shadow-sm">
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-sm font-black uppercase text-indigo-500 tracking-tighter">Rainbow Lab</span>
        <h1 className="text-3xl font-black text-foreground">Mission Level {level}</h1>
      </div>
      <div className="flex gap-12 items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
            <Target className="w-4 h-4" /> Goal Color
          </div>
          <div 
            className="w-16 h-16 rounded-2xl shadow-inner border-4 border-white"
            style={{ backgroundColor: targetHex }}
          />
        </div>
        <div className="text-4xl font-black text-muted-foreground/30">?</div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
            <BeakerIcon className="w-4 h-4" /> Your Mix
          </div>
          <div 
            className="w-16 h-16 rounded-2xl shadow-inner border-4 border-white transition-colors duration-300"
            style={{ backgroundColor: currentHex }}
          />
        </div>
      </div>
    </div>
  );
}
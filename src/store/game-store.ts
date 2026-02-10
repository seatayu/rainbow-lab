import { create } from 'zustand';
import { ColorDrops, compareColors } from '@/lib/color-math';
interface LevelRecord {
  stars: number;
  unlocked: boolean;
}
interface GameState {
  level: number;
  drops: ColorDrops;
  target: ColorDrops;
  history: ColorDrops[];
  isWon: boolean;
  audioEnabled: boolean;
  levelProgress: Record<number, LevelRecord>;
  addDrop: (color: keyof ColorDrops) => void;
  undo: () => void;
  reset: () => void;
  nextLevel: () => void;
  toggleAudio: () => void;
  setLevel: (lvl: number) => void;
}
const LEVELS: ColorDrops[] = [
  { r: 2, y: 2, b: 0 }, // Orange
  { r: 0, y: 2, b: 2 }, // Green
  { r: 2, y: 0, b: 2 }, // Purple
  { r: 3, y: 1, b: 0 }, // Vermilion
  { r: 1, y: 3, b: 2 }, // Lime
  { r: 1, y: 1, b: 4 }, // Deep Blue
  { r: 4, y: 1, b: 1 }, // Brick
  { r: 2, y: 4, b: 0 }, // Amber
  { r: 0, y: 1, b: 5 }, // Midnight
  { r: 2, y: 2, b: 2 }, // Slate
];
const loadProgress = (): Record<number, LevelRecord> => {
  const saved = localStorage.getItem('rainbow-lab-progress');
  if (saved) return JSON.parse(saved);
  return { 1: { stars: 0, unlocked: true } };
};
export const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  drops: { r: 0, y: 0, b: 0 },
  target: LEVELS[0],
  history: [],
  isWon: false,
  audioEnabled: true,
  levelProgress: loadProgress(),
  addDrop: (color) => {
    const currentDrops = get().drops;
    const newDrops = { ...currentDrops, [color]: currentDrops[color] + 1 };
    const target = get().target;
    const won = compareColors(newDrops, target);
    if (won) {
      const currentLevel = get().level;
      const historyLen = get().history.length + 1;
      const targetTotal = target.r + target.y + target.b;
      // Stars based on efficiency
      let stars = 1;
      if (historyLen === targetTotal) stars = 3;
      else if (historyLen <= targetTotal + 2) stars = 2;
      set((state) => {
        const nextProg = {
          ...state.levelProgress,
          [currentLevel]: { stars: Math.max(state.levelProgress[currentLevel]?.stars || 0, stars), unlocked: true },
          [currentLevel + 1]: { stars: state.levelProgress[currentLevel + 1]?.stars || 0, unlocked: true }
        };
        localStorage.setItem('rainbow-lab-progress', JSON.stringify(nextProg));
        return { levelProgress: nextProg };
      });
    }
    set((state) => ({
      drops: newDrops,
      history: [...state.history, currentDrops],
      isWon: won
    }));
  },
  undo: () => {
    const history = get().history;
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    set({
      drops: previous,
      history: history.slice(0, -1),
      isWon: false
    });
  },
  reset: () => {
    set({
      drops: { r: 0, y: 0, b: 0 },
      history: [],
      isWon: false
    });
  },
  nextLevel: () => {
    const nextLvl = get().level + 1;
    const idx = (nextLvl - 1) % LEVELS.length;
    set({ level: nextLvl, target: LEVELS[idx], drops: { r: 0, y: 0, b: 0 }, history: [], isWon: false });
  },
  setLevel: (lvl: number) => {
    const idx = (lvl - 1) % LEVELS.length;
    set({
      level: lvl,
      target: LEVELS[idx],
      drops: { r: 0, y: 0, b: 0 },
      history: [],
      isWon: false
    });
  },
  toggleAudio: () => {
    set((state) => ({ audioEnabled: !state.audioEnabled }));
  }
}));
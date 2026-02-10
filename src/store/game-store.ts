import { create } from 'zustand';
import { ColorDrops, compareColors } from '@/lib/color-math';
interface GameState {
  level: number;
  drops: ColorDrops;
  target: ColorDrops;
  history: ColorDrops[];
  isWon: boolean;
  addDrop: (color: keyof ColorDrops) => void;
  undo: () => void;
  reset: () => void;
  nextLevel: () => void;
}
// Initial targets for levels
const LEVELS: ColorDrops[] = [
  { r: 2, y: 2, b: 0 }, // Orange
  { r: 0, y: 2, b: 2 }, // Green
  { r: 2, y: 0, b: 2 }, // Purple
  { r: 3, y: 1, b: 0 }, // Red-Orange
  { r: 1, y: 3, b: 2 }, // Yellow-Greenish
];
export const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  drops: { r: 0, y: 0, b: 0 },
  target: LEVELS[0],
  history: [],
  isWon: false,
  addDrop: (color) => {
    const currentDrops = get().drops;
    const newDrops = { ...currentDrops, [color]: currentDrops[color] + 1 };
    set((state) => ({
      drops: newDrops,
      history: [...state.history, currentDrops],
      isWon: compareColors(newDrops, state.target)
    }));
  },
  undo: () => {
    const history = get().history;
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    set({
      drops: previous,
      history: newHistory,
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
    set((state) => {
      const nextIdx = state.level % LEVELS.length;
      return {
        level: state.level + 1,
        target: LEVELS[nextIdx],
        drops: { r: 0, y: 0, b: 0 },
        history: [],
        isWon: false
      };
    });
  }
}));
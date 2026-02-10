import { useCallback, useEffect } from 'react';
import { audioEngine } from '@/lib/audio-engine';
import { useGameStore } from '@/store/game-store';
export function useAudioManager() {
  const audioEnabled = useGameStore((s) => s.audioEnabled);
  useEffect(() => {
    audioEngine.setMute(!audioEnabled);
  }, [audioEnabled]);
  const initAudio = useCallback(() => {
    audioEngine.init();
    audioEngine.resume();
  }, []);
  const playSfx = useCallback((type: 'plop' | 'bubble' | 'click' | 'fanfare') => {
    switch (type) {
      case 'plop': audioEngine.playPlop(); break;
      case 'bubble': audioEngine.playBubble(); break;
      case 'click': audioEngine.playClick(); break;
      case 'fanfare': audioEngine.playFanfare(); break;
    }
  }, []);
  return { initAudio, playSfx };
}
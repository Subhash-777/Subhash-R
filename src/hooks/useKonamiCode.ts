'use client';
// src/hooks/useKonamiCode.ts
// Detects the Konami Code (↑↑↓↓←→←→BA) and triggers confetti

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/app';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKonamiCode() {
  const { unlockAchievement, addToast, achievements } = useAppStore();
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      bufferRef.current.push(e.key);
      // Keep only last N keys
      if (bufferRef.current.length > KONAMI_SEQUENCE.length) {
        bufferRef.current.shift();
      }

      // Check match
      if (
        bufferRef.current.length === KONAMI_SEQUENCE.length &&
        bufferRef.current.every((key, i) => key.toLowerCase() === KONAMI_SEQUENCE[i].toLowerCase())
      ) {
        bufferRef.current = [];

        // Trigger confetti
        import('canvas-confetti').then((mod) => {
          const confetti = mod.default;
          const end = Date.now() + 2000;
          const colors = ['#7c3aed', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899'];
          (function frame() {
            confetti({
              particleCount: 7,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors,
            });
            confetti({
              particleCount: 7,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors,
            });
            if (Date.now() < end) requestAnimationFrame(frame);
          })();
        });

        // Achievement
        unlockAchievement('konami');
        addToast({
          id: `toast-${Date.now()}`,
          type: 'achievement',
          title: '🎮 Konami Master',
          message: '↑↑↓↓←→←→BA — Respect! 🫡',
          icon: '🎮',
        });
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [unlockAchievement, addToast]);
}

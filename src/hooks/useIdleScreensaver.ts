'use client';
// src/hooks/useIdleScreensaver.ts
// Triggers screensaver after 60s of inactivity

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/app';

const IDLE_TIMEOUT_MS = 60000; // 60 seconds

export function useIdleScreensaver() {
  const { activeEgg, setActiveEgg, paletteOpen } = useAppStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      // Don't start timer if another egg or palette is active
      if (activeEgg || paletteOpen) return;

      timerRef.current = setTimeout(() => {
        // Only activate if no other egg is active
        const state = useAppStore.getState();
        if (!state.activeEgg && !state.paletteOpen) {
          setActiveEgg('screensaver');
        }
      }, IDLE_TIMEOUT_MS);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((e) => document.addEventListener(e, resetTimer, { passive: true }));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => document.removeEventListener(e, resetTimer));
    };
  }, [activeEgg, paletteOpen, setActiveEgg]);
}

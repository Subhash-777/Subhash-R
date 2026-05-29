'use client';
// src/hooks/useCommandPalette.ts
// Global keyboard shortcut hook for the command palette

import { useEffect, useCallback } from 'react';
import { useAppStore } from '@/store/app';

export function useCommandPalette() {
  const { paletteOpen, setPaletteOpen } = useAppStore();

  const toggle = useCallback(() => {
    setPaletteOpen(!paletteOpen);
  }, [paletteOpen, setPaletteOpen]);

  const open = useCallback(() => setPaletteOpen(true), [setPaletteOpen]);
  const close = useCallback(() => setPaletteOpen(false), [setPaletteOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      // Escape to close
      if (e.key === 'Escape' && paletteOpen) {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [toggle, close, paletteOpen]);

  return { paletteOpen, open, close, toggle };
}

'use client';
// src/components/search/providers/EasterEggProvider.tsx
// Global provider that manages active Easter egg overlay rendering

import { useEffect } from 'react';
import { useAppStore } from '@/store/app';
import { NoirOverlay } from '../effects/NoirOverlay';
import { BinksOverlay } from '../effects/BinksOverlay';
import { ReturnByDeathOverlay } from '../effects/ReturnByDeathOverlay';
import { SatellaOverlay } from '../effects/SatellaOverlay';
import { ScreensaverOverlay } from '../effects/ScreensaverOverlay';

export function EasterEggProvider() {
  const activeEgg = useAppStore((s) => s.activeEgg);

  if (!activeEgg) return null;

  switch (activeEgg) {
    case 'noir': return <NoirOverlay />;
    case 'binks': return <BinksOverlay />;
    case 'return-by-death': return <ReturnByDeathOverlay />;
    case 'satella': return <SatellaOverlay />;
    case 'screensaver': return <ScreensaverOverlay />;
    case 'gear5': return <Gear5Effect />;
    default: return null;
  }
}

function Gear5Effect() {
  const setActiveEgg = useAppStore((s) => s.setActiveEgg);

  useEffect(() => {
    // White flash
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;inset:0;background:white;z-index:9990;opacity:0.8;pointer-events:none;transition:opacity 0.5s;';
    document.body.appendChild(flash);
    setTimeout(() => { flash.style.opacity = '0'; }, 200);
    setTimeout(() => flash.remove(), 700);

    // Bouncy animation on body
    document.body.style.animation = 'gear5Bounce 0.3s ease-in-out 5';

    // Cloud particles via confetti
    import('canvas-confetti').then((mod) => {
      const confetti = mod.default;
      confetti({
        particleCount: 50,
        spread: 180,
        origin: { y: 0.5 },
        colors: ['#ffffff', '#f5f5f5', '#e0e0e0'],
        shapes: ['circle'],
        gravity: 0.3,
        scalar: 2,
      });
    });

    // Auto-reset after 15s
    const timer = setTimeout(() => {
      document.body.style.animation = '';
      setActiveEgg(null);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.body.style.animation = '';
    };
  }, [setActiveEgg]);

  return null;
}

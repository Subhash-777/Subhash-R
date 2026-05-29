// src/lib/search/easterEggEngine.ts
// Central orchestration for triggering Easter eggs

import { findEasterEgg } from './easterEggRegistry';

export type ActiveEgg =
  | 'noir'
  | 'binks'
  | 'return-by-death'
  | 'satella'
  | 'gear5'
  | 'screensaver'
  | null;

// Combo detection state
let lastSatellaTrigger = 0;

export function checkWitchFactorCombo(eggId: string): boolean {
  if (eggId === 'satella') {
    lastSatellaTrigger = Date.now();
    return false;
  }
  if (eggId === 'return-by-death' && lastSatellaTrigger > 0) {
    const elapsed = Date.now() - lastSatellaTrigger;
    if (elapsed <= 60000) {
      lastSatellaTrigger = 0;
      return true;
    }
  }
  return false;
}

export function getDeathCount(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('subhashos-death-count') || '0', 10);
}

export function incrementDeathCount(): number {
  if (typeof window === 'undefined') return 0;
  const count = getDeathCount() + 1;
  localStorage.setItem('subhashos-death-count', String(count));
  return count;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

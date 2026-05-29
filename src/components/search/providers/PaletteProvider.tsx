'use client';
// src/components/search/providers/PaletteProvider.tsx
// Global provider — mounts CommandPalette, Easter eggs, Konami, idle timer, console art, toasts

import { useEffect } from 'react';
import { CommandPalette } from '../CommandPalette';
import { EasterEggProvider } from './EasterEggProvider';
import { SystemToast } from '../effects/SystemToast';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useIdleScreensaver } from '@/hooks/useIdleScreensaver';

// DevTools Console Art
const CONSOLE_ART = `
%c ███████╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███████╗██╗  ██╗ ██████╗ ███████╗
%c ██╔════╝██║   ██║██╔══██╗██║  ██║██╔══██╗██╔════╝██║  ██║██╔═══██╗██╔════╝
%c ███████╗██║   ██║██████╔╝███████║███████║███████╗███████║██║   ██║███████╗
%c ╚════██║██║   ██║██╔══██╗██╔══██║██╔══██║╚════██║██╔══██║██║   ██║╚════██║
%c ███████║╚██████╔╝██████╔╝██║  ██║██║  ██║███████║██║  ██║╚██████╔╝███████║
%c ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;

const CONSOLE_STYLE = 'color: #7c3aed; font-family: monospace; font-size: 10px;';

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  // Initialize hooks
  useCommandPalette();
  useKonamiCode();
  useIdleScreensaver();

  // Console art on mount
  useEffect(() => {
    const lines = CONSOLE_ART.split('\n').filter(l => l.includes('%c'));
    console.log(
      lines.join('\n'),
      ...lines.map(() => CONSOLE_STYLE)
    );
    console.log(
      '%c🚀 Curious developer? Check out the source: github.com/Subhash-777\n%c📧 Want to hire me? subhashravichandran7432@gmail.com\n%c⌨️  Press Ctrl+K to open the command palette!',
      'color: #22c55e; font-size: 12px; font-weight: bold;',
      'color: #f59e0b; font-size: 11px;',
      'color: #8b5cf6; font-size: 11px;',
    );
  }, []);

  return (
    <>
      {children}
      <CommandPalette />
      <EasterEggProvider />
      <SystemToast />
    </>
  );
}

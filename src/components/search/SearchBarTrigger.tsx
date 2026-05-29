'use client';
// src/components/search/SearchBarTrigger.tsx
// Taskbar search pill — opens the command palette on click

import { Search, Command } from 'lucide-react';
import { useAppStore } from '@/store/app';

export function SearchBarTrigger() {
  const setPaletteOpen = useAppStore((s) => s.setPaletteOpen);

  return (
    <button
      onClick={() => setPaletteOpen(true)}
      className="w-full h-8 rounded-full border border-white/5 transition-all cursor-text
        flex items-center gap-2 px-3 hover:border-violet-500/30 hover:bg-white/[0.04]
        group focus:outline-none focus:border-violet-500/40"
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
      }}
      aria-label="Open command palette (Ctrl+K)"
    >
      <Search
        size={13}
        className="text-gray-500 group-hover:text-violet-400 transition-colors shrink-0"
      />
      <span className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors flex-1 text-left truncate">
        Search anything...
      </span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[9px] text-gray-600 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded font-mono shrink-0">
        <Command size={9} />K
      </kbd>
    </button>
  );
}

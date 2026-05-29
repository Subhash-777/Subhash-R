'use client';
// src/components/search/CommandPalette.tsx
// Full command palette overlay — the brain of SubhashOS search

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'cmdk';
import { Search, Terminal, Bot, HelpCircle, Hash, X, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';
import { useAppStore } from '@/store/app';
import { useRouter } from 'next/navigation';
import { routeInput } from '@/lib/search/inputRouter';
import { fuzzySearch, searchByCategory } from '@/lib/search/fuse';
import { findCommand, getAllCommands, getCommandsByCategory } from '@/lib/search/commandRegistry';
import { findEasterEgg } from '@/lib/search/easterEggRegistry';
import { checkWitchFactorCombo, incrementDeathCount, prefersReducedMotion } from '@/lib/search/easterEggEngine';
import { buildHelpSections } from '@/lib/search/helpIndex';
import { PaletteResults } from './PaletteResults';
import { PaletteHelpView } from './PaletteHelpView';
import { PaletteAIResponse } from './PaletteAIResponse';
import type { InputMode, SearchableItem, SearchResult } from '@/lib/search/types';

const MODE_ICONS = {
  search: Search,
  command: Terminal,
  ai: Bot,
  help: HelpCircle,
  category: Hash,
};

const MODE_LABELS: Record<InputMode, string> = {
  search: 'Search',
  command: 'Command',
  ai: 'AI Assistant',
  help: 'Help',
  category: 'Category Filter',
};

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, setActiveEgg, unlockAchievement, addToast, setBootComplete } = useAppStore();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<InputMode>('search');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [vimMode, setVimMode] = useState(false);
  const [vimBuffer, setVimBuffer] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [paletteOpen, setPaletteOpen]);

  // Reset state when opened
  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setTerminalOutput([]);
      setVimMode(false);
      setVimBuffer('');
    }
  }, [paletteOpen]);

  // Route input to determine mode
  useEffect(() => {
    const { mode: newMode } = routeInput(query);
    setMode(newMode);
    setTerminalOutput([]);
  }, [query]);

  // Compute search results
  const results = useMemo((): SearchResult[] => {
    if (!query.trim() || mode === 'help' || mode === 'ai') return [];

    const { cleanedQuery } = routeInput(query);

    if (mode === 'category') {
      const items = searchByCategory(cleanedQuery);
      return items.map((item) => ({ item, score: 0 }));
    }

    if (mode === 'command') {
      const cmds = getAllCommands().filter(
        (c) =>
          c.label.toLowerCase().includes(cleanedQuery.toLowerCase()) ||
          c.aliases.some((a) => a.includes(cleanedQuery.toLowerCase())) ||
          c.keywords.some((k) => k.includes(cleanedQuery.toLowerCase()))
      );
      return cmds.map((c) => ({
        item: {
          id: `cmd-${c.id}`,
          title: c.label,
          description: c.description,
          tags: c.keywords,
          type: c.category === 'easter-egg' ? ('easter-egg' as const) : ('command' as const),
          aliases: c.aliases,
          icon: c.icon,
        },
        score: 0,
      }));
    }

    return fuzzySearch(cleanedQuery, 20);
  }, [query, mode]);

  // Featured items for empty state
  const emptyStateItems = useMemo(() => {
    const navCmds = getCommandsByCategory('navigation');
    return navCmds.map((c) => ({
      item: {
        id: `cmd-${c.id}`,
        title: c.label,
        description: c.description,
        tags: c.keywords,
        type: 'command' as const,
        aliases: c.aliases,
        icon: c.icon,
      } as SearchableItem,
      score: 0,
    }));
  }, []);

  const displayResults = query.trim() ? results : emptyStateItems;

  const executeCommand = useCallback(
    (cmd: ReturnType<typeof findCommand>) => {
      if (!cmd) return;

      // Track in history
      setCommandHistory((h) => [cmd.label, ...h].slice(0, 10));

      // Navigation commands
      const navRoutes: Record<string, string> = {
        home: '/',
        projects: '/projects',
        research: '/research',
        resume: '/resume',
        contact: '/contact',
        'download-resume': '/resume',
      };

      if (navRoutes[cmd.id]) {
        setPaletteOpen(false);
        router.push(navRoutes[cmd.id]);
        return;
      }

      // Help / utility
      if (cmd.id === 'help' || cmd.id === 'shortcuts') {
        setQuery('help');
        return;
      }

      if (cmd.id === 'achievements') {
        const achievements = useAppStore.getState().achievements;
        setTerminalOutput(
          achievements.length > 0
            ? ['🏆 Unlocked Achievements:', ...achievements.map((a) => `  ✓ ${a}`)]
            : ['No achievements unlocked yet. Try some Easter eggs!']
        );
        return;
      }

      if (cmd.id === 'clear') {
        setQuery('');
        setTerminalOutput([]);
        return;
      }

      // Easter egg commands
      const eggOverlays = ['noir', 'binks', 'return-by-death', 'satella', 'gear5'];
      if (eggOverlays.includes(cmd.id)) {
        // Witch factor combo check
        const comboUnlocked = checkWitchFactorCombo(cmd.id);
        if (comboUnlocked) {
          unlockAchievement('witch-factor');
          addToast({
            id: `toast-${Date.now()}`,
            type: 'achievement',
            title: '🔮 Authority Bearer',
            message: 'Witch Factor Combo unlocked!',
            icon: '🔮',
          });
        }

        const egg = findEasterEgg(cmd.id);
        if (egg) {
          unlockAchievement(egg.achievementId);
          addToast({
            id: `toast-${Date.now()}`,
            type: 'achievement',
            title: `${egg.achievementName}`,
            message: `Easter egg "${egg.name}" discovered!`,
            icon: '🥚',
          });
        }

        if (cmd.id === 'return-by-death') {
          incrementDeathCount();
          setPaletteOpen(false);
          if (!prefersReducedMotion()) {
            setActiveEgg('return-by-death');
          } else {
            setBootComplete(false);
            setTimeout(() => setBootComplete(true), 3000);
          }
          return;
        }

        setPaletteOpen(false);
        if (!prefersReducedMotion()) {
          setActiveEgg(cmd.id as any);
        }
        return;
      }

      // Vim mode
      if (cmd.id === 'vim') {
        setVimMode(true);
        setVimBuffer('');
        setTerminalOutput([
          '~',
          '~ VIM - Vi IMproved',
          '~ SubhashOS Edition',
          '~ type :q! to quit',
          '"about.txt" [New File]',
        ]);
        unlockAchievement('vim-escape');
        return;
      }

      if (cmd.id === 'help-me') {
        const lines = cmd.run() as string[];
        setTerminalOutput(lines);
        setTimeout(() => {
          setPaletteOpen(false);
          router.push('/contact');
        }, 3000);
        return;
      }

      if (cmd.id === 'laugh-tale') {
        setTerminalOutput(['> Coordinates confirmed: Laugh Tale reached.', '> The One Piece... is REAL! 🏝️']);
        unlockAchievement('laugh-tale');
        addToast({
          id: `toast-${Date.now()}`,
          type: 'achievement',
          title: '🏝️ Pirate King',
          message: 'You found Laugh Tale!',
          icon: '🏝️',
        });
        import('canvas-confetti').then((confettiModule) => {
          const confetti = confettiModule.default;
          confetti({ particleCount: 150, spread: 180, origin: { y: 0.6 } });
        });
        return;
      }

      if (cmd.id === 'gear5') {
        setPaletteOpen(false);
        setActiveEgg('gear5');
        unlockAchievement('gear5');
        addToast({ id: `toast-${Date.now()}`, type: 'achievement', title: '☀️ Sun God Nika', message: 'Gear 5!', icon: '☀️' });
        return;
      }

      const output = cmd.run();
      if (typeof output === 'string') setTerminalOutput([output]);
      else if (Array.isArray(output)) setTerminalOutput(output);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, setPaletteOpen, setActiveEgg, unlockAchievement, addToast, setBootComplete]
  );

  const executeResult = useCallback((result: SearchResult) => {
    const item = result.item;
    if (item.type === 'command' || item.type === 'easter-egg') {
      const cmdId = item.id.replace('cmd-', '');
      const cmd = findCommand(cmdId) || findCommand(item.title);
      if (cmd) executeCommand(cmd);
      return;
    }
    if (item.route) {
      setPaletteOpen(false);
      router.push(item.route);
    }
  }, [router, setPaletteOpen, executeCommand]);

  const handleVimInput = useCallback((e: React.KeyboardEvent) => {
    if (!vimMode) return;
    e.preventDefault();
    if (e.key === 'Escape') { setVimBuffer(''); return; }
    if (e.key === 'Enter') {
      if ([':q!', ':wq', ':q'].includes(vimBuffer)) {
        setVimMode(false);
        setVimBuffer('');
        setTerminalOutput([...terminalOutput, '> Escaped Vim!']);
        unlockAchievement('vim-escape');
        addToast({ id: `toast-${Date.now()}`, type: 'achievement', title: '📟 Vim Escapist', message: 'Successfully exited Vim!', icon: '📟' });
      } else {
        setTerminalOutput([...terminalOutput, `E492: Not an editor command: ${vimBuffer}`]);
        setVimBuffer('');
      }
      return;
    }
    if (e.key === 'Backspace') setVimBuffer((b) => b.slice(0, -1));
    else if (e.key.length === 1) setVimBuffer((b) => b + e.key);
  }, [vimMode, vimBuffer, terminalOutput, unlockAchievement, addToast]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (vimMode) {
        handleVimInput(e);
        return;
      }

      if (e.key === 'Enter' && mode === 'command') {
        const { cleanedQuery } = routeInput(query);
        const cmd = findCommand(cleanedQuery);
        if (cmd) {
          executeCommand(cmd);
        }
      }
    },
    [vimMode, handleVimInput, mode, query, executeCommand]
  );

  const ModeIcon = MODE_ICONS[mode];

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {paletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9990] bg-black/40 backdrop-blur-md"
            onClick={() => setPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: '-55%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-55%', x: '-50%' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[9991] top-1/2 left-1/2 w-[94vw] max-w-[640px]"
          >
            <Command
              label="Command Palette"
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{
                background: 'rgba(20, 20, 35, 0.4)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 80px rgba(124, 58, 237, 0.15)',
              }}
              shouldFilter={false} // We handle our own filtering via Fuse.js / mode matching
              loop
            >
              {/* Input Area */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-500/10 text-violet-400 shrink-0">
                  <ModeIcon size={15} />
                </div>
                <Command.Input
                  autoFocus
                  value={vimMode ? vimBuffer : query}
                  onValueChange={(v) => { if (!vimMode) setQuery(v); }}
                  onKeyDown={handleKeyDown}
                  placeholder={vimMode ? ':' : 'Search anything...'}
                  className="flex-1 bg-transparent border-none outline-none text-[14px] text-gray-200 placeholder:text-gray-600 font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[9px] text-gray-600 font-mono px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                    {MODE_LABELS[mode]}
                  </span>
                  <button
                    onClick={() => setPaletteOpen(false)}
                    className="p-1 rounded-md hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                
                {/* Terminal Output */}
                {terminalOutput.length > 0 && (
                  <div className="px-4 py-3 border-b border-white/[0.04]">
                    <div className="font-mono text-[11px] space-y-0.5">
                      {terminalOutput.map((line, i) => (
                        <div key={i} className={line.startsWith('>') ? 'text-violet-400' : line.startsWith('[') ? 'text-green-400' : 'text-gray-400'}>
                          {line}
                        </div>
                      ))}
                    </div>
                    {vimMode && (
                      <div className="mt-1 text-[11px] font-mono text-gray-500">
                        :{vimBuffer}<span className="animate-blink text-violet-400">▋</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Help View */}
                {mode === 'help' && !terminalOutput.length && <PaletteHelpView />}

                {/* AI Response */}
                {mode === 'ai' && query.trim() && <PaletteAIResponse query={routeInput(query).cleanedQuery} />}

                {/* Search / Command Results */}
                {mode !== 'help' && mode !== 'ai' && !terminalOutput.length && (
                  <PaletteResults
                    results={displayResults}
                    onSelect={executeResult}
                    emptyQuery={!query.trim()}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] text-[10px] text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><ArrowUp size={10} /><ArrowDown size={10} /> navigate</span>
                  <span className="flex items-center gap-1"><CornerDownLeft size={10} /> select</span>
                  <span>esc close</span>
                </div>
                <span className="text-violet-500/60 font-mono">SubhashOS v1.0</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

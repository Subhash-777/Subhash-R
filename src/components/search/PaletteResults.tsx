'use client';
// src/components/search/PaletteResults.tsx
// Renders grouped search results inside the command palette using cmdk

import { Command } from 'cmdk';
import { FolderOpen, FlaskConical, FileText, Mail, Home, Terminal, Egg, Sparkles, Zap, GraduationCap } from 'lucide-react';
import type { SearchResult, SearchResultType } from '@/lib/search/types';

const TYPE_CONFIG: Record<SearchResultType, { label: string; color: string; icon: React.ElementType }> = {
  navigation: { label: 'Navigation', color: 'text-violet-400', icon: Home },
  project: { label: 'Projects', color: 'text-yellow-400', icon: FolderOpen },
  skill: { label: 'Skills', color: 'text-cyan-400', icon: Zap },
  research: { label: 'Research', color: 'text-green-400', icon: FlaskConical },
  resume: { label: 'Resume', color: 'text-blue-400', icon: GraduationCap },
  command: { label: 'Commands', color: 'text-orange-400', icon: Terminal },
  'easter-egg': { label: 'Easter Eggs', color: 'text-pink-400', icon: Egg },
  ai: { label: 'AI', color: 'text-emerald-400', icon: Sparkles },
};

const TYPE_ORDER: SearchResultType[] = [
  'navigation', 'command', 'easter-egg', 'project', 'skill', 'research', 'resume', 'ai',
];

interface Props {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  emptyQuery: boolean;
}

export function PaletteResults({ results, onSelect, emptyQuery }: Props) {
  // Group results by type
  const grouped = new Map<SearchResultType, SearchResult[]>();
  results.forEach((r) => {
    const type = r.item.type;
    if (!grouped.has(type)) grouped.set(type, []);
    grouped.get(type)!.push(r);
  });

  return (
    <Command.List className="py-1">
      <Command.Empty className="px-4 py-8 text-center text-gray-500 text-sm font-mono">
        <div className="mb-2">No results found</div>
        <div className="text-gray-600 text-xs">
          Try a different search term, or type <span className="text-violet-400">help</span> for commands
        </div>
      </Command.Empty>

      {emptyQuery && results.length > 0 && (
        <div className="px-4 py-2 text-[10px] text-gray-600 font-mono uppercase tracking-wider">
          Quick Actions
        </div>
      )}

      {TYPE_ORDER.map((type) => {
        const group = grouped.get(type);
        if (!group || group.length === 0) return null;
        const config = TYPE_CONFIG[type];

        return (
          <Command.Group 
            key={type} 
            heading={!emptyQuery ? config.label : undefined}
            className="[&:not(:last-child)]:mb-2"
          >
            {group.map((result) => {
              const IconComp = config.icon;

              return (
                <Command.Item
                  key={result.item.id}
                  value={result.item.id + " " + result.item.title}
                  onSelect={() => onSelect(result)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors outline-none cursor-pointer text-gray-400 aria-selected:bg-violet-500/10 aria-selected:text-white`}
                >
                  <span className={`text-sm shrink-0 opacity-50 group-aria-selected:opacity-100 group-aria-selected:${config.color}`}>
                    {result.item.icon || <IconComp size={14} />}
                  </span>
                  <div className="flex-1 min-w-0 pointer-events-none">
                    <div className="text-[13px] font-medium truncate">
                      {result.item.title}
                    </div>
                    <div className="text-[10px] text-gray-600 truncate mt-0.5">
                      {result.item.description}
                    </div>
                  </div>
                  <span className="text-[9px] text-violet-500 font-mono shrink-0 opacity-0 aria-selected:opacity-60 transition-opacity">
                    ↵
                  </span>
                </Command.Item>
              );
            })}
          </Command.Group>
        );
      })}
    </Command.List>
  );
}

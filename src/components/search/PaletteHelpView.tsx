'use client';
// src/components/search/PaletteHelpView.tsx
// Renders the help command view with grouped commands, eggs, and shortcuts using cmdk

import { buildHelpSections } from '@/lib/search/helpIndex';
import { useMemo } from 'react';
import { Command } from 'cmdk';

export function PaletteHelpView() {
  const sections = useMemo(() => buildHelpSections(), []);

  return (
    <Command.List className="py-2">
      {sections.map((section) => (
        <Command.Group 
          key={section.title} 
          heading={
            <div className="flex items-center gap-1.5 opacity-60">
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </div>
          }
          className="[&:not(:last-child)]:mb-2 px-0"
        >
          {section.items.map((item, i) => (
            <Command.Item
              key={`${section.title}-${i}`}
              value={`help-${item.command}`}
              className="flex items-center gap-3 px-4 py-1.5 text-[12px] aria-selected:bg-white/[0.05] transition-colors cursor-pointer outline-none"
            >
              <code className="text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded text-[10px] font-mono min-w-[100px] shrink-0">
                {item.command}
              </code>
              <span className="text-gray-500 flex-1 truncate text-[11px] group-aria-selected:text-gray-300">
                {item.description}
              </span>
              {item.aliases && item.aliases.length > 0 && (
                <span className="text-[9px] text-gray-700 font-mono truncate max-w-[120px]">
                  aka: {item.aliases.slice(0, 2).join(', ')}
                </span>
              )}
            </Command.Item>
          ))}
        </Command.Group>
      ))}

      <div className="px-4 py-3 text-center">
        <div className="text-[10px] text-gray-600 font-mono">
          💡 Tip: Prefix commands with <span className="text-violet-400">&gt;</span> in the search bar
        </div>
      </div>
    </Command.List>
  );
}

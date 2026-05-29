// src/lib/search/helpIndex.ts
// Builds grouped help data from command + Easter egg registries

import { getVisibleCommands, getCommandsByCategory } from './commandRegistry';
import { getVisibleEggs } from './easterEggRegistry';
import type { HelpSection, HelpItem } from './types';

export function buildHelpSections(): HelpSection[] {
  const sections: HelpSection[] = [
    {
      title: 'Navigation',
      icon: '🧭',
      items: getCommandsByCategory('navigation').map(cmdToHelpItem),
    },
    {
      title: 'Utility',
      icon: '🔧',
      items: getCommandsByCategory('utility').map(cmdToHelpItem),
    },
    {
      title: 'Media',
      icon: '🎵',
      items: getCommandsByCategory('media').map(cmdToHelpItem),
    },
    {
      title: 'System / Terminal',
      icon: '💻',
      items: getCommandsByCategory('system').map(cmdToHelpItem),
    },
    {
      title: 'Easter Eggs',
      icon: '🥚',
      items: getCommandsByCategory('easter-egg').map(cmdToHelpItem),
    },
    {
      title: 'Hidden Easter Eggs',
      icon: '🔮',
      items: getVisibleEggs()
        .filter((e) => e.visibility === 'hinted')
        .map((e) => ({
          command: '???',
          description: e.hintText,
          category: 'easter-egg' as const,
        })),
    },
    {
      title: 'Keyboard Shortcuts',
      icon: '⌨️',
      items: [
        { command: 'Ctrl+K / ⌘K', description: 'Open command palette', category: 'utility' as const },
        { command: 'Escape', description: 'Close palette', category: 'utility' as const },
        { command: '↑ / ↓', description: 'Navigate results', category: 'utility' as const },
        { command: 'Enter', description: 'Execute selected command', category: 'utility' as const },
        { command: '> prefix', description: 'Enter command mode', category: 'utility' as const },
        { command: '# prefix', description: 'Filter by category', category: 'utility' as const },
        { command: '? suffix', description: 'Ask AI a question', category: 'utility' as const },
      ],
    },
    {
      title: 'Input Modes',
      icon: '📝',
      items: [
        { command: 'Search anything...', description: 'Default fuzzy search across all content', category: 'utility' as const },
        { command: '>command', description: 'Execute a terminal command', category: 'utility' as const },
        { command: '#category', description: 'Filter results by type (e.g. #projects, #skills)', category: 'utility' as const },
        { command: 'Ask a question?', description: 'AI answers about Subhash (questions > 4 words or ending with ?)', category: 'utility' as const },
        { command: 'help', description: 'Show this help view', category: 'utility' as const },
      ],
    },
  ];

  return sections.filter((s) => s.items.length > 0);
}

function cmdToHelpItem(cmd: { id: string; label: string; description: string; aliases: string[]; category: string }): HelpItem {
  return {
    command: cmd.label,
    description: cmd.description,
    aliases: cmd.aliases.filter((a) => a !== cmd.label.toLowerCase()),
    category: cmd.category as HelpItem['category'],
  };
}

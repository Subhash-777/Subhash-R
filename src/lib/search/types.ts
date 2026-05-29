// src/lib/search/types.ts
// Shared types for the SubhashOS search, command, and Easter egg system

export type SearchResultType =
  | 'navigation'
  | 'project'
  | 'skill'
  | 'research'
  | 'resume'
  | 'command'
  | 'easter-egg'
  | 'ai';

export type InputMode = 'search' | 'command' | 'category' | 'ai' | 'help';

export type CommandCategory =
  | 'navigation'
  | 'utility'
  | 'media'
  | 'system'
  | 'easter-egg';

export type DangerLevel = 'safe' | 'cinematic' | 'fake-destructive';

export type EggVisibility = 'public' | 'hinted' | 'secret';

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  route?: string;
  section?: string;
  type: SearchResultType;
  aliases: string[];
  icon?: string;
}

export interface SearchResult {
  item: SearchableItem;
  score: number;
}

export interface Command {
  id: string;
  label: string;
  aliases: string[];
  description: string;
  category: CommandCategory;
  icon: string;
  keywords: string[];
  preview?: string;
  dangerLevel: DangerLevel;
  visibleInHelp: boolean;
  run: (args?: string) => void | Promise<void> | string | string[];
}

export interface EasterEgg {
  id: string;
  name: string;
  triggers: string[];
  description: string;
  hintText: string;
  visibility: EggVisibility;
  achievementId: string;
  achievementName: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface Toast {
  id: string;
  type: 'achievement' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  icon?: string;
  duration?: number;
}

export interface AIResponse {
  answer: string;
  suggestions: string[];
  sources?: string[];
  error?: boolean;
}

export interface HelpSection {
  title: string;
  icon: string;
  items: HelpItem[];
}

export interface HelpItem {
  command: string;
  description: string;
  aliases?: string[];
  category: CommandCategory;
}

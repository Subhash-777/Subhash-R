// src/lib/search/inputRouter.ts
// Parses user input and determines which mode to route to

import type { InputMode } from './types';

interface RoutedInput {
  mode: InputMode;
  cleanedQuery: string;
}

const QUESTION_STARTERS = [
  'who', 'what', 'how', 'where', 'when', 'why',
  'tell me', 'can', 'does', 'is he', 'is subhash',
  'which', 'show me', 'explain',
];

const HELP_TRIGGERS = ['help', '?', 'commands', 'shortcuts', 'eggs'];

const CATEGORY_PREFIXES = [
  '#projects', '#skills', '#research', '#resume',
  '#ai', '#devops', '#cloud', '#ml', '#backend',
  '#frontend', '#iot', '#robotics', '#nlp',
];

export function routeInput(query: string): RoutedInput {
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  // Empty input
  if (!trimmed) {
    return { mode: 'search', cleanedQuery: '' };
  }

  // Help mode
  if (HELP_TRIGGERS.includes(lower)) {
    return { mode: 'help', cleanedQuery: lower };
  }

  // Command mode (starts with >)
  if (trimmed.startsWith('>')) {
    return { mode: 'command', cleanedQuery: trimmed.slice(1).trim() };
  }

  // Category filter mode (starts with #)
  if (trimmed.startsWith('#')) {
    return { mode: 'category', cleanedQuery: trimmed.slice(1).trim() };
  }

  // Check if it looks like a question (AI mode)
  const isQuestion = lower.endsWith('?') ||
    QUESTION_STARTERS.some(s => lower.startsWith(s)) ||
    (lower.split(/\s+/).length > 4 && /[a-z]/.test(lower));

  if (isQuestion) {
    return { mode: 'ai', cleanedQuery: trimmed };
  }

  // Default: fuzzy search
  return { mode: 'search', cleanedQuery: trimmed };
}

export function getCategoryFromHash(hash: string): string {
  const normalized = hash.toLowerCase().replace('#', '');
  const map: Record<string, string> = {
    'projects': 'project',
    'skills': 'skill',
    'research': 'research',
    'resume': 'resume',
    'ai': 'ai-ml',
    'devops': 'devops',
    'cloud': 'cloud',
    'ml': 'ai-ml',
    'backend': 'backend',
    'frontend': 'frontend',
    'iot': 'iot',
    'robotics': 'robotics',
    'nlp': 'nlp',
  };
  return map[normalized] || normalized;
}

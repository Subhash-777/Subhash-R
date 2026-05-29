// src/lib/search/fuse.ts
// Fuse.js fuzzy search instance over the normalized search index

import Fuse from 'fuse.js';
import { getSearchIndex } from './searchIndex';
import type { SearchableItem, SearchResult } from './types';

let fuseInstance: Fuse<SearchableItem> | null = null;

function getFuse(): Fuse<SearchableItem> {
  if (fuseInstance) return fuseInstance;

  const index = getSearchIndex();

  fuseInstance = new Fuse(index, {
    keys: [
      { name: 'title', weight: 1.0 },
      { name: 'aliases', weight: 0.9 },
      { name: 'tags', weight: 0.8 },
      { name: 'description', weight: 0.7 },
    ],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
    findAllMatches: true,
  });

  return fuseInstance;
}

export function fuzzySearch(query: string, limit = 20): SearchResult[] {
  const fuse = getFuse();
  const results = fuse.search(query, { limit });

  return results.map((r) => ({
    item: r.item,
    score: r.score ?? 1,
  }));
}

export function searchByCategory(category: string): SearchableItem[] {
  const index = getSearchIndex();
  return index.filter(
    (item) =>
      item.tags.some((t) => t.toLowerCase().includes(category.toLowerCase())) ||
      item.type === category
  );
}

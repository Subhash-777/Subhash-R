'use client';
// src/components/search/PaletteAIResponse.tsx
// AI answer card with streaming-style display and suggestion chips

import { useState, useEffect, useCallback } from 'react';
import { Bot, Loader2, AlertCircle } from 'lucide-react';
import type { AIResponse } from '@/lib/search/types';

const SUGGESTION_CHIPS = [
  'Who is Subhash?',
  'What are his main skills?',
  'What projects should I see?',
  'Is he available for work?',
  'How to contact him?',
  'What stack does he use for AI?',
];

interface Props {
  query: string;
}

export function PaletteAIResponse({ query }: Props) {
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const fetchAnswer = useCallback(async (q: string) => {
    if (!q.trim() || q.length < 3) return;
    if (q === activeQuery) return;

    setActiveQuery(q);
    setLoading(true);
    setDisplayedText('');
    setResponse(null);

    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) throw new Error('API error');

      const data: AIResponse = await res.json();
      setResponse(data);

      // Typewriter effect
      if (data.answer) {
        let i = 0;
        const interval = setInterval(() => {
          if (i <= data.answer.length) {
            setDisplayedText(data.answer.slice(0, i));
            i++;
          } else {
            clearInterval(interval);
          }
        }, 12);
        return () => clearInterval(interval);
      }
    } catch {
      setResponse({
        answer: 'SubhashOS Assistant is taking a break. Try searching locally instead.',
        suggestions: [],
        error: true,
      });
      setDisplayedText('SubhashOS Assistant is taking a break. Try searching locally instead.');
    } finally {
      setLoading(false);
    }
  }, [activeQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAnswer(query);
    }, 500); // Debounce
    return () => clearTimeout(timeout);
  }, [query, fetchAnswer]);

  return (
    <div className="px-4 py-3">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 py-4">
          <Loader2 size={14} className="text-violet-400 animate-spin" />
          <span className="text-[12px] text-gray-500 font-mono">Asking SubhashOS Assistant...</span>
        </div>
      )}

      {/* Answer */}
      {!loading && displayedText && (
        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0 mt-0.5">
              {response?.error ? (
                <AlertCircle size={13} className="text-red-400" />
              ) : (
                <Bot size={13} className="text-violet-400" />
              )}
            </div>
            <div className={`text-[12px] leading-relaxed font-mono ${response?.error ? 'text-red-400/70' : 'text-gray-300'}`}>
              {displayedText}
              {displayedText.length < (response?.answer.length || 0) && (
                <span className="animate-blink text-violet-400">▋</span>
              )}
            </div>
          </div>

          {/* Suggestion chips */}
          {response && !response.error && response.suggestions && response.suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {response.suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => fetchAnswer(s)}
                  className="text-[10px] text-violet-400/70 bg-violet-500/10 hover:bg-violet-500/20 px-2 py-1 rounded-full font-mono transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial suggestion chips */}
      {!loading && !displayedText && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bot size={13} className="text-violet-400/50" />
            <span className="text-[11px] text-gray-600 font-mono">Ask me about Subhash...</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTION_CHIPS.map((chip, i) => (
              <button
                key={i}
                onClick={() => fetchAnswer(chip)}
                className="text-[10px] text-gray-500 bg-white/[0.03] hover:bg-violet-500/10 hover:text-violet-400 px-2.5 py-1.5 rounded-full font-mono transition-colors border border-white/[0.04]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

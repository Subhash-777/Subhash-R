'use client';
// src/components/search/effects/BinksOverlay.tsx
// Bink's Sake — hidden audio + pirate ship + floating messages

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/app';

const FLOATING_MESSAGES = [
  '🏴‍☠️ Yo-hohoho!',
  '🍶 Bink\'s Sake!',
  '⚓ Set sail!',
  '🌊 To the sea!',
  '☠️ We are pirates!',
  '🎵 Sing along!',
  '🗺️ Grand Line awaits!',
  '⛵ Raise the flag!',
];

export function BinksOverlay() {
  const setActiveEgg = useAppStore((s) => s.setActiveEgg);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [messages, setMessages] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [shipPos, setShipPos] = useState(-200);
  const msgIdRef = useRef(0);

  // Try to play audio (graceful if file doesn't exist)
  useEffect(() => {
    const audio = new Audio('/audio/easter-eggs/binks.mp3');
    audio.volume = 0.3;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Audio file not available — continue silently
    });

    audio.addEventListener('ended', () => {
      setActiveEgg(null);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [setActiveEgg]);

  // Animate ship across screen
  useEffect(() => {
    const interval = setInterval(() => {
      setShipPos((p) => {
        if (p > window.innerWidth + 200) {
          return -200;
        }
        return p + 1.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Float random messages
  useEffect(() => {
    const interval = setInterval(() => {
      const id = msgIdRef.current++;
      const msg = FLOATING_MESSAGES[Math.floor(Math.random() * FLOATING_MESSAGES.length)];
      setMessages((prev) => [
        ...prev.slice(-6),
        {
          id,
          text: msg,
          x: 10 + Math.random() * 80,
          y: 20 + Math.random() * 60,
        },
      ]);
      // Remove after 3s
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }, 3000);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto dismiss after 60s
  useEffect(() => {
    const timer = setTimeout(() => setActiveEgg(null), 60000);
    return () => clearTimeout(timer);
  }, [setActiveEgg]);

  const dismiss = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setActiveEgg(null);
  }, [setActiveEgg]);

  return (
    <div
      className="fixed inset-0 z-[9980] pointer-events-auto cursor-pointer"
      onClick={dismiss}
    >
      {/* Pirate ship SVG sailing across bottom */}
      <div
        className="absolute bottom-16 transition-none"
        style={{
          left: `${shipPos}px`,
          transform: 'scaleX(-1)',
          opacity: 0.6,
        }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          {/* Hull */}
          <path d="M10 60 Q20 75 60 75 Q100 75 110 60 L100 55 L20 55 Z" fill="#4a3520" stroke="#6b4c30" strokeWidth="1" />
          {/* Mast */}
          <line x1="60" y1="55" x2="60" y2="10" stroke="#8b6c50" strokeWidth="2.5" />
          {/* Sail */}
          <path d="M62 15 Q80 30 62 50" fill="#f5f0e8" stroke="#d4c8b0" strokeWidth="0.5" opacity="0.9" />
          {/* Flag */}
          <rect x="57" y="8" width="12" height="8" fill="#1a1a2e" rx="1" />
          <text x="63" y="14" fill="white" fontSize="6" textAnchor="middle">☠</text>
          {/* Water line */}
          <path d="M0 68 Q15 63 30 68 Q45 73 60 68 Q75 63 90 68 Q105 73 120 68" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
      </div>

      {/* Floating messages */}
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 0.7, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute text-[14px] font-mono text-violet-300/60 pointer-events-none"
            style={{ left: `${msg.x}%`, top: `${msg.y}%` }}
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dismiss hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-600 font-mono">
        Click anywhere to dismiss
      </div>
    </div>
  );
}

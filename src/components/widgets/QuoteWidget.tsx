'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  "Build. Break. Learn. Repeat.",
  "Code is poetry in motion.",
  "Ship fast, iterate faster.",
  "The best time to start was yesterday.",
];

export function QuoteWidget() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % QUOTES.length), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card p-4 min-h-[100px] flex items-center justify-center text-center italic font-mono text-xs text-gray-400">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.5 }}
        >
          "{QUOTES[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

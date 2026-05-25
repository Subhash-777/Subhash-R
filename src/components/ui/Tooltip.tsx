'use client';
import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 px-2 py-1 bg-black/90 border border-white/10 text-[10px] text-gray-300 rounded whitespace-nowrap z-50"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';
// src/components/search/effects/SystemToast.tsx
// OS-style toast notification system

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/app';
import { X } from 'lucide-react';

const TOAST_COLORS = {
  achievement: 'border-violet-500/40 bg-violet-500/10',
  info: 'border-blue-500/40 bg-blue-500/10',
  success: 'border-green-500/40 bg-green-500/10',
  warning: 'border-yellow-500/40 bg-yellow-500/10',
};

export function SystemToast() {
  const { toasts, removeToast } = useAppStore();

  // Auto-dismiss
  useEffect(() => {
    toasts.forEach((toast) => {
      const duration = toast.duration || 4000;
      const timer = setTimeout(() => removeToast(toast.id), duration);
      return () => clearTimeout(timer);
    });
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 max-w-xs">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border backdrop-blur-xl ${TOAST_COLORS[toast.type]}`}
            style={{
              background: 'rgba(13, 13, 26, 0.9)',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.1), 0 8px 25px rgba(0, 0, 0, 0.3)',
            }}
          >
            {toast.icon && <span className="text-lg shrink-0 mt-0.5">{toast.icon}</span>}
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-gray-200 truncate">{toast.title}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 truncate">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-0.5 rounded hover:bg-white/5 text-gray-600 hover:text-gray-400 transition-colors"
            >
              <X size={10} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

'use client';
// src/components/search/effects/SatellaOverlay.tsx
// Satella — dark cinematic overlay with shadow hands and YouTube embed

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/app';
import { X } from 'lucide-react';

export function SatellaOverlay() {
  const setActiveEgg = useAppStore((s) => s.setActiveEgg);
  const [phase, setPhase] = useState<'darkness' | 'hands' | 'modal' | 'video'>('darkness');
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Phase 1: Darkness (0-1.5s)
    const handsTimer = setTimeout(() => setPhase('hands'), 1500);
    // Phase 2: Shadow hands (1.5-3.5s)
    const modalTimer = setTimeout(() => setPhase('modal'), 3500);
    // Phase 3: Modal text (3.5-6s)
    const videoTimer = setTimeout(() => setPhase('video'), 6000);

    return () => {
      clearTimeout(handsTimer);
      clearTimeout(modalTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  const dismiss = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setVisible(false);
      setActiveEgg(null);
    }, 1500);
  }, [setActiveEgg]);


  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9985] pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isFadingOut ? 1.5 : 0.5 }}
        >
          {/* Dark background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(60, 10, 80, 0.4) 0%, rgba(0, 0, 0, 0.95) 70%)',
            }}
          />

          {/* Purple shadow spread animation */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'darkness' ? 0.6 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.15) 0%, transparent 70%)',
              animation: 'satellaSpread 3s ease-in-out infinite',
            }}
          />

          {/* Shadow hands (SVG) */}
          {(phase === 'hands' || phase === 'modal' || phase === 'video') && (
            <>
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 0.4 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-50">
                  <path
                    d="M0 200 Q40 180 60 150 Q80 120 70 80 Q85 100 90 140 Q95 110 100 70 Q110 100 108 140 Q115 105 120 60 Q125 95 118 140 Q130 120 135 90 Q135 120 125 160 Q140 180 140 200 Q140 240 120 270 Q80 300 0 280"
                    fill="rgba(60, 10, 80, 0.6)"
                    stroke="rgba(109, 40, 217, 0.3)"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 0.4 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ transform: 'scaleX(-1) translateY(-50%)' }}
              >
                <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-50">
                  <path
                    d="M0 200 Q40 180 60 150 Q80 120 70 80 Q85 100 90 140 Q95 110 100 70 Q110 100 108 140 Q115 105 120 60 Q125 95 118 140 Q130 120 135 90 Q135 120 125 160 Q140 180 140 200 Q140 240 120 270 Q80 300 0 280"
                    fill="rgba(60, 10, 80, 0.6)"
                    stroke="rgba(109, 40, 217, 0.3)"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
            </>
          )}

          {/* Modal text */}
          {phase === 'modal' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');`}
              </style>
              <div
                className="text-center px-8"
                style={{ textShadow: '0 0 30px rgba(109, 40, 217, 0.8)' }}
              >
                <div 
                  className="text-6xl md:text-8xl text-violet-200 mb-6"
                  style={{ fontFamily: "'Creepster', cursive" }}
                >
                  &ldquo;I can return by death...&rdquo;
                </div>
              </div>
            </motion.div>
          )}

          {/* YouTube embed */}
          {phase === 'video' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-2 md:p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full max-w-[95vw] md:max-w-7xl aspect-video rounded-xl overflow-hidden border border-violet-500/20 shadow-[0_0_120px_rgba(109,40,217,0.4)] bg-black flex items-center justify-center">
                <video
                  src="/videos/satella.mp4"
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                  onEnded={dismiss}
                />
              </div>
            </motion.div>
          )}

          {/* Close button (always visible) */}
          <button
            onClick={dismiss}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

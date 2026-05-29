'use client';
// src/components/search/effects/NoirOverlay.tsx
// Spider-Noir mode — grayscale, rain, grain, vignette, quotes

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app';

const NOIR_QUOTES = [
  'Wherever I go the wind follows, and the wind smells like rain.',
  'I like to drink egg creams and I like to punch Nazis. A lot.',
  'Surprise attack.',
  'We don\'t pick the ballroom. We just dance.',
  'Sometimes the best way to find the truth is to look in the dark.',
];

export function NoirOverlay() {
  const setActiveEgg = useAppStore((s) => s.setActiveEgg);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Apply grayscale filter to root
  useEffect(() => {
    document.documentElement.style.filter = 'grayscale(1) contrast(1.15) brightness(0.9)';
    document.documentElement.style.transition = 'filter 0.8s ease';

    return () => {
      document.documentElement.style.filter = '';
      document.documentElement.style.transition = '';
    };
  }, []);

  // Rain canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];
    for (let i = 0; i < 150; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 8 + Math.random() * 12,
        length: 15 + Math.random() * 25,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
        ctx.strokeStyle = `rgba(200, 200, 220, ${drop.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((i) => (i + 1) % NOIR_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss after 30s
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setActiveEgg(null), 800);
    }, 30000);
    return () => clearTimeout(timer);
  }, [setActiveEgg]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => setActiveEgg(null), 800);
  }, [setActiveEgg]);

  return (
    <motion.div
      className="fixed inset-0 z-[9980] pointer-events-auto cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      onClick={dismiss}
      style={{ mixBlendMode: 'normal' }}
    >
      {/* Rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          animation: 'noirGrain 0.3s steps(4) infinite',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Projector flicker */}
      <div
        className="absolute inset-0 bg-white/[0.02]"
        style={{ animation: 'noirFlicker 0.15s infinite alternate' }}
      />

      {/* Quote */}
      <div className="absolute bottom-20 left-0 right-0 text-center px-8">
        <motion.div
          key={quoteIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-gray-300 text-lg md:text-xl font-serif italic max-w-2xl mx-auto"
          style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
        >
          &ldquo;{NOIR_QUOTES[quoteIdx]}&rdquo;
        </motion.div>
      </div>

      {/* Earth-90214 badge */}
      <div className="absolute top-6 right-6 text-[10px] font-mono text-gray-500 bg-black/50 px-2 py-1 rounded border border-gray-700">
        Earth-90214
      </div>

      {/* Click to dismiss hint */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-gray-600 font-mono">
        Click anywhere to dismiss · Auto-restores in 30s
      </div>
    </motion.div>
  );
}

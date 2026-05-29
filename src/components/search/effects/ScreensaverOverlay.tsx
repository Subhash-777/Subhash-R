'use client';
// src/components/search/effects/ScreensaverOverlay.tsx
// DVD-style bouncing SubhashOS logo

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAppStore } from '@/store/app';

const COLORS = [
  '#7c3aed', '#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#06b6d4',
];

export function ScreensaverOverlay() {
  const setActiveEgg = useAppStore((s) => s.setActiveEgg);
  const unlockAchievement = useAppStore((s) => s.unlockAchievement);
  const addToast = useAppStore((s) => s.addToast);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef({ x: 100, y: 100, dx: 2, dy: 2, colorIdx: 0 });

  useEffect(() => {
    // Unlock achievement
    unlockAchievement('screensaver');
    addToast({
      id: `toast-${Date.now()}`,
      type: 'achievement',
      title: '😴 Idle Champion',
      message: 'Screensaver activated!',
      icon: '😴',
    });
  }, [unlockAchievement, addToast]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const logoWidth = 220;
    const logoHeight = 40;

    function animate() {
      if (!ctx || !canvas) return;
      const pos = posRef.current;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw logo
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.fillStyle = COLORS[pos.colorIdx];
      ctx.shadowColor = COLORS[pos.colorIdx];
      ctx.shadowBlur = 20;
      ctx.fillText('SubhashOS', pos.x, pos.y);
      ctx.shadowBlur = 0;

      // Move
      pos.x += pos.dx;
      pos.y += pos.dy;

      // Bounce
      if (pos.x <= 0 || pos.x + logoWidth >= canvas.width) {
        pos.dx *= -1;
        pos.colorIdx = (pos.colorIdx + 1) % COLORS.length;
      }
      if (pos.y - logoHeight <= 0 || pos.y >= canvas.height) {
        pos.dy *= -1;
        pos.colorIdx = (pos.colorIdx + 1) % COLORS.length;
      }

      animRef.current = requestAnimationFrame(animate);
    }

    // Clear to black first
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const dismiss = useCallback(() => {
    setActiveEgg(null);
  }, [setActiveEgg]);

  return (
    <div
      className="fixed inset-0 z-[9980] cursor-pointer"
      onClick={dismiss}
      onMouseMove={dismiss}
      onKeyDown={dismiss}
      tabIndex={0}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-700 font-mono">
        Move mouse or press any key to dismiss
      </div>
    </div>
  );
}

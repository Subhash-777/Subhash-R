'use client';
// src/components/search/effects/ReturnByDeathOverlay.tsx
// Return by Death — freeze, glitch, title card, reboot

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/app';
import { getDeathCount } from '@/lib/search/easterEggEngine';

const ClawTearEffect = () => (
  <svg className="w-full h-full drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="bloodyTear" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        
        <feGaussianBlur in="displaced" stdDeviation="4" result="blur1" />
        <feGaussianBlur in="displaced" stdDeviation="15" result="blur2" />
        
        <feMerge>
          <feMergeNode in="blur2" /> 
          <feMergeNode in="blur1" /> 
          <feMergeNode in="displaced" /> 
        </feMerge>
      </filter>

      <clipPath id="wipe1">
        <motion.rect x="0" y="0" width="1000" height="0"
          initial={{ height: 0 }} animate={{ height: 1000 }} transition={{ duration: 0.15, ease: "linear" }} />
      </clipPath>
      <clipPath id="wipe2">
        <motion.rect x="0" y="0" width="1000" height="0"
          initial={{ height: 0 }} animate={{ height: 1000 }} transition={{ duration: 0.15, ease: "linear", delay: 0.08 }} />
      </clipPath>
      <clipPath id="wipe3">
        <motion.rect x="0" y="0" width="1000" height="0"
          initial={{ height: 0 }} animate={{ height: 1000 }} transition={{ duration: 0.15, ease: "linear", delay: 0.16 }} />
      </clipPath>
    </defs>

    <g filter="url(#bloodyTear)">
      <g clipPath="url(#wipe1)">
        <path d="M 280 250 Q 300 350, 360 500 Q 400 650, 440 750 Q 380 600, 320 450 Q 250 300, 280 250 Z" fill="#990000" />
        <path d="M 290 270 Q 310 370, 370 520 Q 410 670, 430 730 Q 390 580, 330 470 Q 260 320, 290 270 Z" fill="#ff0000" />
      </g>
      
      <g clipPath="url(#wipe2)">
        <path d="M 400 80 Q 430 250, 520 500 Q 580 700, 620 850 Q 540 650, 480 450 Q 380 200, 400 80 Z" fill="#990000" />
        <path d="M 410 100 Q 440 270, 530 520 Q 590 720, 610 830 Q 550 670, 490 470 Q 390 220, 410 100 Z" fill="#ff0000" />
        <path d="M 420 120 Q 450 290, 540 540 Q 600 740, 605 800 Q 560 690, 500 490 Q 400 240, 420 120 Z" fill="#ffffff" opacity="0.6" />
      </g>

      <g clipPath="url(#wipe3)">
        <path d="M 580 150 Q 600 300, 660 480 Q 700 600, 740 700 Q 680 550, 630 400 Q 550 250, 580 150 Z" fill="#990000" />
        <path d="M 590 170 Q 610 320, 670 500 Q 710 620, 730 680 Q 690 570, 640 420 Q 560 270, 590 170 Z" fill="#ff0000" />
      </g>
    </g>
  </svg>
);

export function ReturnByDeathOverlay() {
  const { setActiveEgg, setBootComplete } = useAppStore();
  const [phase, setPhase] = useState<'freeze' | 'glow' | 'dark' | 'tear' | 'title' | 'reboot'>('freeze');
  const deathCount = getDeathCount();

  useEffect(() => {
    const audio = new Audio('/audio/easter-eggs/heartbeat.mp3');
    audio.loop = true;
    audio.playbackRate = 1.0;
    audio.play().catch(console.error);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const glowTimer = setTimeout(() => setPhase('glow'), 1000); // 1.0s
    const darkTimer = setTimeout(() => setPhase('dark'), 2000); // 2.0s
    const tearTimer = setTimeout(() => setPhase('tear'), 2200); // 2.2s
    const titleTimer = setTimeout(() => setPhase('title'), 3500); // 3.5s
    const rebootTimer = setTimeout(() => {
      setPhase('reboot');
      
      if ((window as any).masterBootTimeline) {
        const tl = (window as any).masterBootTimeline;
        tl.timeScale(4).reverse();
        
        setTimeout(() => {
          setBootComplete(false);
          setActiveEgg(null);
        }, tl.time() * 1000 / 4 + 100);
      } else {
        setBootComplete(false);
        setActiveEgg(null);
      }
    }, 10000); 

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(darkTimer);
      clearTimeout(tearTimer);
      clearTimeout(titleTimer);
      clearTimeout(rebootTimer);
    };
  }, [setActiveEgg, setBootComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9985] pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={
        phase === 'tear'
          ? {
              opacity: 1,
              x: [0, -20, 20, -15, 15, -10, 10, -5, 5, 0],
              y: [0, 20, -20, 15, -15, 10, -10, 5, -5, 0],
              scale: 1.05,
              filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
            }
          : { opacity: 1, x: 0, y: 0, scale: 1, filter: 'brightness(1)' }
      }
      transition={{ duration: phase === 'tear' ? 0.3 : 0.2 }}
      exit={{ opacity: 0 }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');`}
      </style>

      <div
        className="absolute inset-0"
        style={{
          background: phase === 'tear'
            ? 'radial-gradient(ellipse at center, rgba(120, 0, 0, 0.3) 0%, rgba(10, 0, 0, 0.95) 100%)'
            : phase === 'dark' || phase === 'title'
            ? '#000000'
            : phase === 'glow'
            ? 'radial-gradient(ellipse at center, transparent 30%, rgba(109, 40, 217, 0.3) 70%, rgba(109, 40, 217, 0.6) 100%)'
            : 'rgba(0, 0, 0, 0.8)',
          transition: phase === 'dark' || phase === 'tear' || phase === 'title' ? 'none' : 'background 1s ease',
          animation: phase === 'glow' ? 'rbdPulse 1.5s ease-in-out infinite' : undefined,
        }}
      />

      <AnimatePresence>
        {(phase === 'tear' || phase === 'title') && (
          <motion.div
            className="absolute inset-0 z-[9990] pointer-events-none mix-blend-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'title' ? 0 : 1 }}
            transition={{ duration: phase === 'title' ? 3 : 0, ease: "easeOut" }}
          >
            <ClawTearEffect />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'glow' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-violet-400/30"
              animate={{
                y: [0, window.innerHeight],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {phase === 'title' && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-[9995]"
          initial={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <div className="relative inline-block text-center" style={{ fontFamily: "'Creepster', cursive" }}>
            <div
              className="text-6xl md:text-9xl text-white tracking-widest"
              style={{ textShadow: '0 0 40px rgba(109, 40, 217, 1)' }}
            >
              RETURN BY DEATH
            </div>
            
            <div
              className="absolute top-0 left-0 text-6xl md:text-9xl text-white tracking-widest opacity-70 pointer-events-none"
              style={{
                textShadow: '-4px 0 rgba(0, 255, 255, 0.7), 4px 0 rgba(109, 40, 217, 0.7)',
                animation: 'rbdGlitch 0.2s steps(3) infinite',
                mixBlendMode: 'screen'
              }}
            >
              RETURN BY DEATH
            </div>

            <div
              className="absolute top-0 left-0 text-6xl md:text-9xl text-white tracking-widest opacity-70 pointer-events-none"
              style={{
                textShadow: '4px 0 rgba(255, 0, 255, 0.7), -4px 0 rgba(109, 40, 217, 0.7)',
                animation: 'rbdGlitch 0.3s steps(2) infinite reverse',
                mixBlendMode: 'screen'
              }}
            >
              RETURN BY DEATH
            </div>
          </div>
          
          <motion.div 
            className="mt-8 text-xl md:text-3xl text-violet-400 font-mono tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Death Count: {deathCount}
          </motion.div>
          <motion.div 
            className="mt-4 text-lg md:text-xl text-gray-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Rewinding timeline...
          </motion.div>
        </motion.div>
      )}

      {phase === 'reboot' && (
        <motion.div
          className="absolute inset-0 bg-black z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

'use client';
// src/components/search/effects/NoirOverlay.tsx
// Spider-Noir mode — grayscale, rain, grain, vignette, quotes, audio, spotlight

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/app';

const NOIR_QUOTES = [
  'Wherever I go the wind follows, and the wind smells like rain.',
  'I like to drink egg creams and I like to punch Nazis. A lot.',
  'Surprise attack.',
  'We don\'t pick the ballroom. We just dance.',
  'Sometimes the best way to find the truth is to look in the dark.',
];

// Typewriter text component
function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 40); // typing speed
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
}

// Web Audio API hooks for Rain and Thunder
function useNoirAudio(visible: boolean) {
  useEffect(() => {
    if (!visible) return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    try {
      const ctx = new AudioContext();
      
      // Rain Noise (White Noise + Lowpass)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;
      noiseSrc.loop = true;
      
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 1000;
      
      const rainGain = ctx.createGain();
      rainGain.gain.value = 0.05; // Soft rain
      
      noiseSrc.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(ctx.destination);
      noiseSrc.start();
      
      // Thunder rumble generator
      let thunderInterval: NodeJS.Timeout;
      const playThunder = () => {
        if (ctx.state !== 'running') return;
        const osc = ctx.createOscillator();
        const tGain = ctx.createGain();
        const tFilter = ctx.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(40, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 3);
        
        tFilter.type = 'lowpass';
        tFilter.frequency.value = 200;
        
        tGain.gain.setValueAtTime(0, ctx.currentTime);
        tGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.5);
        tGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
        
        osc.connect(tFilter);
        tFilter.connect(tGain);
        tGain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 3);
        
        thunderInterval = setTimeout(playThunder, 8000 + Math.random() * 10000);
      };
      
      thunderInterval = setTimeout(playThunder, 2000);

      return () => {
        noiseSrc.stop();
        noiseSrc.disconnect();
        clearTimeout(thunderInterval);
        ctx.close();
      };
    } catch (e) {
      console.warn("Web Audio API failed to initialize", e);
    }
  }, [visible]);
}

export function NoirOverlay() {
  const setActiveEgg = useAppStore((s) => s.setActiveEgg);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [lightning, setLightning] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useNoirAudio(visible);

  // Apply grayscale filter to root
  useEffect(() => {
    document.documentElement.style.filter = 'grayscale(1) contrast(1.15) brightness(0.9)';
    document.documentElement.style.transition = 'filter 0.8s ease';

    return () => {
      document.documentElement.style.filter = '';
      document.documentElement.style.transition = '';
    };
  }, []);

  // Track mouse for flashlight spotlight
  useEffect(() => {
    // Initial center position if mouse hasn't moved
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lightning flashes
  useEffect(() => {
    if (!visible) return;
    const triggerLightning = () => {
      setLightning(0.8);
      setTimeout(() => setLightning(0.2), 50);
      setTimeout(() => setLightning(0.6), 100);
      setTimeout(() => setLightning(0), 150);
      const nextTime = 5000 + Math.random() * 15000;
      lightningTimer = setTimeout(triggerLightning, nextTime);
    };
    let lightningTimer = setTimeout(triggerLightning, 3000);
    return () => clearTimeout(lightningTimer);
  }, [visible]);

  // Rain canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

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
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((i) => (i + 1) % NOIR_QUOTES.length);
    }, 6000); // 6 seconds to give time for typing
    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss after 40s
  useEffect(() => {
    const timer = setTimeout(() => {
      dismiss();
    }, 40000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => setActiveEgg(null), 800);
  }, [setActiveEgg]);

  return (
    <motion.div
      className="fixed inset-0 z-[9980] pointer-events-auto overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ mixBlendMode: 'normal' }}
    >
      {/* Background layer click to dismiss */}
      <div className="absolute inset-0 cursor-pointer" onClick={dismiss} />

      {/* Rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Lightning Flash Overlay */}
      <div 
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ opacity: lightning, transition: 'opacity 0.05s ease-out' }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          animation: 'noirGrain 0.3s steps(4) infinite',
        }}
      />

      {/* Flashlight Spotlight Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.85) 100%)`,
        }}
      />

      {/* Projector flicker */}
      <div
        className="absolute inset-0 bg-white/[0.02] pointer-events-none"
        style={{ animation: 'noirFlicker 0.15s infinite alternate' }}
      />

      {/* Quote */}
      <div className="absolute bottom-20 left-0 right-0 text-center px-8 pointer-events-none z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-gray-200 text-lg md:text-xl font-serif italic max-w-2xl mx-auto drop-shadow-[0_0_8px_rgba(0,0,0,1)]"
          >
            &ldquo;<TypewriterText text={NOIR_QUOTES[quoteIdx]} />&rdquo;
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Earth-90214 badge */}
      <div className="absolute top-6 right-6 text-[10px] font-mono text-gray-500 bg-black/80 px-2 py-1 rounded border border-gray-700 pointer-events-none z-10">
        Earth-90214
      </div>

      {/* The Rubik's Cube Easter Egg */}
      <motion.div 
        className="absolute bottom-8 right-8 z-[9999] cursor-pointer group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
      >
        <div className="relative w-12 h-12">
          {/* Simple CSS Rubik's cube representation */}
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full bg-black p-[2px] gap-[2px] border-2 border-black rounded-sm shadow-2xl">
            {/* Scrambled shades of gray to simulate colorblindness */}
            {['#ccc', '#888', '#aaa', '#eee', '#999', '#ddd', '#777', '#bbb', '#666'].map((color, i) => (
              <div key={i} className="w-full h-full rounded-[1px]" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute -top-12 right-0 w-max opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-gray-300 text-[10px] font-mono p-2 rounded shadow-lg pointer-events-none border border-gray-700">
          "I don't get it... is this purple?"
        </div>
      </motion.div>

      {/* Click to dismiss hint */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-gray-500 font-mono pointer-events-none z-10">
        Click anywhere to dismiss · Auto-restores in 40s
      </div>
    </motion.div>
  );
}

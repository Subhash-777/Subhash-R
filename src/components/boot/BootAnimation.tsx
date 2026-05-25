'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/app';

const BOOT_LINES = [
  { status: 'OK',   text: 'Started Kernel Logger' },
  { status: 'OK',   text: 'Reached target System Initialization' },
  { status: 'OK',   text: 'Loading AI Modules...' },
  { status: 'OK',   text: 'Mounting DevOps Infrastructure...' },
  { status: 'INFO', text: 'Initializing LLM Runtime — v4.2.0' },
  { status: 'OK',   text: 'Starting Music Daemon (howler.service)' },
  { status: 'OK',   text: 'Connecting to GitHub API...' },
  { status: 'OK',   text: 'Loading Portfolio Data...' },
  { status: 'OK',   text: 'Launching SubhashOS Desktop Environment' },
];

export default function BootAnimation() {
  const setBootComplete = useAppStore((s) => s.setBootComplete);
  const [phase, setPhase] = useState(0); // 0=bios, 1=bootlog, 2=progress, 3=splash, 4=done
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [biosText, setBiosText] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const BIOS_FULL = 'SubhashOS v1.0.0 — AI-Powered Desktop Environment';

  useEffect(() => {
    // Phase 1: Type BIOS header
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= BIOS_FULL.length) {
        setBiosText(BIOS_FULL.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setPhase(1), 200);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    // Phase 2: Boot log lines stagger in
    let idx = 0;
    const lineInterval = setInterval(() => {
      if (idx < BOOT_LINES.length) {
        setVisibleLines(prev => [...prev, idx]);
        idx++;
      } else {
        clearInterval(lineInterval);
        setTimeout(() => setPhase(2), 300);
      }
    }, 150);

    return () => clearInterval(lineInterval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 2) return;
    // Phase 3: Progress bar
    let pct = 0;
    const progressInterval = setInterval(() => {
      pct += 2;
      setProgress(Math.min(pct, 100));
      if (pct >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setShowSplash(true);
          setPhase(3);
        }, 200);
      }
    }, 20);

    return () => clearInterval(progressInterval);
  }, [phase]);

  useEffect(() => {
    if (phase !== 3) return;
    // Phase 4: Show splash then fade out
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setBootComplete(true);
      }, 800);
    }, 1200);
  }, [phase, setBootComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex flex-col font-mono text-sm text-green-400 p-8 select-none"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />

      {!showSplash ? (
        <>
          {/* BIOS Header */}
          <div className="mb-6 text-white">
            <div className="text-lg min-h-[28px]">{biosText}<span className="animate-blink">▋</span></div>
            <div className="text-gray-500 text-xs mt-1">Build 2025.05.14 — Chennai, India</div>
            <div className="text-gray-600 text-xs">RAM: 32768MB OK | CPU: AI-Core v4.2 | GPU: CUDA 12.0</div>
          </div>

          {/* Boot Log Lines */}
          <div className="flex-1 space-y-1 overflow-hidden">
            {BOOT_LINES.map((line, i) => (
              <div
                key={i}
                className="flex gap-3 transition-all duration-200"
                style={{
                  opacity: visibleLines.includes(i) ? 1 : 0,
                  transform: visibleLines.includes(i) ? 'translateX(0)' : 'translateX(-20px)',
                }}
              >
                <span className={`font-bold ${line.status === 'OK' ? 'text-green-400' : 'text-blue-400'}`}>
                  [ {line.status.padEnd(4)} ]
                </span>
                <span className="text-gray-300">{line.text}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {phase >= 2 && (
            <div className="mt-8">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Loading SubhashOS...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #6d28d9, #7c3aed, #8b5cf6)',
                  }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        /* Login Splash */
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            background: '#09090f',
            opacity: showSplash ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {/* SubhashOS ASCII Logo */}
          <div className="text-center mb-8">
            <pre className="text-violet-400 text-sm leading-tight mb-4 hidden md:block">
{`
  ███████╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███████╗██╗  ██╗ ██████╗ ███████╗
  ██╔════╝██║   ██║██╔══██╗██║  ██║██╔══██╗██╔════╝██║  ██║██╔═══██╗██╔════╝
  ███████╗██║   ██║██████╔╝███████║███████║███████╗███████║██║   ██║███████╗
  ╚════██║██║   ██║██╔══██╗██╔══██║██╔══██║╚════██║██╔══██║██║   ██║╚════██║
  ███████║╚██████╔╝██████╔╝██║  ██║██║  ██║███████║██║  ██║╚██████╔╝███████║
  ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`}
            </pre>
            <div className="text-5xl font-bold text-violet-400 md:hidden mb-2">SubhashOS</div>
          </div>
          <div className="text-gray-400 text-xl">
            Welcome<span className="animate-blink">▋</span>
          </div>
          <div className="text-gray-600 text-sm mt-2">AI Engineer · DevOps Enthusiast · Linux User</div>
        </div>
      )}
    </div>
  );
}

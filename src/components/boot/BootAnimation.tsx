'use client';
import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/app';
import { gsap } from '@/lib/gsap';
import { useTranslation } from 'react-i18next';

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

const BIOS_FULL = 'SubhashOS v1.0.0 — AI-Powered Desktop Environment';

export default function BootAnimation() {
  const { t } = useTranslation();
  const setBootComplete = useAppStore((s) => s.setBootComplete);
  const containerRef = useRef<HTMLDivElement>(null);
  const biosRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const preSplashContentRef = useRef<HTMLDivElement>(null);
  
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isBooted) return;

    // We store the master timeline on the window so the Easter Egg engine can access it to rewind it
    const tl = gsap.timeline({
      onComplete: () => {
        setIsBooted(true);
        setBootComplete(true);
      }
    });

    (window as any).masterBootTimeline = tl;

    // Phase 1: Type BIOS header
    tl.to(biosRef.current, {
      text: BIOS_FULL,
      duration: 1.5,
      ease: 'none'
    });

    // Phase 2: Boot log lines stagger in
    if (linesRef.current.length > 0) {
      tl.to(linesRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.1,
        stagger: 0.15,
        ease: 'power2.out'
      }, "+=0.2");
    }

    // Phase 3: Progress bar
    tl.to(progressContainerRef.current, {
      opacity: 1,
      duration: 0.2
    }, "+=0.3");

    // Animate width of progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power1.inOut'
    }, "<");

    // Animate text from 0 to 100
    let progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (progressTextRef.current) {
          progressTextRef.current.innerText = Math.round(progressObj.val) + '%';
        }
      }
    }, "<");

    // Phase 4: Show splash
    tl.to(preSplashContentRef.current, {
      opacity: 0,
      duration: 0.3
    }, "+=0.2");

    tl.to(splashRef.current, {
      opacity: 1,
      duration: 0.5
    }, "+=0.1");

    // Phase 5: Fade everything out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, "+=1.2");

    return () => {
      tl.kill();
      delete (window as any).masterBootTimeline;
    };
  }, [setBootComplete, isBooted]);

  // If boot is completed via store or timeline finished, hide it.
  // Actually, we keep it mounted but opacity 0 (or pointer-events-none) so it can be rewound!
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col font-mono text-sm text-green-400 p-8 select-none"
      style={{
        pointerEvents: isBooted ? 'none' : 'all',
      }}
    >
      <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />

      <div ref={preSplashContentRef} className="flex-1 flex flex-col w-full h-full">
        {/* BIOS Header */}
        <div className="mb-6 text-white">
          <div className="text-lg min-h-[28px]">
            <span ref={biosRef}></span>
            <span className="animate-blink">▋</span>
          </div>
          <div className="text-gray-500 text-xs mt-1">{t('Build 2025.05.14 — Chennai, India')}</div>
          <div className="text-gray-600 text-xs">RAM: 32768MB OK | CPU: AI-Core v4.2 | GPU: CUDA 12.0</div>
        </div>

        {/* Boot Log Lines */}
        <div className="flex-1 space-y-1 overflow-hidden">
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              ref={el => { if(el) linesRef.current[i] = el; }}
              className="flex gap-3 opacity-0 -translate-x-5"
            >
              <span className={`font-bold ${line.status === 'OK' ? 'text-green-400' : 'text-blue-400'}`}>
                [ {line.status.padEnd(4)} ]
              </span>
              <span className="text-gray-300">{line.text}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div ref={progressContainerRef} className="mt-8 opacity-0">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Loading SubhashOS...</span>
            <span ref={progressTextRef}>0%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full"
              style={{
                width: '0%',
                background: 'linear-gradient(90deg, #6d28d9, #7c3aed, #8b5cf6)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Login Splash */}
      <div
        ref={splashRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none"
        style={{ background: '#09090f' }}
      >
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
    </div>
  );
}

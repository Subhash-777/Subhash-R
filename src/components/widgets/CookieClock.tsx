'use client';
import { useRef, useEffect } from 'react';
import { useLiveClock } from '@/hooks/useLiveClock';
// Smooth scalloped/gear outer ring path using sine wave mapping
const SCALLOPED_PATH = (() => {
  const cx = 100, cy = 100, rBase = 88, amplitude = 5, teeth = 16;
  let d = '';
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    // Offset by -PI/2 so the top is perfectly aligned
    const radius = rBase + Math.sin(angle * teeth) * amplitude;
    const x = cx + radius * Math.cos(angle - Math.PI / 2);
    const y = cy + radius * Math.sin(angle - Math.PI / 2);
    if (i === 0) d += `M ${x} ${y}`;
    else d += ` L ${x} ${y}`;
  }
  return d + ' Z';
})();

export function CookieClock() {
  const { hours, minutes, ampm, date, month, hourDeg, minuteDeg, secondDeg } = useLiveClock();
  const frontRingRef = useRef<SVGPathElement>(null);
  const backRingRef = useRef<SVGPathElement>(null);
  const bevelRingRef = useRef<SVGPathElement>(null);
  const rotationRef = useRef(0);
  const animRef = useRef<number>();

  // Slow continuous outer ring rotation
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      rotationRef.current = (rotationRef.current + (delta / 1000) * 6) % 360;
      if (frontRingRef.current && backRingRef.current && bevelRingRef.current) {
        frontRingRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        frontRingRef.current.style.transformOrigin = '100px 100px';
        backRingRef.current.style.transform = `translate(6px, 8px) rotate(${rotationRef.current}deg)`;
        backRingRef.current.style.transformOrigin = '100px 100px';
        bevelRingRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        bevelRingRef.current.style.transformOrigin = '100px 100px';
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 mt-4">
      {/* Clock Face - Floating Gear */}
      <div className="relative w-48 h-48 select-none">
        {/* Outer scalloped ring */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-2xl z-0">
          <defs>
            <linearGradient id="clockGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d2f5e" />
              <stop offset="40%" stopColor="#251b3d" />
              <stop offset="100%" stopColor="#150e24" />
            </linearGradient>
            <linearGradient id="glassBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
              <stop offset="30%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="70%" stopColor="rgba(0, 0, 0, 0.2)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.8)" />
            </linearGradient>
            <filter id="innerShadow">
              <feComponentTransfer in="SourceAlpha">
                <feFuncA type="linear" slope="0.5"/>
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feOffset dy="4" dx="0"/>
              <feComposite operator="out" in2="SourceAlpha"/>
              <feComposite operator="in" in2="SourceGraphic"/>
              <feBlend mode="multiply" in2="SourceGraphic"/>
            </filter>
          </defs>
          {/* Back 3D Layer Extrusion */}
          <path
            ref={backRingRef}
            d={SCALLOPED_PATH}
            fill="#1a112e"
            transform="translate(6, 8)"
          />

          {/* Front Frosted Glass Layer */}
          <path
            ref={frontRingRef}
            d={SCALLOPED_PATH}
            fill="url(#clockGlow)"
            filter="url(#innerShadow)"
          />

          {/* Outer Edge Glass Bevel Highlight */}
          <path
            ref={bevelRingRef}
            d={SCALLOPED_PATH}
            fill="none"
            stroke="url(#glassBevel)"
            strokeWidth="3.5"
            style={{ mixBlendMode: 'overlay' }}
          />
        </svg>

        {/* Clock Inner UI */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {/* Premium Date Tags (FRONT OVERLAP) */}
          <div className="absolute -top-4 -left-6 px-4 py-2 rounded-2xl bg-[#1e1633]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center z-30">
            <div className="w-6 h-[2px] bg-[#a855f7] rounded-full mb-1 opacity-80" />
            <span className="text-white keep-white font-sans font-bold text-[24px] leading-none drop-shadow-md">{date}</span>
            <span className="text-[9px] text-[#a855f7] font-medium tracking-widest uppercase mt-1">Date</span>
          </div>

          <div className="absolute -bottom-4 -right-6 px-4 py-2 rounded-2xl bg-[#1e1633]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center z-30">
            <span className="text-[9px] text-[#a855f7] font-medium tracking-widest uppercase mb-1">Month</span>
            <span className="text-white keep-white font-sans font-bold text-[24px] leading-none drop-shadow-md">{month}</span>
            <div className="w-6 h-[2px] bg-[#a855f7] rounded-full mt-1 opacity-80" />
          </div>

          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <defs>
              <filter id="handShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.6)" />
              </filter>
            </defs>

            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => {
              if (i === 0) return null; // Skip 12 o'clock for the glowing dot
              return (
                <line
                  key={i}
                  x1="100" y1="14" x2="100" y2={i % 5 === 0 ? "24" : "18"}
                  stroke={i % 5 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={i % 5 === 0 ? '2' : '1.5'}
                  transform={`rotate(${i * 6} 100 100)`}
                  strokeLinecap="round"
                />
              );
            })}

            {/* Glowing 12 o'clock dot */}
            <circle cx="100" cy="18" r="3" fill="#e9d5ff" style={{ filter: 'drop-shadow(0 0 6px #e9d5ff)' }} />

            {/* Translucent Seconds hand (Background) */}
            <line
              x1="100" y1="100" x2="100" y2="30"
              stroke="rgba(168, 85, 247, 0.25)" strokeWidth="22" strokeLinecap="round"
              transform={`rotate(${secondDeg} 100 100)`}
            />

            {/* Hour hand (Middle) */}
            <line
              x1="100" y1="100" x2="100" y2="55"
              stroke="#a855f7" strokeWidth="18" strokeLinecap="round"
              transform={`rotate(${hourDeg} 100 100)`}
              filter="url(#handShadow)"
            />

            {/* Minute hand (Top) */}
            <line
              x1="100" y1="100" x2="100" y2="45"
              stroke="#ffffff" strokeWidth="16" strokeLinecap="round"
              transform={`rotate(${minuteDeg} 100 100)`}
              filter="url(#handShadow)"
            />

            {/* Center cap */}
            <circle cx="100" cy="100" r="9" fill="#ffffff" filter="url(#handShadow)" />
          </svg>

          {/* Digital time in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[26px] text-gray-200 keep-white font-medium leading-none drop-shadow-md mb-8">
              {String(hours).padStart(2, '0')}
            </span>
            <span className="text-[20px] text-gray-400 font-medium mt-6">
              {ampm}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

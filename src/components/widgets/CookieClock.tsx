'use client';
import { useRef, useEffect } from 'react';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useTranslation } from 'react-i18next';

// ─── Scalloped gear ring path (kept from original, refined tooth count) ────────
const SCALLOPED_PATH = (() => {
  const cx = 100, cy = 100, rBase = 87, amplitude = 4.5, teeth = 20;
  let d = '';
  const steps = 160;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const radius = rBase + Math.sin(angle * teeth) * amplitude;
    const x = cx + radius * Math.cos(angle - Math.PI / 2);
    const y = cy + radius * Math.sin(angle - Math.PI / 2);
    if (i === 0) d += `M ${x} ${y}`;
    else d += ` L ${x} ${y}`;
  }
  return d + ' Z';
})();

// ─── Arc path helper for the seconds progress ring ────────────────────────────
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

export function CookieClock() {
  const { t } = useTranslation();
  const { hours, minutes, seconds, ampm, date, month, hourDeg, minuteDeg, secondDeg } =
    useLiveClock();

  // Refs for direct DOM mutation (performance-critical animations)
  const frontRingRef    = useRef<SVGPathElement>(null);
  const backRingRef     = useRef<SVGPathElement>(null);
  const bevelRingRef    = useRef<SVGPathElement>(null);
  const orbitGlowRef    = useRef<SVGCircleElement>(null);
  const orbitCoreRef    = useRef<SVGCircleElement>(null);
  const arcRef          = useRef<SVGPathElement>(null);
  const rotationRef     = useRef(0);
  const orbitAngleRef   = useRef(secondDeg); // starts synced to seconds
  const animRef         = useRef<number>();

  // Seconds arc (updates per second from React state)
  const secondsArc = seconds === 0
    ? '' // full circle handled by opacity
    : describeArc(100, 100, 74, 0, secondDeg);

  // ─── Main animation loop ─────────────────────────────────────────────────
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // 1. Slow gear ring rotation — 4°/s
      rotationRef.current = (rotationRef.current + (delta / 1000) * 4) % 360;
      const rot = rotationRef.current;

      if (frontRingRef.current) {
        frontRingRef.current.style.transform = `rotate(${rot}deg)`;
        frontRingRef.current.style.transformOrigin = '100px 100px';
      }
      if (backRingRef.current) {
        backRingRef.current.style.transform = `translate(5px, 7px) rotate(${rot}deg)`;
        backRingRef.current.style.transformOrigin = '100px 100px';
      }
      if (bevelRingRef.current) {
        bevelRingRef.current.style.transform = `rotate(${rot}deg)`;
        bevelRingRef.current.style.transformOrigin = '100px 100px';
      }

      // 2. Orbiting jewel — tracks seconds smoothly (360°/60s = 6°/s)
      orbitAngleRef.current = (orbitAngleRef.current + (delta / 1000) * 6) % 360;
      const orbitRad = ((orbitAngleRef.current - 90) * Math.PI) / 180;
      const orbitR = 74; // same as arc ring radius
      const ox = 100 + orbitR * Math.cos(orbitRad);
      const oy = 100 + orbitR * Math.sin(orbitRad);

      if (orbitGlowRef.current) {
        orbitGlowRef.current.setAttribute('cx', String(ox));
        orbitGlowRef.current.setAttribute('cy', String(oy));
      }
      if (orbitCoreRef.current) {
        orbitCoreRef.current.setAttribute('cx', String(ox));
        orbitCoreRef.current.setAttribute('cy', String(oy));
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 mt-4 mb-8 sm:mb-4">
      <div className="relative w-52 h-52 select-none">

        {/* ── Layer 0: Gear ring SVG (behind everything) ───────────────────── */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full z-0"
          style={{ filter: 'drop-shadow(0 12px 32px rgba(88,28,220,0.35)) drop-shadow(0 2px 8px rgba(0,0,0,0.7))' }}
        >
          <defs>
            {/* Chrome-dark face gradient */}
            <radialGradient id="faceGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%"   stopColor="#2a1f44" />
              <stop offset="50%"  stopColor="#160f28" />
              <stop offset="100%" stopColor="#0b0714" />
            </radialGradient>

            {/* Chrome rim gradient */}
            <radialGradient id="rimGrad" cx="28%" cy="18%" r="80%">
              <stop offset="0%"   stopColor="#5a4a7a" />
              <stop offset="40%"  stopColor="#2d2048" />
              <stop offset="100%" stopColor="#120c22" />
            </radialGradient>

            {/* Bevel highlight — glassmorphic top edge */}
            <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(220,200,255,0.55)" />
              <stop offset="25%"  stopColor="rgba(160,130,220,0.12)" />
              <stop offset="65%"  stopColor="rgba(0,0,0,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.70)" />
            </linearGradient>

            {/* Seconds arc gradient */}
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            {/* Orbit dot glow */}
            <filter id="orbitGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Hand shadow */}
            <filter id="handShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.65)" />
            </filter>

            {/* Soft inner shadow for face depth */}
            <filter id="innerDepth" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
              <feOffset dx="0" dy="4" in="blur" result="offset" />
              <feComposite operator="out" in="offset" in2="SourceAlpha" result="shadow" />
              <feComposite operator="in" in="shadow" in2="SourceGraphic" />
            </filter>

            {/* Center jewel shimmer */}
            <radialGradient id="jewelGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%"   stopColor="#e9d5ff" />
              <stop offset="60%"  stopColor="#a855f7" />
              <stop offset="100%" stopColor="#581c87" />
            </radialGradient>
          </defs>

          {/* ── 3D extrusion shadow ──────────────────────────────────────────── */}
          <path
            ref={backRingRef}
            d={SCALLOPED_PATH}
            fill="#0b0714"
            opacity="0.85"
            transform="translate(5, 7)"
          />

          {/* ── Front gear face ─────────────────────────────────────────────── */}
          <path
            ref={frontRingRef}
            d={SCALLOPED_PATH}
            fill="url(#rimGrad)"
          />

          {/* ── Glass bevel stroke ──────────────────────────────────────────── */}
          <path
            ref={bevelRingRef}
            d={SCALLOPED_PATH}
            fill="none"
            stroke="url(#bevelGrad)"
            strokeWidth="3"
            style={{ mixBlendMode: 'overlay' }}
          />

          {/* ── Watch face disc ─────────────────────────────────────────────── */}
          <circle cx="100" cy="100" r="78" fill="url(#faceGrad)" filter="url(#innerDepth)" />

          {/* ── Subtle face ring lines (watchface detail) ─────────────────── */}
          <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(180,150,255,0.08)" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(180,150,255,0.06)" strokeWidth="0.5" />

          {/* ── Seconds arc progress ring ────────────────────────────────── */}
          {/* Track ring */}
          <circle
            cx="100" cy="100" r="74"
            fill="none"
            stroke="rgba(120,80,200,0.15)"
            strokeWidth="2.5"
          />
          {/* Live progress arc */}
          {seconds > 0 && (
            <path
              ref={arcRef}
              d={secondsArc}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          )}
          {/* Full ring at :00 */}
          {seconds === 0 && (
            <circle cx="100" cy="100" r="74" fill="none"
              stroke="url(#arcGrad)" strokeWidth="2.5" opacity="0.85" />
          )}

          {/* ── Orbiting jewel on the arc ─────────────────────────────────── */}
          <circle
            ref={orbitGlowRef}
            cx="100" cy="26"
            r="4.5"
            fill="#e9d5ff"
            filter="url(#orbitGlow)"
          />
          <circle
            ref={orbitCoreRef}
            cx="100" cy="26"
            r="2"
            fill="#ffffff"
          />

          {/* ── Hour tick marks ──────────────────────────────────────────────── */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            return (
              <line
                key={i}
                x1="100" y1="22"
                x2="100" y2={i % 3 === 0 ? '34' : '30'}
                stroke={i % 3 === 0 ? 'rgba(220,200,255,0.55)' : 'rgba(180,150,255,0.25)'}
                strokeWidth={i % 3 === 0 ? '2' : '1.2'}
                strokeLinecap="round"
                transform={`rotate(${angle} 100 100)`}
              />
            );
          })}

          {/* ── Minute tick marks (every 6°) ─────────────────────────────── */}
          {Array.from({ length: 60 }).map((_, i) => {
            if (i % 5 === 0) return null; // skip hour positions
            return (
              <line
                key={`m${i}`}
                x1="100" y1="22"
                x2="100" y2="26"
                stroke="rgba(150,120,200,0.18)"
                strokeWidth="0.8"
                strokeLinecap="round"
                transform={`rotate(${i * 6} 100 100)`}
              />
            );
          })}

          {/* ── 12-o'clock fixed star marker ─────────────────────────────── */}
          <circle cx="100" cy="22" r="2.5" fill="#e9d5ff"
            style={{ filter: 'drop-shadow(0 0 5px #c084fc)' }} />

          {/* ── Hands ────────────────────────────────────────────────────── */}
          {/* Hour hand — translucent violet wash */}
          <line
            x1="100" y1="100" x2="100" y2="45"
            stroke="rgba(168,85,247,0.35)"
            strokeWidth="18"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 100 100)`}
          />

          {/* Minute hand — translucent violet wash */}
          <line
            x1="100" y1="100" x2="100" y2="28"
            stroke="rgba(168,85,247,0.2)"
            strokeWidth="14"
            strokeLinecap="round"
            transform={`rotate(${minuteDeg} 100 100)`}
          />

          {/* Center jewel cap */}
          <circle cx="100" cy="100" r="10" fill="#0f0a1e"
            stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="6" fill="url(#jewelGrad)" />
          {/* Jewel shimmer */}
          <circle cx="98" cy="98" r="2" fill="rgba(255,255,255,0.45)" />
        </svg>

        {/* ── Date / Month floating glass pills ───────────────────────────── */}
        {/* DATE — top-left, overlaps the clock face */}
        <div
          className="absolute z-30 flex flex-col items-center justify-center"
          style={{
            top: '-14px',
            left: '-20px',
            width: '52px',
            padding: '8px 6px 6px',
            borderRadius: '14px',
            background: 'rgba(18,10,34,0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '0.75px solid rgba(168,85,247,0.35)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(220,200,255,0.12)',
          }}
        >
          {/* Top accent line */}
          <div style={{ width: '22px', height: '2px', borderRadius: '1px',
            background: 'linear-gradient(90deg,#7c3aed,#c084fc)', marginBottom: '5px', opacity: 0.9 }} />
          <span style={{
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            fontSize: '22px',
            fontWeight: 700,
            color: '#ede9fe',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textShadow: '0 0 12px rgba(192,132,252,0.5)',
          }}>{date}</span>
          <span style={{
            fontSize: '8px',
            color: '#a855f7',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '4px',
            fontFamily: "'DM Mono', monospace",
          }}>{t('Date')}</span>
        </div>

        {/* MONTH — bottom-right */}
        <div
          className="absolute z-30 flex flex-col items-center justify-center"
          style={{
            bottom: '-14px',
            right: '-20px',
            width: '52px',
            padding: '6px 6px 8px',
            borderRadius: '14px',
            background: 'rgba(18,10,34,0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '0.75px solid rgba(168,85,247,0.35)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(220,200,255,0.12)',
          }}
        >
          <span style={{
            fontSize: '8px',
            color: '#a855f7',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '4px',
            fontFamily: "'DM Mono', monospace",
          }}>{t('Mon')}</span>
          <span style={{
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            fontSize: '22px',
            fontWeight: 700,
            color: '#ede9fe',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textShadow: '0 0 12px rgba(192,132,252,0.5)',
          }}>{String(month).toUpperCase().slice(0, 2)}</span>
          {/* Bottom accent line */}
          <div style={{ width: '22px', height: '2px', borderRadius: '1px',
            background: 'linear-gradient(90deg,#7c3aed,#c084fc)', marginTop: '5px', opacity: 0.9 }} />
        </div>

        {/* ── Digital readout overlay (center of face) ─────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          {/* Hours & Minutes — offset up so it sits above minute hand pivot */}
          <span style={{
            fontFamily: "'DM Mono', 'Fira Code', monospace",
            fontSize: '24px',
            fontWeight: 700,
            color: 'rgba(237,233,254,0.92)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '36px',
            textShadow: '0 0 16px rgba(168,85,247,0.6)',
          }}>
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
          </span>
          {/* AM/PM — offset down, below center cap */}
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(168,85,247,0.85)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginTop: '28px',
          }}>
            {ampm}
          </span>
        </div>

      </div>
    </div>
  );
}
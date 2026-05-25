'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  { prefix: '>', text: 'whoami', delay: 0 },
];

const DRIVES = [
  'Automate. Scale. Learn.',
  'Build tools that empower others.',
  'Solve meaningful problems.',
];

const EXPLORING = [
  'Multi-agent AI systems',
  'DevOps & Cloud Infrastructure',
  'Open Source & Community',
];

export function WhoamiCard() {
  const [visible, setVisible] = useState(false);
  const [drivesVisible, setDrivesVisible] = useState<boolean[]>([]);
  const [exploreVisible, setExploreVisible] = useState<boolean[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300);
    const t2 = setTimeout(() => {
      DRIVES.forEach((_, i) => {
        setTimeout(() => setDrivesVisible(prev => { const n = [...prev]; n[i] = true; return n; }), i * 150);
      });
    }, 800);
    const t3 = setTimeout(() => {
      EXPLORING.forEach((_, i) => {
        setTimeout(() => setExploreVisible(prev => { const n = [...prev]; n[i] = true; return n; }), i * 150);
      });
    }, 1800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="glass-card p-5 font-mono border-white/5 rounded-2xl w-full">
      {/* whoami command */}
      <div className="text-green-400 text-[11px] font-bold mb-3">&gt; whoami</div>

      {/* SUBHASH heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[32px] tracking-widest font-sans font-black mb-2"
        style={{
          background: 'linear-gradient(135deg, var(--name-from, #a78bfa), var(--name-to, #8b5cf6))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        Subhash R
      </motion.div>

      <div className="text-[11px] text-gray-300 mb-4 font-mono border-b border-white/5 pb-3">AI Engineer | DevOps Enthusiast | Linux User</div>

      {/* What drives me */}
      <div className="mb-4">
        <div className="text-violet-400 text-[11px] font-bold mb-2">What drives me:</div>
        {DRIVES.map((line, i) => (
          <div
            key={i}
            className="flex gap-2 text-[11px] text-gray-300 py-0.5 transition-all duration-300"
            style={{ opacity: drivesVisible[i] ? 1 : 0, transform: drivesVisible[i] ? 'translateX(0)' : 'translateX(-10px)' }}
          >
            <span className="text-gray-500 font-bold">&gt;</span>
            <span className="font-sans font-medium text-[12px]">{line}</span>
          </div>
        ))}
      </div>

      {/* Currently exploring */}
      <div className="mb-4">
        <div className="text-violet-400 text-[11px] font-bold mb-2">Currently exploring:</div>
        {EXPLORING.map((line, i) => (
          <div
            key={i}
            className="flex gap-2 text-[11px] text-gray-300 py-0.5 transition-all duration-300"
            style={{ opacity: exploreVisible[i] ? 1 : 0, transform: exploreVisible[i] ? 'translateX(0)' : 'translateX(-10px)' }}
          >
            <span className="text-gray-500 font-bold">&gt;</span>
            <span className="font-sans font-medium text-[12px]">{line}</span>
          </div>
        ))}
      </div>

      <div className="text-green-400 text-[11px] font-bold">&gt; cd /skills</div>
    </div>
  );
}

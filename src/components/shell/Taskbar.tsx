'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ThumbsDown, User } from 'lucide-react';
import { SystemTray } from './SystemTray';
import { WorkspaceLabel } from './WorkspaceLabel';

const COUNTER_ITEMS = [
  { icon: Github, value: 38 },
  { icon: ThumbsDown, value: 0 },
  { icon: User, value: 3 },
];

export function Taskbar() {
  return (
    <header
      className="fixed top-4 left-4 right-4 z-50 h-14 flex items-center px-4 gap-4 rounded-full shadow-2xl"
      style={{
        background: 'var(--taskbar-bg)',
        backdropFilter: `blur(var(--taskbar-blur))`,
        WebkitBackdropFilter: `blur(var(--taskbar-blur))`,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Left Zone */}
      <div className="flex items-center gap-4 shrink-0 pl-2">
        {/* A Logo */}
        <Link href="/" aria-label="Home">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center text-xl font-bold"
            style={{ 
              background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            A
          </motion.div>
        </Link>

        {/* Desktop Label */}
        <WorkspaceLabel />

        {/* Notification counters */}
        <div className="flex items-center gap-3 ml-4">
          {COUNTER_ITEMS.map(({ icon: Icon, value }, i) => (
            <div key={i} className="flex items-center gap-1 text-[11px] font-bold text-gray-300 bg-white/5 px-2 py-1 rounded-full border border-white/5">
              <Icon size={12} className="text-gray-400" />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center — Search Bar */}
      <div className="flex-1 max-w-md mx-auto hidden md:block">
        <div
          className="w-full h-8 rounded-full border border-white/5 transition-colors cursor-text"
          style={{
            background: 'rgba(255,255,255,0.03)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* Right Zone — System Tray */}
      <SystemTray />
    </header>
  );
}

'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ThumbsDown, User } from 'lucide-react';
import { SystemTray } from './SystemTray';
import { WorkspaceLabel } from './WorkspaceLabel';
import { SearchBarTrigger } from '../search/SearchBarTrigger';

const COUNTER_ITEMS = [
  { icon: Github, value: 38 },
  { icon: ThumbsDown, value: 0 },
  { icon: User, value: 3 },
];

export function Taskbar() {
  return (
    <header
      className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 h-12 sm:h-14 flex items-center justify-between px-3 sm:px-4 rounded-full shadow-2xl"
      style={{
        background: 'var(--taskbar-bg)',
        backdropFilter: `blur(var(--taskbar-blur))`,
        WebkitBackdropFilter: `blur(var(--taskbar-blur))`,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Left Zone */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 pl-1 sm:pl-2">
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

        {/* Desktop Label — hidden on small screens */}
        <div className="hidden sm:block">
          <WorkspaceLabel />
        </div>

        {/* Notification counters — hidden on xs, shown sm+ */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 ml-1 sm:ml-4">
          {COUNTER_ITEMS.map(({ icon: Icon, value }, i) => (
            <div key={i} className="flex items-center gap-1 text-[11px] font-bold text-gray-300 bg-white/5 px-2 py-1 rounded-full border border-white/5">
              <Icon size={12} className="text-gray-400" />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center — Search Bar (hidden on mobile) */}
      <div className="absolute left-[50.5%] -translate-x-1/2 w-[40%] max-w-[400px] hidden md:block">
        <SearchBarTrigger />
      </div>

      {/* Right Zone — System Tray */}
      <SystemTray />
    </header>
  );
}

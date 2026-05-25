'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, FlaskConical, FileText, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/',         label: 'Home',     Icon: Home,         color: 'text-violet-400' },
  { href: '/projects', label: 'Projects', Icon: FolderOpen,   color: 'text-yellow-400' },
  { href: '/research', label: 'Research', Icon: FlaskConical, color: 'text-cyan-400' },
  { href: '/resume',   label: 'Resume',   Icon: FileText,     color: 'text-blue-400' },
  { href: '/contact',  label: 'Contact',  Icon: Mail,         color: 'text-gray-300' },
];

export function BottomDock() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        layout
        className="flex items-end gap-1 px-3 py-2 glass-card"
        style={{ borderRadius: 18 }}
      >
        {NAV_ITEMS.map(({ href, label, Icon, color }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} aria-label={label}>
              <motion.div
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl cursor-pointer transition-colors
                  ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}
              >
                <Icon
                  size={24}
                  className={`transition-colors ${isActive ? color : color} drop-shadow-md`}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={isActive ? { filter: `drop-shadow(0 0 6px currentColor)` } : undefined}
                />
                <span className={`text-[9px] font-bold mt-1 transition-colors ${isActive ? color : 'text-gray-400'}`}>
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="dock-indicator"
                    className="absolute -bottom-1 w-8 h-0.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}

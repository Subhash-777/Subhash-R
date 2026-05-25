'use client';
import { Sun, Moon, Volume2, VolumeX, Battery, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useBattery } from '@/hooks/useBattery';
import { useAppStore } from '@/store/app';
import { NOTIFICATIONS } from '@/data/resume';

export function SystemTray() {
  const { formattedTime, formattedDate } = useLiveClock();
  const { level, charging } = useBattery();
  const { theme, toggleTheme, notificationCount, notificationsOpen, setNotificationsOpen } = useAppStore();
  const [isMuted, setIsMuted] = useState(false);
  const pct = Math.round(level * 100);
  const batteryColor = pct > 20 ? '#22c55e' : '#ef4444';
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setNotificationsOpen]);

  return (
    <div className="flex items-center gap-2 sm:gap-4 ml-auto shrink-0 pr-1 sm:pr-2">
      {/* Clock — abbreviated on mobile */}
      <div className="text-[11px] sm:text-[12px] font-medium text-gray-300 flex items-center gap-1 sm:gap-1.5">
        <span>{formattedTime.toLowerCase()}</span>
        <span className="text-gray-500 hidden sm:inline">•</span>
        <span className="hidden sm:inline">{formattedDate}</span>
      </div>

      {/* Theme toggle */}
      <button 
        onClick={toggleTheme}
        className="relative flex items-center p-1 w-[44px] h-[22px] rounded-full bg-[#151520] border border-white/5 transition-all focus:outline-none shadow-inner"
        aria-label="Toggle Theme"
      >
        <div className={`absolute left-0.5 top-0.5 w-[16px] h-[16px] rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${theme === 'dark' ? 'translate-x-[22px] bg-violet-500' : 'translate-x-0 bg-amber-400'}`} />
        <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
          <Sun size={10} className={theme === 'light' ? 'text-amber-900' : 'text-gray-500'} />
          <Moon size={10} className={theme === 'dark' ? 'text-white' : 'text-gray-500'} />
        </div>
      </button>

      {/* Volume — hidden on xs */}
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="hidden xs:flex sm:flex text-gray-300 hover:text-white transition-colors cursor-pointer outline-none items-center justify-center w-6 h-6 rounded-full hover:bg-white/10"
      >
        {isMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} />}
      </button>

      {/* Battery Pill — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[11px] font-bold border border-green-500/30">
        <Battery size={13} />
        <span>{pct}%</span>
      </div>

      {/* Notifications */}
      <div ref={notifRef} className="relative ml-1 sm:ml-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-lg"
          aria-label="Notifications"
        >
          <Bell size={14} className="text-gray-900" />
          <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#09090f]">
            +88
          </span>
        </motion.button>

        <AnimatePresence>
          {notificationsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="absolute right-0 top-10 w-72 sm:w-80 glass-card p-3 z-50"
            >
              <div className="text-xs text-gray-500 font-mono mb-2">// NOTIFICATIONS</div>
              <div className="space-y-2">
                {NOTIFICATIONS.map((note, i) => (
                  <div key={i} className="text-[11px] text-gray-300 py-1.5 px-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
                    {note}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

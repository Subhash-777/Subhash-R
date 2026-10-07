'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CookieClock } from '@/components/widgets/CookieClock';
import { MusicPlayer } from '@/components/widgets/MusicPlayer';
import { TerminalBio } from '@/components/widgets/TerminalBio';
import { ProfileOrbit } from '@/components/home/ProfileOrbit';
import { WhoamiCard } from '@/components/home/WhoamiCard';
import { SkillsPanel } from '@/components/home/SkillsPanel';
import { Clock, Terminal, Music } from 'lucide-react';

export default function Home() {
  const [activeWidgetTab, setActiveWidgetTab] = useState<'clock' | 'terminal' | 'music'>('clock');

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-2 lg:py-4">
      {/* Container */}
      <div className="w-full max-w-[1400px] mx-auto lg:grid lg:grid-cols-[340px_1fr_380px] gap-8 lg:h-full lg:py-2 lg:px-8">

        {/* --- DESKTOP LEFT COLUMN (Widgets) --- */}
        <div className="hidden lg:flex flex-col w-full max-w-[340px] h-full pb-4 pt-4 justify-between">
          <div className="shrink-0 flex justify-center"><CookieClock /></div>
          <div className="shrink-0 flex justify-center mt-6"><TerminalBio /></div>
          <div className="shrink-0 flex justify-center"><MusicPlayer /></div>
        </div>

        {/* --- DESKTOP CENTER COLUMN (Profile Orbit) --- */}
        <div className="hidden lg:flex items-center justify-center relative min-h-0">
          <ProfileOrbit />
        </div>

        {/* --- DESKTOP RIGHT COLUMN (Identity & Skills) --- */}
        <div className="hidden lg:flex flex-col gap-6 w-full max-w-[380px] h-full pb-4 pt-4">
          <div className="shrink-0"><WhoamiCard /></div>
          <div className="flex-1 flex flex-col min-h-0"><SkillsPanel /></div>
        </div>


        {/* --- MOBILE INTEGRATED LAYOUT (< lg) --- */}
        <div className="flex flex-col lg:hidden w-full max-w-[500px] mx-auto gap-6 pb-12 pt-2">
          {/* Mobile Profile Hero */}
          <div className="w-full relative flex justify-center pt-2">
            <ProfileOrbit />
          </div>

          {/* Mobile Whoami Card */}
          <div className="w-full mt-2">
            <WhoamiCard />
          </div>

          {/* Mobile Skills Panel */}
          <div className="w-full">
            <SkillsPanel />
          </div>

          {/* Mobile Interactive Widgets Box with Tabs */}
          <div className="w-full glass-card p-4 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-semibold text-violet-400 tracking-wider uppercase">
                // SYSTEM WIDGETS
              </span>
              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveWidgetTab('clock')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeWidgetTab === 'clock'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Clock size={13} />
                  <span>Clock</span>
                </button>

                <button
                  onClick={() => setActiveWidgetTab('terminal')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeWidgetTab === 'terminal'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Terminal size={13} />
                  <span>Bio</span>
                </button>

                <button
                  onClick={() => setActiveWidgetTab('music')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeWidgetTab === 'music'
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Music size={13} />
                  <span>Music</span>
                </button>
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="flex justify-center items-center py-2 min-h-[280px]">
              <AnimatePresence mode="wait">
                {activeWidgetTab === 'clock' && (
                  <motion.div
                    key="clock"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex justify-center"
                  >
                    <CookieClock />
                  </motion.div>
                )}

                {activeWidgetTab === 'terminal' && (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex justify-center"
                  >
                    <TerminalBio />
                  </motion.div>
                )}

                {activeWidgetTab === 'music' && (
                  <motion.div
                    key="music"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full flex justify-center"
                  >
                    <MusicPlayer />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PaperList } from '@/components/research/PaperList';
import { PaperViewer } from '@/components/research/PaperViewer';
import { PublicationMeta } from '@/components/research/PublicationMeta';
import { PAPERS, ResearchPaper } from '@/data/research';
import { ArrowLeft, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResearchPage() {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper>(PAPERS[0]);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [showMobileMeta, setShowMobileMeta] = useState(false);

  const handleSelect = (p: ResearchPaper) => {
    setSelectedPaper(p);
    setMobileView('detail');
    setShowMobileMeta(false);
  };

  return (
    <div className="flex-1 h-full flex overflow-hidden relative">
      {/* Left Sidebar */}
      <div className={`
        ${mobileView === 'list' ? 'flex' : 'hidden'} lg:flex
        w-full lg:w-72 border-r border-white/5 bg-black/20 flex-shrink-0 flex-col
      `}>
        <PaperList selected={selectedPaper} onSelect={handleSelect} />
      </div>

      {/* Main Content */}
      <div className={`
        ${mobileView === 'detail' ? 'flex' : 'hidden'} lg:flex
        flex-1 min-w-0 bg-[#09090f]/50 flex-col overflow-hidden relative
      `}>
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-3 py-2 border-b border-white/5 bg-black/30 flex-shrink-0">
          <button
            onClick={() => setMobileView('list')}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 py-1 px-2.5 rounded-lg bg-white/5"
          >
            <ArrowLeft size={15} /> Research Papers
          </button>
          
          <button
            onClick={() => setShowMobileMeta(!showMobileMeta)}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1 px-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
          >
            <BookOpen size={15} /> Paper Meta
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <PaperViewer key={selectedPaper.id} paper={selectedPaper} />
        </div>
      </div>

      {/* Right Sidebar — desktop only */}
      <div className="w-80 border-l border-white/5 bg-black/20 flex-shrink-0 hidden xl:block">
        <PublicationMeta paper={selectedPaper} />
      </div>

      {/* Mobile Meta Drawer */}
      <AnimatePresence>
        {showMobileMeta && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-h-[80vh] bg-[#0d0d1a] border-t border-white/10 rounded-t-3xl flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Publication Meta — {selectedPaper.title.slice(0, 30)}...
                </span>
                <button
                  onClick={() => setShowMobileMeta(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-white bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                <PublicationMeta paper={selectedPaper} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

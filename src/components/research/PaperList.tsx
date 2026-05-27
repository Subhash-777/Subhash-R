'use client';
import { motion } from 'framer-motion';
import { FileText, Trophy } from 'lucide-react';
import { ResearchPaper, PAPERS } from '@/data/research';

export function PaperList({ selected, onSelect }: { selected: ResearchPaper; onSelect: (p: ResearchPaper) => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase">Research Papers</span>
        <div className="flex gap-2 text-gray-600 text-xs">
          <button>+</button>
          <button>↺</button>
          <button>▾</button>
        </div>
      </div>

      {/* Count */}
      <div className="px-4 py-2 border-b border-white/5">
        <span className="text-[10px] text-gray-500 font-mono">Total Papers</span>
        <span className="ml-2 text-xs font-bold text-violet-400">{PAPERS.length}</span>
      </div>

      {/* Paper cards */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 pb-24 lg:pb-4 custom-scrollbar">
        {PAPERS.map((paper) => {
          const isActive = paper.id === selected.id;
          return (
            <motion.button
              key={paper.id}
              onClick={() => onSelect(paper)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              className={`w-full text-left px-4 py-3 transition-all border-l-2 cursor-pointer
                ${isActive
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-transparent'
                }`}
            >
              {/* Active indicator + icon */}
              <div className="flex items-start gap-2 mb-1">
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-0.5 flex-shrink-0 animate-pulse" />
                )}
                <FileText size={14} className={isActive ? 'text-violet-400' : 'text-gray-500'} />
                <span className={`text-xs leading-tight font-medium ${isActive ? 'text-violet-200' : 'text-gray-300'}`}>
                  {paper.title}
                </span>
              </div>

              {/* PDF badge */}
              <div className="flex items-center gap-1 ml-6 mb-1">
                <span className="text-[9px] border border-red-500/40 text-red-400 px-1.5 py-0.5 rounded">PDF</span>
                {paper.award && (
                  <span className="flex items-center gap-1 text-[9px] text-yellow-400">
                    <Trophy size={8} /> Best Paper
                  </span>
                )}
              </div>

              {/* Authors */}
              <div className="text-[10px] text-gray-500 ml-6 truncate">
                {paper.authors.join('; ')}
              </div>
              <div className="text-[10px] text-gray-600 ml-6">{paper.conference}</div>
              <div className="text-[10px] text-gray-600 ml-6">{paper.dates}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

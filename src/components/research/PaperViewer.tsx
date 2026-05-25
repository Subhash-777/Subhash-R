'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResearchPaper } from '@/data/research';

const TABS = ['Abstract', 'Document Sections', 'Authors', 'Figures', 'References', 'Keywords', 'Metrics'];

export function PaperViewer({ paper }: { paper: ResearchPaper }) {
  const [activeTab, setActiveTab] = useState('Abstract');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={paper.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full"
      >
        {/* Paper header */}
        <div className="px-6 py-5 border-b border-white/5 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white leading-snug mb-2">{paper.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                {paper.authors.map((author, i) => (
                  <span key={author}>
                    <span className={author.toLowerCase().includes('subhash') ? 'text-violet-400 font-semibold' : ''}>
                      {author}
                    </span>
                    {i < paper.authors.length - 1 && <span className="text-gray-600">;</span>}
                  </span>
                ))}
                <span className="text-violet-400 cursor-pointer hover:underline">• All Authors</span>
              </div>
            </div>

            {/* PDF Button */}
            {paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
              >
                📄 PDF
              </a>
            )}
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-0 px-6 border-b border-white/5 flex-shrink-0 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors
                ${activeTab === tab ? 'text-violet-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AnimatePresence mode="wait">
            {activeTab === 'Abstract' && (
              <motion.div
                key="abstract"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-semibold text-violet-400">Abstract</h3>
                {paper.abstract.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-gray-300 leading-relaxed">
                    {para}
                  </p>
                ))}
                {paper.award && (
                  <div className="mt-4 p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-lg">🏆</span>
                      <div>
                        <div className="text-xs font-semibold text-yellow-400">{paper.award}</div>
                        <div className="text-[10px] text-gray-500">{paper.conference}</div>
                      </div>
                    </div>
                    {paper.certificateUrl && (
                      <a
                        href={paper.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                      >
                        🎖️ View Certificate →
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === 'Authors' && (
              <motion.div key="authors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="text-sm font-semibold text-violet-400 mb-3">Authors</h3>
                <div className="space-y-2">
                  {paper.authors.map((author, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center text-sm font-bold text-violet-400">
                        {author[0]}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${author.toLowerCase().includes('subhash') ? 'text-violet-300' : 'text-white'}`}>
                          {author}
                        </div>
                        {author.toLowerCase().includes('subhash') && (
                          <div className="text-[10px] text-violet-500">Amrita Vishwa Vidyapeetham, Chennai</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'Keywords' && (
              <motion.div key="keywords" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="text-sm font-semibold text-violet-400 mb-3">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map(kw => (
                    <span key={kw} className="skill-badge">{kw}</span>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'Metrics' && (
              <motion.div key="metrics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="text-sm font-semibold text-violet-400 mb-3">Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Citations', value: '0' },
                    { label: 'References', value: '24' },
                    { label: 'Full Text Views', value: '142' },
                    { label: 'Downloads', value: '38' },
                  ].map(m => (
                    <div key={m.label} className="glass-card p-3 text-center">
                      <div className="text-xl font-bold text-violet-400 font-mono">{m.value}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {!['Abstract', 'Authors', 'Keywords', 'Metrics'].includes(activeTab) && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-sm text-gray-500 font-mono">// {activeTab} section — content available in full paper</p>
                {paper.pdfUrl && (
                  <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-xs text-violet-400 hover:underline">
                    → View in IEEE Xplore
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

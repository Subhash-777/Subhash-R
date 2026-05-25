'use client';
import { useState } from 'react';
import { PaperList } from '@/components/research/PaperList';
import { PaperViewer } from '@/components/research/PaperViewer';
import { PublicationMeta } from '@/components/research/PublicationMeta';
import { PAPERS, ResearchPaper } from '@/data/research';
import { ArrowLeft } from 'lucide-react';

export default function ResearchPage() {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper>(PAPERS[0]);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  const handleSelect = (p: ResearchPaper) => {
    setSelectedPaper(p);
    setMobileView('detail');
  };

  return (
    <div className="flex-1 h-full flex overflow-hidden">
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
        flex-1 min-w-0 bg-[#09090f]/50 flex-col overflow-hidden
      `}>
        {/* Mobile back button */}
        <button
          onClick={() => setMobileView('list')}
          className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm text-violet-400 border-b border-white/5 bg-black/20 flex-shrink-0"
        >
          <ArrowLeft size={16} /> Back to Papers
        </button>
        <div className="flex-1 overflow-hidden">
          <PaperViewer key={selectedPaper.id} paper={selectedPaper} />
        </div>
      </div>

      {/* Right Sidebar — desktop only */}
      <div className="w-80 border-l border-white/5 bg-black/20 flex-shrink-0 hidden xl:block">
        <PublicationMeta paper={selectedPaper} />
      </div>
    </div>
  );
}

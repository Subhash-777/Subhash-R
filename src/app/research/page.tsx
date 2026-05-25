'use client';
import { useState } from 'react';
import { PaperList } from '@/components/research/PaperList';
import { PaperViewer } from '@/components/research/PaperViewer';
import { PublicationMeta } from '@/components/research/PublicationMeta';
import { PAPERS, ResearchPaper } from '@/data/research';

export default function ResearchPage() {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper>(PAPERS[0]);

  return (
    <div className="flex-1 h-full flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-72 border-r border-white/5 bg-black/20 flex-shrink-0">
        <PaperList selected={selectedPaper} onSelect={setSelectedPaper} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 bg-[#09090f]/50">
        <PaperViewer key={selectedPaper.id} paper={selectedPaper} />
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-white/5 bg-black/20 flex-shrink-0 hidden xl:block">
        <PublicationMeta paper={selectedPaper} />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ResumeContent } from '@/components/resume/ResumeContent';
import { ProfileSidebar } from '@/components/resume/ProfileSidebar';
import { ResumeLeftSidebar } from '@/components/resume/ResumeLeftSidebar';
import { EditModeOverlay } from '@/components/resume/EditMode/EditModeOverlay';
import { Briefcase, Code, Microscope, Download } from 'lucide-react';

type ResumeMode = 'Recruiter' | 'Developer' | 'Researcher';

export default function ResumePage() {
  const [activeFile, setActiveFile] = useState('overview.md');
  const [mode, setMode] = useState<ResumeMode>('Recruiter');

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <div className="flex-1 h-full flex flex-col lg:flex-row overflow-hidden justify-center max-w-[1800px] mx-auto w-full">
        {/* Mobile Top Mode Switcher Bar (< lg) */}
        <div className="lg:hidden shrink-0 bg-[#0d0d1a] border-b border-white/10 p-3 flex flex-col gap-2 z-20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-violet-400 tracking-wider uppercase">
              // RESUME MODE
            </span>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Download size={14} /> PDF
            </button>
          </div>

          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 w-full">
            <button
              onClick={() => setMode('Recruiter')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'Recruiter'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Briefcase size={14} />
              <span>Recruiter</span>
            </button>

            <button
              onClick={() => setMode('Developer')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'Developer'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code size={14} />
              <span>Developer</span>
            </button>

            <button
              onClick={() => setMode('Researcher')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'Researcher'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Microscope size={14} />
              <span>Researcher</span>
            </button>
          </div>
        </div>

        {/* Left Sidebar — desktop only */}
        <div className="w-[300px] border-r border-white/5 bg-black/20 flex-shrink-0 hidden xl:flex flex-col overflow-y-auto">
          <ResumeLeftSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-[#09090f]/50 overflow-y-auto shadow-2xl relative z-10">
          <ResumeContent mode={mode} />
        </div>

        {/* Right Sidebar — hidden on mobile, visible on lg+ */}
        <div className="w-[340px] border-l border-white/5 bg-black/20 flex-shrink-0 hidden lg:flex flex-col overflow-y-auto">
          <ProfileSidebar />
        </div>
      </div>

      {/* Edit Mode Overlay */}
      <EditModeOverlay />
    </>
  );
}

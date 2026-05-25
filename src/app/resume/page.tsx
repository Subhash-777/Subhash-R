'use client';
import { useState } from 'react';
import { ResumeContent } from '@/components/resume/ResumeContent';
import { ProfileSidebar } from '@/components/resume/ProfileSidebar';
import { ResumeLeftSidebar } from '@/components/resume/ResumeLeftSidebar';
import { EditModeOverlay } from '@/components/resume/EditMode/EditModeOverlay';

type ResumeMode = 'Recruiter' | 'Developer' | 'Researcher';

export default function ResumePage() {
  const [activeFile, setActiveFile] = useState('overview.md');
  const [mode, setMode] = useState<ResumeMode>('Recruiter');

  return (
    <>
      <div className="flex-1 h-full flex overflow-hidden justify-center max-w-[1800px] mx-auto w-full">
        {/* Left Sidebar — desktop only */}
        <div className="w-[300px] border-r border-white/5 bg-black/20 flex-shrink-0 hidden xl:flex flex-col overflow-y-auto">
          <ResumeLeftSidebar />
        </div>

        {/* Main Content — full width on mobile, constrained on desktop */}
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

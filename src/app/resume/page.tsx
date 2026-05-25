'use client';
import { useState } from 'react';
import { ResumeNav } from '@/components/resume/ResumeNav';
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
        {/* Left Sidebar (Actions & Summary) */}
        <div className="w-[300px] border-r border-white/5 bg-black/20 flex-shrink-0 hidden xl:block overflow-y-auto">
          <ResumeLeftSidebar />
        </div>

        {/* Main Content (Resume) */}
        <div className="flex-1 max-w-4xl min-w-0 bg-[#09090f]/50 overflow-y-auto shadow-2xl relative z-10">
          <ResumeContent mode={mode} />
        </div>

        {/* Right Sidebar (ATS & Roles) */}
        <div className="w-[340px] border-l border-white/5 bg-black/20 flex-shrink-0 hidden lg:block overflow-y-auto">
          <ProfileSidebar />
        </div>
      </div>

      {/* Edit Mode Overlay — renders above everything */}
      <EditModeOverlay />
    </>
  );
}

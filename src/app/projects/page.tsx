'use client';
import { useState } from 'react';
import { ProjectExplorer } from '@/components/projects/ProjectExplorer';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { RepoStats } from '@/components/projects/RepoStats';
import { PROJECTS, Project } from '@/data/projects';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  const handleSelect = (p: Project) => {
    setSelectedProject(p);
    setMobileView('detail');
  };

  return (
    <div className="flex-1 h-full flex overflow-hidden">
      {/* Left Sidebar — full screen on mobile when list view, hidden when detail view */}
      <div className={`
        ${mobileView === 'list' ? 'flex' : 'hidden'} lg:flex
        w-full lg:w-64 border-r border-white/5 bg-black/20 flex-shrink-0 flex-col
      `}>
        <ProjectExplorer selected={selectedProject} onSelect={handleSelect} />
      </div>

      {/* Main Content — full screen on mobile when detail view */}
      <div className={`
        ${mobileView === 'detail' ? 'flex' : 'hidden'} lg:flex
        flex-1 min-w-0 bg-[#09090f]/50 flex-col overflow-hidden
      `}>
        {/* Mobile back button */}
        <button
          onClick={() => setMobileView('list')}
          className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm text-violet-400 border-b border-white/5 bg-black/20 flex-shrink-0"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>
        <div className="flex-1 overflow-hidden">
          <ProjectDetail project={selectedProject} />
        </div>
      </div>

      {/* Right Sidebar — desktop only */}
      <div className="w-72 border-l border-white/5 bg-black/20 flex-shrink-0 hidden xl:block">
        <RepoStats project={selectedProject} />
      </div>
    </div>
  );
}

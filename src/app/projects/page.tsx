'use client';
import { useState } from 'react';
import { ProjectExplorer } from '@/components/projects/ProjectExplorer';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { RepoStats } from '@/components/projects/RepoStats';
import { PROJECTS, Project } from '@/data/projects';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);

  return (
    <div className="flex-1 h-full flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-white/5 bg-black/20 flex-shrink-0">
        <ProjectExplorer selected={selectedProject} onSelect={setSelectedProject} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 bg-[#09090f]/50">
        <ProjectDetail project={selectedProject} />
      </div>

      {/* Right Sidebar */}
      <div className="w-72 border-l border-white/5 bg-black/20 flex-shrink-0 hidden xl:block">
        <RepoStats project={selectedProject} />
      </div>
    </div>
  );
}

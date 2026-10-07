'use client';
import { useState } from 'react';
import { ProjectExplorer } from '@/components/projects/ProjectExplorer';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { RepoStats } from '@/components/projects/RepoStats';
import { PROJECTS, Project } from '@/data/projects';
import { ArrowLeft, BarChart2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [showMobileStats, setShowMobileStats] = useState(false);

  const handleSelect = (p: Project) => {
    setSelectedProject(p);
    setMobileView('detail');
    setShowMobileStats(false);
  };

  return (
    <div className="flex-1 h-full flex overflow-hidden relative">
      {/* Left Sidebar — list view on mobile */}
      <div className={`
        ${mobileView === 'list' ? 'flex' : 'hidden'} lg:flex
        w-full lg:w-64 border-r border-white/5 bg-black/20 flex-shrink-0 flex-col
      `}>
        <ProjectExplorer selected={selectedProject} onSelect={handleSelect} />
      </div>

      {/* Main Content — detail view on mobile */}
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
            <ArrowLeft size={15} /> Projects
          </button>
          
          <button
            onClick={() => setShowMobileStats(!showMobileStats)}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 py-1 px-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20"
          >
            <BarChart2 size={15} /> Tech Stats
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <ProjectDetail project={selectedProject} />
        </div>
      </div>

      {/* Right Sidebar — desktop */}
      <div className="w-72 border-l border-white/5 bg-black/20 flex-shrink-0 hidden xl:block">
        <RepoStats project={selectedProject} />
      </div>

      {/* Mobile Stats Drawer */}
      <AnimatePresence>
        {showMobileStats && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-h-[80vh] bg-[#0d0d1a] border-t border-white/10 rounded-t-3xl flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                  Project Stats — {selectedProject.name}
                </span>
                <button
                  onClick={() => setShowMobileStats(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-white bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                <RepoStats project={selectedProject} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, Star, Circle } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';

function LanguageDot({ color }: { color: string }) {
  return <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />;
}

export function ProjectExplorer({ selected, onSelect }: { selected: Project; onSelect: (p: Project) => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase">Project Explorer</span>
        <div className="flex gap-2 text-gray-600">
          <button className="hover:text-gray-300 transition-colors text-xs" title="New">+</button>
          <button className="hover:text-gray-300 transition-colors text-xs" title="Refresh">↺</button>
          <button className="hover:text-gray-300 transition-colors text-xs" title="More">⋮</button>
        </div>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 pb-24 lg:pb-4 custom-scrollbar">
        {PROJECTS.map((project) => {
          const isActive = project.id === selected.id;
          return (
            <motion.button
              key={project.id}
              onClick={() => onSelect(project)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              className={`w-full text-left px-4 py-2.5 transition-colors cursor-pointer border-l-2
                ${isActive
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-transparent hover:border-white/10'
                }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <LanguageDot color={project.languageColor} />
                <span className={`text-xs font-mono truncate font-medium ${isActive ? 'text-violet-300' : 'text-gray-300'}`}>
                  {project.name}
                </span>
              </div>
              <div className="flex items-center justify-between ml-4">
                <span className="text-[10px] text-gray-600">{project.language}</span>
                <span className="text-[10px] text-gray-600">Updated {project.updated}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

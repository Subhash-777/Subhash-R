'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, GitBranch, Code, AlertCircle, GitPullRequest, Play } from 'lucide-react';
import { Project } from '@/data/projects';

const FILE_TABS = ['README.md'];

export function ProjectDetail({ project }: { project: Project }) {
  const terminalRef = useRef<HTMLDivElement>(null);

  // Scroll to top and re-animate on project change
  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = 0;
  }, [project.id]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col h-full"
      >
        {/* Repo header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-white/5 flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-lg font-bold text-white font-mono">{project.name}</h2>
              <span className="text-[10px] border border-white/20 text-gray-400 px-2 py-0.5 rounded-full">
                {project.visibility}
              </span>
              {project.stars !== undefined && (
                <span className="flex items-center gap-1 text-yellow-400 text-xs">
                  <Star size={12} fill="currentColor" /> {project.stars}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1 font-mono">{project.description}</p>
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ml-4"
          >
            <ExternalLink size={12} /> Open in GitHub
          </a>
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-4 px-5 py-2 border-b border-white/5 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full" style={{ background: project.languageColor }} />
            <span>{project.language}</span>
          </div>
          <span className="text-xs text-gray-500">Updated {project.updated}</span>
          <div className="flex items-center gap-3 ml-auto">
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <Code size={12} /> Code
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <AlertCircle size={12} /> Issues 2
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <GitPullRequest size={12} /> Pull Requests 1
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <Play size={12} /> Actions
            </button>
          </div>
        </div>

        {/* File tabs */}
        <div className="flex items-center gap-0 px-4 border-b border-white/5 flex-shrink-0 overflow-x-auto">
          {FILE_TABS.map((tab, i) => (
            <div key={tab} className={`px-3 py-2 text-[11px] font-mono cursor-pointer transition-colors whitespace-nowrap
              ${i === 0
                ? 'text-violet-300 border-b-2 border-violet-500'
                : 'text-gray-500 hover:text-gray-300'
              }`}>
              {tab}
            </div>
          ))}
        </div>

        {/* Terminal output */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 pb-24 lg:pb-4 font-mono text-xs space-y-0.5 terminal-window"
        >
          {(project.terminalOutput || []).map((line, i) => (
            <motion.div
              key={`${project.id}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className={`leading-relaxed ${
                line.startsWith('[INFO]') ? 'text-blue-400' :
                line.startsWith('[RESULT]') || line.startsWith('[OK]') ? 'text-green-400' :
                line.startsWith('[ERROR]') ? 'text-red-400' :
                line.startsWith('subhash@') ? 'text-violet-400' :
                line.startsWith('├') || line.startsWith('└') || line.startsWith('│') ? 'text-gray-400' :
                'text-gray-300'
              }`}
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';

export function RepoStats({ project }: { project: Project }) {
  // Language bar (simulate)
  const langPct = project.language === 'Python' ? 92.1 : project.language === 'TypeScript' ? 88.3 : 75.0;
  const otherPct = 100 - langPct;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto p-4">
      {/* About */}
      <div className="glass-card p-4">
        <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">About</div>
        <p className="text-xs text-gray-300 leading-relaxed mb-3">{project.description}</p>
        {project.tags && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-violet-500/10 border border-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[10px] text-violet-400 hover:text-violet-300 mt-3 transition-colors"
        >
          <ExternalLink size={10} /> View on GitHub
        </a>
      </div>


      {/* Tech Stack */}
      <div className="glass-card p-4">
        <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Tech Stack</div>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map(tech => (
            <span key={tech} className="skill-badge text-[10px]">{tech}</span>
          ))}
        </div>
      </div>

      {/* Languages bar */}
      <div className="glass-card p-4">
        <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Languages</div>
        <div className="h-2 rounded-full overflow-hidden flex mb-2">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${langPct}%`, background: project.languageColor || '#3572A5' }}
          />
          <div className="h-full flex-1 bg-gray-600" />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400">
          <span style={{ color: project.languageColor }}>{project.language} {langPct}%</span>
          <span className="text-gray-500">Other {otherPct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

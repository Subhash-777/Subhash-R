'use client';
import { motion } from 'framer-motion';
import {
  FileText, GraduationCap, Folder, BookOpen,
  Code, Trophy, Award, Users, Download, Pencil
} from 'lucide-react';
import { PROJECT_BANK } from '@/data/projectBank';
import { useAppStore } from '@/store/app';

const NAV_FILES = [
  { name: 'overview.md',      label: 'Profile Overview',        icon: FileText,      badge: null, active: true },
  { name: 'education.json',   label: 'Education Details',       icon: GraduationCap, badge: null },
  { name: 'projects/',        label: 'All Projects',            icon: Folder,        badge: PROJECT_BANK.length },
  { name: 'publications/',    label: 'Research & Papers',       icon: BookOpen,      badge: 2 },
  { name: 'skills.yaml',      label: 'Technical Skills',        icon: Code,          badge: null },
  { name: 'achievements.log', label: 'Achievements',            icon: Trophy,        badge: 3 },
  { name: 'certifications/',  label: 'Certifications',          icon: Award,         badge: null },
  { name: 'memberships.json', label: 'Professional Memberships',icon: Users,         badge: 1 },
];

type ResumeMode = 'Recruiter' | 'Developer' | 'Researcher';

export function ResumeNav({
  activeFile,
  setActiveFile,
  mode,
  setMode,
}: {
  activeFile: string;
  setActiveFile: (f: string) => void;
  mode: ResumeMode;
  setMode: (m: ResumeMode) => void;
}) {
  const { openEditMode } = useAppStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase">Resume Navigation</span>
        <div className="flex gap-2 text-gray-600 text-xs">
          <button>+</button>
          <button>↺</button>
          <button>▾</button>
        </div>
      </div>

      {/* Files list */}
      <div className="flex-1 overflow-y-auto py-1">
        {NAV_FILES.map(({ name, label, icon: Icon, badge, active }) => {
          const isActive = activeFile === name;
          return (
            <motion.button
              key={name}
              onClick={() => setActiveFile(name)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              className={`w-full text-left px-4 py-2 flex items-center gap-2.5 transition-all cursor-pointer
                ${isActive ? 'bg-violet-500/15 border-l-2 border-violet-500' : 'border-l-2 border-transparent'}`}
            >
              <Icon size={14} className={isActive ? 'text-violet-400' : 'text-gray-500'} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs truncate font-mono ${isActive ? 'text-violet-300' : 'text-gray-400'}`}>{name}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                </div>
                <div className="text-[10px] text-gray-600 truncate">{label}</div>
              </div>
              {badge !== null && (
                <span className="text-[9px] bg-violet-500/20 text-violet-400 border border-violet-500/30 px-1.5 py-0.5 rounded-full font-bold">
                  {badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Resume mode selector */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-[10px] text-gray-500 font-mono">RESUME MODES</span>
          <span className="text-[10px] text-gray-600 ml-1 cursor-help" title="Switch between views">ⓘ</span>
        </div>
        <div className="flex gap-1 mb-3">
          {(['Recruiter', 'Developer', 'Researcher'] as ResumeMode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-colors
                ${mode === m
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="text-[9px] text-gray-600 mb-3">
          Optimized for {mode === 'Recruiter' ? 'recruiters and hiring managers' : mode === 'Developer' ? 'technical interviewers' : 'academic reviewers'}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => {
              const pin = process.env.NEXT_PUBLIC_EDIT_PIN;
              if (pin) {
                const input = window.prompt('Enter Edit Mode PIN:');
                if (input === pin) openEditMode();
                else if (input !== null) alert('Incorrect PIN.');
              } else {
                openEditMode();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-violet-500/50 text-violet-400
              hover:bg-violet-500/10 transition-all text-xs font-medium group"
          >
            <Pencil size={12} className="group-hover:rotate-12 transition-transform" />
            ✏️ Edit Mode
          </button>
          <a
            href="/Resume.pdf"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-gray-400
              hover:border-violet-500/30 hover:text-violet-400 transition-all text-xs font-medium"
          >
            <Download size={12} />
            ⬇️ Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

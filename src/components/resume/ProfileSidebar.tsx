'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Check, Circle } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/resume';
import { PROJECT_BANK, ROLE_COMBINATIONS } from '@/data/projectBank';
import { useAppStore } from '@/store/app';
import { calculateATSScore } from '@/lib/atsScorer';

export function ProfileSidebar() {
  const { selectedProjectIds, selectedRole, setSelectedRole, applySuggestedCombo, setCustomRoleTitle } = useAppStore();

  const selectedProjects = selectedProjectIds
    .map(id => PROJECT_BANK.find(p => p.id === id))
    .filter(Boolean) as typeof PROJECT_BANK;

  const atsResult = calculateATSScore(selectedProjects, selectedRole);

  const quickActions = [
    { label: 'View LinkedIn Profile', href: 'https://www.linkedin.com/in/subhash-r-b21137393/', icon: '💼' },
    { label: 'View GitHub Profile', href: 'https://github.com/Subhash-777', icon: '🐙' },
    { label: 'View IEEE Profile', href: 'https://ieeexplore.ieee.org', icon: '📡' },
    { label: 'Email Me', href: `mailto:${PERSONAL_INFO.email}`, icon: '✉️' },
  ];


  const suggestedRoles = Object.keys(ROLE_COMBINATIONS)
    .filter(r => r !== selectedRole)
    .slice(0, 4);

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    const combo = ROLE_COMBINATIONS[role];
    if (combo) {
      applySuggestedCombo(combo);
    }
    const { ROLE_TITLES } = require('@/data/projectBank');
    if (ROLE_TITLES[role]) {
      setCustomRoleTitle(ROLE_TITLES[role]);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto p-4 pb-24">

      {/* ATS Score Widget */}
      <div className="glass-card p-4 border border-white/5">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">ATS Match Score</div>
        {/* Score Bar */}
        <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mb-2">
          <motion.div
            className={`h-full rounded-full ${
              atsResult.score >= 90 ? 'bg-green-500' :
              atsResult.score >= 75 ? 'bg-yellow-500' :
              'bg-orange-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${atsResult.score}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xl font-bold font-mono ${
            atsResult.score >= 90 ? 'text-green-400' :
            atsResult.score >= 75 ? 'text-yellow-400' :
            'text-orange-400'
          }`}>
            {atsResult.score}%
          </span>
          <span className={`text-[10px] font-medium ${
            atsResult.score >= 90 ? 'text-green-400' :
            atsResult.score >= 75 ? 'text-yellow-400' :
            'text-orange-400'
          }`}>
            {atsResult.label}
          </span>
        </div>
        <div className="text-[10px] text-gray-500 mb-2">{selectedRole}</div>
        {/* Matched Keywords */}
        <div className="space-y-1">
          {atsResult.matched.slice(0, 4).map(kw => (
            <div key={kw} className="flex items-center gap-1.5 text-[10px]">
              <Check size={10} className="text-green-400" />
              <span className="text-gray-300">{kw} found</span>
            </div>
          ))}
          {atsResult.missing.slice(0, 2).map(kw => (
            <div key={kw} className="flex items-center gap-1.5 text-[10px]">
              <Circle size={10} className="text-gray-600" />
              <span className="text-gray-500">{kw} missing</span>
            </div>
          ))}
        </div>
      </div>

      {/* Role Fit Badges */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">Role Fit</div>
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-1 rounded-full font-medium">
            {selectedRole}
          </span>
        </div>
        <div className="text-[9px] text-gray-500 mb-2">Suggested combos:</div>
        <div className="flex flex-wrap gap-1">
          {suggestedRoles.map(role => (
            <button
              key={role}
              onClick={() => handleRoleClick(role)}
              className="text-[9px] bg-white/5 text-gray-400 hover:text-violet-300 hover:bg-violet-500/10
                border border-white/5 hover:border-violet-500/30 px-2 py-0.5 rounded-full transition-all"
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">Quick Actions</div>
        <div className="space-y-1">
          {quickActions.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <span className="text-sm">{icon}</span>
              <span className="text-[11px] text-gray-400 group-hover:text-violet-300 transition-colors flex-1">
                {label}
              </span>
              <ExternalLink size={9} className="text-gray-600 group-hover:text-violet-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

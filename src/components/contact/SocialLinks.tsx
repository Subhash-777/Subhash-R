'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS, PERSONAL_INFO } from '@/data/resume';

const WHAT_I_DO = [
  { icon: '🤖', label: 'AI / ML Engineer',    desc: 'Deep learning, computer vision, NLP' },
  { icon: '📊', label: 'Data Scientist',       desc: 'Analytics, ML pipelines, insights' },
  { icon: '🔬', label: 'Research Engineer',    desc: 'IEEE publications, novel algorithms' },
  { icon: '💻', label: 'Software Developer',   desc: 'Full-stack, DevOps, cloud-native' },
];

export function SocialLinks() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto p-4">
      {/* Availability banner */}
      <div
        className="glass-card p-4 text-center"
        style={{ border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.05)' }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-bold text-green-400">{t('Available')}</span>
        </div>
        <p className="text-[10px] text-gray-400">{PERSONAL_INFO.availability}</p>
        <div className="flex justify-center gap-2 mt-2 flex-wrap">
          {PERSONAL_INFO.work_modes?.map(m => (
            <span key={m} className="text-[9px] bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* What I Do */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">{t('What I Do')}</div>
        <div className="space-y-2.5">
          {WHAT_I_DO.map(({ icon, label, desc }) => (
            <div key={label} className="flex items-start gap-2.5">
              <span className="text-lg">{icon}</span>
              <div>
                <div className="text-xs font-semibold text-white">{label}</div>
                <div className="text-[10px] text-gray-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect With Me */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">{t('Connect With Me')}</div>
        <div className="space-y-1">
          {SOCIAL_LINKS.map(({ platform, url, handle }) => (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div>
                <div className="text-xs font-medium text-gray-300 group-hover:text-violet-300 transition-colors">
                  {platform}
                </div>
                <div className="text-[10px] text-gray-500 group-hover:text-violet-400 transition-colors">
                  {handle}
                </div>
              </div>
              <ExternalLink size={11} className="text-gray-600 group-hover:text-violet-400 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Work modes */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">{t('Work Preferences')}</div>
        <div className="space-y-2">
          {[
            { label: 'Full-time', icon: '🏢' },
            { label: 'Remote Work', icon: '🌐' },
            { label: 'On-site (Chennai)', icon: '📍' },
            { label: 'Research Projects', icon: '🔬' },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
              <span>{icon}</span>
              <span>{label}</span>
              <span className="ml-auto text-green-400 text-[10px]">✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

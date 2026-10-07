'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/resume';
import { useAppStore } from '@/store/app';

export function ContactSidebar() {
  const [copied, setCopied] = useState(false);
  const addToast = useAppStore(s => s.addToast);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    addToast({
      id: `toast-${Date.now()}`,
      type: 'info',
      title: 'Copied to Clipboard!',
      message: `${PERSONAL_INFO.email} copied`,
      icon: '📋',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-between w-full lg:w-[380px] xl:w-[400px] glass-card border-white/5 rounded-3xl p-6 sm:p-7 relative overflow-hidden shrink-0">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="z-10 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
            <span className="text-xs font-bold text-green-400 tracking-wider uppercase">Open to Opportunities</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            Let's build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">something</span><br />
            meaningful.
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            I'm currently looking for full-time roles, research collaborations, and exciting open-source projects.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="group flex items-center justify-between gap-3.5 cursor-pointer w-full p-2 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10" onClick={handleCopyEmail}>
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all shrink-0">
                <Mail className="text-gray-400 group-hover:text-violet-400 transition-colors" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Email (Tap to Copy)</div>
                <div className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">{PERSONAL_INFO.email}</div>
              </div>
            </div>

            <button className="p-2 rounded-xl bg-white/5 hover:bg-violet-600/30 text-gray-400 hover:text-violet-300 transition-all shrink-0" aria-label="Copy Email">
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>

          <a href={`tel:${PERSONAL_INFO.phone}`} className="group flex items-center gap-3.5 cursor-pointer w-full p-2 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all shrink-0">
              <Phone className="text-gray-400 group-hover:text-violet-400 transition-colors" size={18} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Phone</div>
              <div className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{PERSONAL_INFO.phone}</div>
            </div>
          </a>

          <div className="group flex items-center gap-3.5 w-full p-2 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <MapPin className="text-gray-400" size={18} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Location</div>
              <div className="text-xs sm:text-sm font-medium text-gray-200">Chennai, Tamil Nadu, India</div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 mt-6 pt-4 border-t border-white/5">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Connect</div>
        <div className="flex flex-wrap gap-2.5">
          {SOCIAL_LINKS.map(({ platform, url }) => (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              {platform}
              <ExternalLink size={11} className="opacity-50" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

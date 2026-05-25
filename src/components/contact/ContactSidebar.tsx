'use client';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/resume';

export function ContactSidebar() {
  return (
    <div className="flex flex-col justify-between w-full lg:w-[400px] h-auto lg:h-full glass-card border-white/5 rounded-3xl p-8 relative overflow-hidden shrink-0">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="z-10 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
            <span className="text-xs font-bold text-green-400 tracking-wider uppercase">Open to Opportunities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Let's build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">something</span><br />
            meaningful.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            I'm currently looking for full-time roles, research collaborations, and exciting open-source projects.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="group flex items-center gap-4 cursor-pointer w-max">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all">
              <Mail className="text-gray-400 group-hover:text-violet-400 transition-colors" size={20} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Email</div>
              <div className="text-xs md:text-sm font-medium text-gray-200 group-hover:text-white transition-colors break-all">{PERSONAL_INFO.email}</div>
            </div>
          </a>

          <a href={`tel:${PERSONAL_INFO.phone}`} className="group flex items-center gap-4 cursor-pointer w-max">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all">
              <Phone className="text-gray-400 group-hover:text-violet-400 transition-colors" size={20} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Phone</div>
              <div className="text-xs md:text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{PERSONAL_INFO.phone}</div>
            </div>
          </a>

          <div className="group flex items-center gap-4 w-max">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <MapPin className="text-gray-400" size={20} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Location</div>
              <div className="text-xs md:text-sm font-medium text-gray-200">Chennai, Tamil Nadu, India</div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 mt-8">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-4">Connect</div>
        <div className="flex flex-wrap gap-3">
          {SOCIAL_LINKS.map(({ platform, url }) => (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
            >
              {platform}
              <ExternalLink size={12} className="opacity-50" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

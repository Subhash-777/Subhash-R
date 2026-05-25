'use client';
import { MapPin, Mail, Phone, Clock, Calendar, Send } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/resume';

const ICONS: Record<string, React.ElementType> = { MapPin, Mail, Phone, Clock, Calendar, Send };

const INFO_ITEMS = [
  { icon: 'MapPin',   label: 'Location',          value: 'Chennai, Tamil Nadu, India', href: undefined },
  { icon: 'Mail',     label: 'Email',              value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
  { icon: 'Phone',    label: 'Phone',              value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
  { icon: 'Clock',    label: 'Response Time',      value: PERSONAL_INFO.responseTime, href: undefined },
  { icon: 'Calendar', label: 'Availability',       value: PERSONAL_INFO.availability, href: undefined },
  { icon: 'Send',     label: 'Preferred Contact',  value: PERSONAL_INFO.preferredContact, href: undefined },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto p-4">
      {/* Contact Info */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">Contact Info</div>
        <div className="space-y-3">
          {INFO_ITEMS.map(({ icon, label, value, href }) => {
            const Icon = ICONS[icon];
            const content = (
              <div className={`flex items-start gap-3 ${href ? 'group cursor-pointer' : ''}`}>
                <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={12} className="text-violet-400" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500">{label}</div>
                  <div className={`text-xs font-medium mt-0.5 ${href ? 'text-violet-300 group-hover:text-violet-200' : 'text-gray-300'}`}>
                    {value}
                  </div>
                </div>
              </div>
            );

            return href ? (
              <a key={label} href={href} className="block transition-colors">{content}</a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </div>
      </div>

      {/* Resume Link */}
      <a
        href="/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card p-4 hover:border-violet-500/30 transition-all group block"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xl">
            📄
          </div>
          <div>
            <div className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors">Resume.pdf</div>
            <div className="text-[10px] text-gray-500">Click to view / download</div>
          </div>
        </div>
      </a>

      {/* Let's Collaborate card */}
      <div
        className="glass-card p-5 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(109,40,217,0.2), rgba(124,58,237,0.1))',
          border: '1px solid rgba(124,58,237,0.3)',
        }}
      >
        <div className="text-3xl mb-2">🤝</div>
        <div className="text-sm font-bold text-white mb-1">LET'S COLLABORATE</div>
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Open to research opportunities, internships, and exciting projects. Let's build something meaningful.
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {['AI/ML', 'DevOps', 'Research', 'Open Source'].map(tag => (
            <span key={tag} className="text-[9px] bg-violet-500/15 border border-violet-500/25 text-violet-300 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

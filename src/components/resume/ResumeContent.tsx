'use client';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink, Github } from 'lucide-react';
import { PROJECT_BANK } from '@/data/projectBank';
import { useAppStore } from '@/store/app';
import { calculateATSScore } from '@/lib/atsScorer';

type ResumeMode = 'Recruiter' | 'Developer' | 'Researcher';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

const SectionHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-4">
    <h2 className="text-xl font-bold text-white tracking-tight">{label}</h2>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-violet-500/50 to-transparent" />
  </div>
);

const SKILLS = [
  { label: 'Languages', items: 'Python · JavaScript · TypeScript · Java · SQL · C++' },
  { label: 'Frontend', items: 'React.js · Next.js · React Native · Vite · Tailwind CSS · Responsive UI Design' },
  { label: 'Backend', items: 'Node.js · Express.js · FastAPI · REST APIs · WebSockets · JWT Authentication · OAuth 2.0' },
  { label: 'Databases', items: 'PostgreSQL · MongoDB · MySQL · Redis' },
  { label: 'DevOps & Cloud', items: 'Docker · Git · GitHub Actions · CI/CD · AWS (S3, EC2) · Linux' },
  { label: 'Data & Streaming', items: 'Apache Kafka · Apache Spark · Hadoop · HDFS · Real-Time Analytics' },
  { label: 'AI & LLM', items: 'Ollama · LangChain · OpenAI API · OCR · Prompt Engineering' },
];

const PUBLICATIONS = [
  {
    tag: 'C.1',
    title: 'QR Code Encryption Using LU Decomposition and PCA',
    venue: 'IConSCEPT 2024, IEEE',
    award: 'Best Research Paper Award',
    doi: '10.1109/IConSCEPT61884.2024.10627798',
    doiUrl: 'https://doi.org/10.1109/IConSCEPT61884.2024.10627798',
  },
  {
    tag: 'C.2',
    title: 'GAM Oversampling and GMM-Based Resampling for Imbalanced Credit Data Classification',
    venue: 'IEEE InC 2025',
    doi: '10.1109/InC465408.2025.11256257',
    doiUrl: 'https://doi.org/10.1109/InC465408.2025.11256257',
  },
];

const ACHIEVEMENTS = [
  {
    title: 'Best Research Paper Award',
    event: 'IConSCEPT 2024, IEEE International Conference, NIT-PY, India',
    year: '2024',
    bullet: 'Recognized for original cryptographic research among 200+ submitted papers across IEEE signal processing tracks.',
  },
  {
    title: '2nd Place — Coders of the Black Pearl',
    event: 'Neuroinx Club (KVB), Amrita Vishwa Vidyapeetham',
    year: '2024',
    bullet: 'Secured 2nd place among 80+ participants demonstrating algorithmic problem-solving under competitive time constraints.',
  },
  {
    title: 'Top 4 Finalist — Shaastra Robosoccer',
    event: 'Shaastra 2025, IIT Madras',
    year: 'Jan 2025',
    bullet: 'Placed among the top 4 of 100+ national university teams; built autonomous navigation and real-time object-tracking systems.',
  },
];

const CERTIFICATIONS = [
  'ML, Data Science & AI Engineering with Python — Udemy',
  'TensorFlow Deep Learning Bootcamp — Udemy',
  'Machine Learning Certification — Corizo (Jul 2024)',
  'IEEE Member, ID: 100981642 (Jan 2025 – Present)',
];

export function ResumeContent({ mode }: { mode: ResumeMode }) {
  const { selectedProjectIds, selectedRole, customRoleTitle } = useAppStore();
  const selectedProjects = selectedProjectIds
    .map(id => PROJECT_BANK.find(p => p.id === id))
    .filter(Boolean) as typeof PROJECT_BANK;

  return (
    <motion.div
      key={mode}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 p-6 md:p-10 overflow-y-auto h-full scrollbar-thin max-w-4xl mx-auto"
    >
      {/* ── Header ── */}
      <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-4">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Subhash R
        </h1>
        <div className="text-sm text-violet-400 font-medium mb-4 tracking-wide uppercase">
          {customRoleTitle || selectedRole}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-[13px] text-gray-400 mb-6">
          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-violet-500" />Chennai, India</span>
          <a href="tel:+919962187680" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={14} className="text-violet-500" />+91 9962187680
          </a>
          <a href="mailto:subhashravichandran7432@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={14} className="text-violet-500" />Email
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-[13px] font-medium">
          {[
            { label: 'Portfolio', url: 'https://subhash-r.vercel.app' },
            { label: 'GitHub', url: 'https://github.com/Subhash-777' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/subhash-r-b21137393/' },
            { label: 'LeetCode', url: 'https://leetcode.com/Subhash-777/' },
          ].map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300 transition-all flex items-center gap-1.5">
              <ExternalLink size={12} />{l.label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* ── Education ── */}
      <motion.div variants={itemVariants} className="relative group">
        <div className="absolute -inset-x-4 -inset-y-4 bg-white/[0.01] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <SectionHeader label="Education" />
        <div className="flex items-start justify-between flex-wrap gap-2 mt-4">
          <div>
            <div className="text-lg font-bold text-white tracking-tight">Amrita Vishwa Vidyapeetham</div>
            <div className="text-sm text-gray-400 mt-1">B.Tech in Computer Science and Engineering (AI) <span className="text-violet-500 mx-2">•</span> <span className="text-white">GPA: 7.43/10</span></div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Chennai, India</span>
            <br/>
            <span className="text-xs text-gray-500 font-medium tracking-wide">Aug 2023 – May 2027</span>
          </div>
        </div>
        <div className="mt-3 text-[13px] text-gray-400 leading-relaxed">
          <strong className="text-gray-300">Relevant Coursework:</strong> Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Machine Learning
        </div>
      </motion.div>

      {/* ── Technical Skills ── */}
      <motion.div variants={itemVariants} className="relative group mt-6">
        <div className="absolute -inset-x-4 -inset-y-4 bg-white/[0.01] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <SectionHeader label="Technical Skills" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {SKILLS.map(s => (
            <div key={s.label} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <div className="text-sm font-bold text-white mb-2">{s.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {s.items.split(' · ').map(item => (
                  <span key={item} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Projects ── */}
      <motion.div variants={itemVariants} className="relative group mt-6">
        <SectionHeader label="Featured Projects" />
        <div className="mt-4 space-y-6">
          {selectedProjects.map(proj => (
            <div key={proj.id} className="group/proj relative">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="text-lg font-bold text-white flex items-center gap-3">
                    {proj.title}
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover/proj:opacity-100 text-gray-500 hover:text-violet-400 transition-all">
                      <Github size={16} />
                    </a>
                  </div>
                  <div className="text-xs text-violet-400 font-mono mt-1 mb-3">{proj.stack.replace(/, /g, ' · ')}</div>
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wide flex-shrink-0 mt-1">{proj.date}</div>
              </div>
              <ul className="space-y-2 pl-4 border-l-2 border-white/5 group-hover/proj:border-violet-500/30 transition-colors">
                {proj.bullets.map((bullet, i) => (
                  <li key={i} className="text-[13px] text-gray-300 leading-relaxed relative before:content-[''] before:absolute before:-left-[21px] before:top-2 before:w-1.5 before:h-1.5 before:bg-violet-500/50 before:rounded-full">
                    {bullet.replace(/\\%/g, '%').replace(/\\\\/g, '')}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Publications ── */}
      <motion.div variants={itemVariants} className="relative group mt-6">
        <SectionHeader label="Publications & Research" />
        <div className="mt-4 space-y-4">
          {PUBLICATIONS.map(pub => (
            <div key={pub.tag} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 font-bold text-xs">
                {pub.tag}
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-snug">{pub.title}</div>
                <div className="text-[13px] text-gray-400 mt-1">
                  {pub.venue}
                  {pub.award && <span className="text-yellow-400 font-medium ml-2 px-2 py-0.5 rounded-full bg-yellow-500/10 text-[11px] border border-yellow-500/20">🏆 {pub.award}</span>}
                </div>
                <a href={pub.doiUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 mt-2 font-mono">
                  <ExternalLink size={10} /> DOI: {pub.doi}
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Achievements ── */}
      <motion.div variants={itemVariants} className="relative group mt-6">
        <SectionHeader label="Achievements" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-bold text-white">{a.title}</div>
                <div className="text-xs text-gray-500">{a.year}</div>
              </div>
              <div className="text-[11px] text-violet-400 mb-2 font-medium">{a.event}</div>
              <div className="text-[13px] text-gray-400 leading-relaxed">{a.bullet}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Certifications & Memberships ── */}
      <motion.div variants={itemVariants} className="relative group mt-6 mb-10">
        <SectionHeader label="Certifications" />
        <div className="mt-4 flex flex-wrap gap-2">
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="px-3 py-2 rounded-lg bg-white/5 text-[13px] text-gray-300 border border-white/5">
              {cert}
            </div>
          ))}
          <a href="https://drive.google.com/drive/folders/1bT21k_daffiNjxOZ8LUu7qmINlcJuSgU?usp=drive_link"
            target="_blank" rel="noopener noreferrer" 
            className="px-3 py-2 rounded-lg bg-violet-500/10 text-[13px] text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 transition-colors flex items-center gap-1.5">
            View All Credentials <ExternalLink size={12} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';

// Flatten all skills and limit to fit perfectly
const ALL_SKILLS = SKILL_CATEGORIES.flatMap(cat => cat.skills).slice(0, 21);

import {
  SiPython, SiCplusplus, SiJavascript, SiTypescript, SiDocker, SiKubernetes,
  SiGit, SiGnubash, SiFastapi, SiReact, SiNextdotjs, SiPostgresql,
  SiMongodb, SiNodedotjs, SiOpenai, SiPytorch, SiTensorflow, SiApachekafka,
  SiApachespark, SiMysql
} from 'react-icons/si';
import { FaJava, FaLinux, FaDatabase, FaBrain, FaNetworkWired, FaLink, FaAws, FaBook } from 'react-icons/fa';

// Map skills to icons
const SKILL_ICONS: Record<string, React.ReactNode> = {
  'Python': <SiPython className="text-[#3776AB]" />,
  'C++': <SiCplusplus className="text-[#00599C]" />,
  'JavaScript': <SiJavascript className="text-[#F7DF1E]" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'Java': <FaJava className="text-[#007396]" />,
  'SQL': <FaDatabase className="text-[#CC292B]" />,
  'Linux': <FaLinux className="text-[#FCC624]" />,
  'Docker': <SiDocker className="text-[#2496ED]" />,
  'Kubernetes': <SiKubernetes className="text-[#326CE5]" />,
  'AWS': <FaAws className="text-[#FF9900]" />,
  'Git': <SiGit className="text-[#F05032]" />,
  'Shell': <SiGnubash className="text-[#4EAA25]" />,
  'FastAPI': <SiFastapi className="text-[#009688]" />,
  'React': <SiReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'PostgreSQL': <SiPostgresql className="text-[#4169E1]" />,
  'MongoDB': <SiMongodb className="text-[#47A248]" />,
  'Node.js': <SiNodedotjs className="text-[#339939]" />,
  'System Design': <FaNetworkWired className="text-gray-400" />,
  'RAG': <FaBook className="text-[#8b5cf6]" />,
  'LangChain': <FaLink className="text-gray-300" />,
  'LLM': <FaBrain className="text-[#a855f7]" />,
  'OpenAI': <SiOpenai className="text-white" />,
  'PyTorch': <SiPytorch className="text-[#EE4C2C]" />,
  'TensorFlow': <SiTensorflow className="text-[#FF6F00]" />,
  'Apache Kafka': <SiApachekafka className="text-[#231F20]" />,
  'Apache Spark': <SiApachespark className="text-[#E25A1C]" />,
  'Hadoop': <FaDatabase className="text-[#FFE000]" />,
  'MySQL': <SiMysql className="text-[#4479A1]" />,
};

export function SkillsPanel() {
  const [visible, setVisible] = useState<boolean[]>([]);

  useEffect(() => {
    // Stagger badges from center outward
    ALL_SKILLS.forEach((_, i) => {
      setTimeout(() => {
        setVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 55);
    });
  }, []);

  return (
    <div className="glass-card p-5 border-white/5 rounded-2xl w-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <span className="text-gray-400 text-[11px] font-mono font-bold">&lt; <span className="text-gray-200">skills.sh</span> /&gt;</span>
      </div>

      {/* Badge grid */}
      <div className="flex flex-wrap gap-2 pb-2 flex-1 content-start">
        {ALL_SKILLS.map((skill, i) => (
          <span
            key={skill}
            className="flex items-center gap-2 px-2.5 py-1 bg-[#120a21]/50 border border-white/10 rounded-full text-[10px] text-gray-300 font-mono"
            style={{
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
              transition: `opacity 0.3s ease, transform 0.3s ease`,
            }}
          >
            {SKILL_ICONS[skill]}
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

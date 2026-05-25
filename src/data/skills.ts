// src/data/skills.ts
export interface SkillCategory {
  label: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['Python', 'C++', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'Linux'],
  },
  {
    label: 'DevOps',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'Shell'],
  },
  {
    label: 'Web',
    skills: ['FastAPI', 'React', 'Next.js', 'PostgreSQL', 'MongoDB', 'Node.js'],
  },
  {
    label: 'AI / ML',
    skills: ['System Design', 'RAG', 'LangChain', 'LLM', 'OpenAI', 'PyTorch', 'TensorFlow'],
  },
  {
    label: 'Data',
    skills: ['Apache Kafka', 'Apache Spark', 'Hadoop', 'MySQL'],
  },
];

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap(c => c.skills);

export const INTERESTS = [
  { id: '01', label: 'Web Development' },
  { id: '02', label: 'Computer Vision' },
  { id: '03', label: 'Data Engineering' },
  { id: '04', label: 'Distributed Systems' },
  { id: '05', label: 'DevOps' },
  { id: '06', label: 'Open Source' },
];

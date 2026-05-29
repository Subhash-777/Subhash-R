// src/lib/search/searchIndex.ts
// Builds a normalized, flat search index from all portfolio data sources

import { PROJECTS } from '@/data/projects';
import { PROJECT_BANK } from '@/data/projectBank';
import { SKILL_CATEGORIES, ALL_SKILLS, INTERESTS } from '@/data/skills';
import { PAPERS } from '@/data/research';
import { PERSONAL_INFO, EDUCATION, ACHIEVEMENTS, CERTIFICATIONS } from '@/data/resume';
import type { SearchableItem } from './types';

function buildNavigationItems(): SearchableItem[] {
  return [
    {
      id: 'nav-home',
      title: 'Home',
      description: 'Go to the SubhashOS home desktop',
      tags: ['home', 'desktop', 'main', 'landing'],
      route: '/',
      type: 'navigation',
      aliases: ['home', 'goto home', 'main', 'desktop'],
      icon: '🏠',
    },
    {
      id: 'nav-projects',
      title: 'Projects',
      description: 'Browse all projects and repositories',
      tags: ['projects', 'repos', 'github', 'code', 'portfolio'],
      route: '/projects',
      type: 'navigation',
      aliases: ['projects', 'goto projects', 'repos', 'open projects'],
      icon: '📁',
    },
    {
      id: 'nav-research',
      title: 'Research',
      description: 'View IEEE publications and research papers',
      tags: ['research', 'papers', 'ieee', 'publications', 'academic'],
      route: '/research',
      type: 'navigation',
      aliases: ['research', 'goto research', 'papers', 'publications'],
      icon: '🔬',
    },
    {
      id: 'nav-resume',
      title: 'Resume',
      description: 'Interactive resume with ATS-optimized export',
      tags: ['resume', 'cv', 'hire', 'download', 'pdf'],
      route: '/resume',
      type: 'navigation',
      aliases: ['resume', 'goto resume', 'cv', 'open resume'],
      icon: '📄',
    },
    {
      id: 'nav-contact',
      title: 'Contact',
      description: 'Get in touch with Subhash',
      tags: ['contact', 'email', 'reach', 'hire', 'message'],
      route: '/contact',
      type: 'navigation',
      aliases: ['contact', 'goto contact', 'email', 'reach out'],
      icon: '✉️',
    },
  ];
}

function buildProjectItems(): SearchableItem[] {
  return PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    title: p.name,
    description: p.description,
    tags: [...p.techStack, ...(p.tags || []), p.type, p.language],
    route: '/projects',
    section: p.id,
    type: 'project' as const,
    aliases: [p.id, p.name.toLowerCase()],
    icon: '💻',
  }));
}

function buildProjectBankItems(): SearchableItem[] {
  return PROJECT_BANK.map((p) => ({
    id: `bank-${p.id}`,
    title: p.title,
    description: p.bullets[0]?.slice(0, 120) + '...',
    tags: [...p.atsKeywords, ...p.domain, ...p.roleFit],
    route: '/resume',
    section: p.id,
    type: 'project' as const,
    aliases: [p.id, p.title.toLowerCase()],
    icon: p.status === 'active' ? '✅' : '🔄',
  }));
}

function buildSkillItems(): SearchableItem[] {
  const items: SearchableItem[] = [];

  SKILL_CATEGORIES.forEach((cat) => {
    cat.skills.forEach((skill) => {
      items.push({
        id: `skill-${skill.toLowerCase().replace(/[\s\/]/g, '-')}`,
        title: skill,
        description: `${cat.label} skill — part of Subhash's tech stack`,
        tags: [cat.label.toLowerCase(), 'skill', 'tech', skill.toLowerCase()],
        type: 'skill',
        aliases: [skill.toLowerCase()],
        icon: '⚡',
      });
    });
  });

  return items;
}

function buildResearchItems(): SearchableItem[] {
  return PAPERS.map((p) => ({
    id: `research-${p.id}`,
    title: p.title,
    description: `${p.conference} — ${p.authors.join(', ')}`,
    tags: [...p.keywords, p.conference, 'ieee', 'paper', 'research'],
    route: '/research',
    section: p.id,
    type: 'research' as const,
    aliases: [p.id, p.title.toLowerCase().slice(0, 40)],
    icon: '📑',
  }));
}

function buildResumeItems(): SearchableItem[] {
  const items: SearchableItem[] = [
    {
      id: 'resume-education',
      title: 'Education — Amrita Vishwa Vidyapeetham',
      description: `B.Tech CSE (AI) — GPA: ${EDUCATION[0]?.gpa}`,
      tags: ['education', 'university', 'degree', 'btech', 'amrita', 'gpa'],
      route: '/resume',
      section: 'education',
      type: 'resume',
      aliases: ['education', 'university', 'college'],
      icon: '🎓',
    },
    {
      id: 'resume-about',
      title: 'About Subhash R',
      description: PERSONAL_INFO.tagline,
      tags: ['about', 'bio', 'whoami', 'subhash', 'profile'],
      type: 'resume',
      aliases: ['about', 'whoami', 'who is subhash'],
      icon: '👤',
    },
  ];

  ACHIEVEMENTS.forEach((a, i) => {
    items.push({
      id: `resume-achievement-${i}`,
      title: a.title,
      description: `${a.event} — ${a.year}`,
      tags: ['achievement', 'award', a.type.toLowerCase()],
      route: '/resume',
      section: 'achievements',
      type: 'resume',
      aliases: [a.title.toLowerCase()],
      icon: a.icon,
    });
  });

  return items;
}

import { getAllCommands } from './commandRegistry';

let cachedIndex: SearchableItem[] | null = null;

export function buildSearchIndex(): SearchableItem[] {
  if (cachedIndex) return cachedIndex;

  const commandItems: SearchableItem[] = getAllCommands().map(c => ({
    id: `cmd-${c.id}`,
    title: c.label,
    description: c.description,
    tags: c.keywords,
    type: c.category === 'easter-egg' ? 'easter-egg' : 'command',
    aliases: c.aliases,
    icon: c.icon,
  }));

  cachedIndex = [
    ...buildNavigationItems(),
    ...commandItems,
    ...buildProjectItems(),
    ...buildProjectBankItems(),
    ...buildSkillItems(),
    ...buildResearchItems(),
    ...buildResumeItems(),
  ];

  return cachedIndex;
}

export function getSearchIndex(): SearchableItem[] {
  return cachedIndex || buildSearchIndex();
}

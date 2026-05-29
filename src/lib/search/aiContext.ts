// src/lib/search/aiContext.ts
// Builds compact grounding text from local portfolio data for Gemini

import { PERSONAL_INFO, EDUCATION, ACHIEVEMENTS, CERTIFICATIONS } from '@/data/resume';
import { SKILL_CATEGORIES } from '@/data/skills';
import { PAPERS } from '@/data/research';
import { PROJECT_BANK } from '@/data/projectBank';

export function buildAIContext(): string {
  const sections: string[] = [];

  // Personal info
  sections.push(`ABOUT: Subhash R is a ${PERSONAL_INFO.specialization} student. ${PERSONAL_INFO.tagline}. Located in ${PERSONAL_INFO.location}. Status: ${PERSONAL_INFO.availability}. Email: ${PERSONAL_INFO.email}. Languages spoken: ${PERSONAL_INFO.languages.join(', ')}.`);

  // Education
  const edu = EDUCATION[0];
  if (edu) {
    sections.push(`EDUCATION: ${edu.degree} at ${edu.institution}, ${edu.location}. Period: ${edu.period}. GPA: ${edu.gpa}. Status: ${edu.status}.`);
  }

  // Skills
  const skillText = SKILL_CATEGORIES.map(c => `${c.label}: ${c.skills.join(', ')}`).join('. ');
  sections.push(`SKILLS: ${skillText}.`);

  // Projects (top 8 by tier)
  const topProjects = PROJECT_BANK
    .sort((a, b) => a.priorityTier - b.priorityTier)
    .slice(0, 8);
  const projText = topProjects.map(p =>
    `${p.title} (${p.stack.split(',').slice(0, 3).join(',')}): ${p.bullets[0]?.slice(0, 100)}`
  ).join('. ');
  sections.push(`KEY PROJECTS: ${projText}.`);

  // Research
  const resText = PAPERS.map(p =>
    `"${p.title}" at ${p.conference}${p.award ? ` — ${p.award}` : ''}`
  ).join('. ');
  sections.push(`RESEARCH: ${resText}. IEEE Member ID: 100981642.`);

  // Achievements
  const achText = ACHIEVEMENTS.map(a => `${a.title} (${a.event}, ${a.year})`).join('. ');
  sections.push(`ACHIEVEMENTS: ${achText}.`);

  // Contact
  sections.push(`CONTACT: Email ${PERSONAL_INFO.email}, Phone ${PERSONAL_INFO.phone}. Portfolio: subhash-r.vercel.app. GitHub: github.com/Subhash-777. LinkedIn: linkedin.com/in/subhash-r-b21137393.`);

  return sections.join('\n');
}

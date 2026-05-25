// src/lib/generateLatex.ts
// Generates complete LaTeX source from selected projects

import { ProjectBankEntry } from '@/data/projectBank';
import { RESUME_TEMPLATE } from './resumeTemplate';

function escapeLatex(str: string): string {
  // Don't double-escape things that are already LaTeX-escaped (like \%)
  return str
    .replace(/(?<!\\)&/g, '\\&')
    .replace(/(?<!\\)%/g, '\\%')
    .replace(/(?<!\\)#/g, '\\#')
    .replace(/(?<!\\)\$/g, '\\$')
    .replace(/(?<!\\)_/g, '\\_')
    .replace(/(?<!\\)\^/g, '\\^{}')
    .replace(/(?<!\\)~/g, '\\~{}');
}

function formatProjectLatex(project: ProjectBankEntry): string {
  return `  \\resumeProjectHeading
    {\\textbf{${project.title}} \\\\
     \\small\\textit{${project.stack}}
     \\href{${project.githubUrl}}{\\, \\small[\\faGithub]}}{${project.date}}
  \\resumeItemListStart
    \\resumeItem{${project.bullets[0]}}
    \\resumeItem{${project.bullets[1]}}
  \\resumeItemListEnd`;
}

export function generateLatex(
  selectedProjects: ProjectBankEntry[],
  roleTitle: string
): string {
  const projectsLatex = selectedProjects.map(formatProjectLatex).join('\n\n');
  const titleLatex = roleTitle
    .split(' · ')
    .join(' \\ $\\cdot$ \\ ');

  return RESUME_TEMPLATE
    .replace('{{ROLE_TITLE_LINE}}', titleLatex)
    .replace('{{PROJECTS_CONTENT}}', projectsLatex);
}

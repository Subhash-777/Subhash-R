import { useState } from 'react';
import { generateLatex } from '@/lib/generateLatex';
import { ROLE_FILENAMES } from '@/data/projectBank';
import { ProjectBankEntry } from '@/data/projectBank';

export function useExportPDF() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingLines, setExportingLines] = useState<string[]>([]);

  const exportPDF = async (
    selectedProjects: ProjectBankEntry[],
    selectedRole: string,
    customRoleTitle: string
  ) => {
    setIsExporting(true);
    setExportingLines([]);
    const lines = [
      '> Building resume...',
      `> Injecting ${selectedProjects[0]?.title || 'Project 1'}...`,
      `> Injecting ${selectedProjects[1]?.title || 'Project 2'}...`,
      `> Injecting ${selectedProjects[2]?.title || 'Project 3'}...`,
      '> Preparing LaTeX source...',
      '> Compiling PDF via Cloud Engine...',
    ];
    
    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 300));
      setExportingLines(prev => [...prev, lines[i]]);
    }
    
    const latex = generateLatex(selectedProjects, customRoleTitle);
    const filename = ROLE_FILENAMES[selectedRole] || 'SubhashR_Resume_2026.pdf';
    
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latex, filename }),
      });

      if (!response.ok) {
        throw new Error('Failed to compile PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportingLines(prev => [...prev, `> Done. ${filename} downloaded successfully.`]);
    } catch (error) {
      console.error(error);
      setExportingLines(prev => [...prev, '> Error: PDF compilation failed. Fallback to .tex export...']);
      
      // Fallback to .tex download
      const texFilename = filename.replace('.pdf', '.tex');
      const blob = new Blob([latex], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = texFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportingLines(prev => [...prev, `> Done. ${texFilename} downloaded as fallback.`]);
    }
    
    setTimeout(() => {
      setIsExporting(false);
      setExportingLines([]);
    }, 3000);
  };

  return { exportPDF, isExporting, exportingLines };
}

'use client';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/app';
import { useExportPDF } from '@/hooks/useExportPDF';
import { Pencil, Download } from 'lucide-react';
import { SYSTEM_SUMMARY_LINES } from '@/data/resume';
import { PROJECT_BANK } from '@/data/projectBank';

export function ResumeLeftSidebar() {
  const [logVisible, setLogVisible] = useState<boolean[]>([]);
  const { selectedProjectIds, selectedRole, customRoleTitle, openEditMode } = useAppStore();
  const { exportPDF, isExporting, exportingLines } = useExportPDF();

  const selectedProjects = selectedProjectIds
    .map(id => PROJECT_BANK.find(p => p.id === id))
    .filter(Boolean) as typeof PROJECT_BANK;

  useEffect(() => {
    SYSTEM_SUMMARY_LINES.forEach((_, i) => {
      setTimeout(() => {
        setLogVisible(prev => { const n = [...prev]; n[i] = true; return n; });
      }, 600 + i * 350);
    });
  }, []);

  const profileSummary = [
    { label: 'Status', value: 'Available', valueClass: 'text-green-400' },
    { label: 'Specialization', value: 'AI & Machine Learning', valueClass: 'text-violet-300' },
    { label: 'Location', value: 'Chennai, India', valueClass: 'text-gray-300' },
    { label: 'Experience', value: 'Fresher', valueClass: 'text-gray-300' },
    { label: 'Languages', value: 'English, Tamil', valueClass: 'text-gray-300' },
  ];

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto p-4 pb-24">
      {/* Action Buttons */}
      <div className="glass-card p-4 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
        <div className="text-[10px] font-semibold text-violet-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          Resume Actions
        </div>
        <div className="space-y-2">
          <button
            onClick={() => {
              const pin = process.env.NEXT_PUBLIC_EDIT_PIN;
              if (pin) {
                const input = window.prompt('Enter Edit Mode PIN:');
                if (input === pin) openEditMode();
                else if (input !== null) alert('Incorrect PIN.');
              } else {
                openEditMode();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-violet-500/50 text-violet-300
              hover:bg-violet-500/10 transition-all text-xs font-medium group"
          >
            <Pencil size={14} className="group-hover:rotate-12 transition-transform" />
            Edit Content
          </button>
          
          <button
            onClick={() => exportPDF(selectedProjects as any, selectedRole, customRoleTitle)}
            disabled={isExporting}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-xs font-medium transition-all ${
              isExporting 
                ? 'border-gray-500/30 text-gray-400 cursor-not-allowed bg-white/5' 
                : 'border-white/10 text-gray-300 hover:border-violet-500/30 hover:text-violet-400 bg-white/[0.02]'
            }`}
          >
            <Download size={14} className={isExporting ? 'animate-bounce' : ''} />
            {isExporting ? 'Compiling PDF...' : 'Download PDF'}
          </button>
          
          {/* Export Animation Text */}
          {exportingLines.length > 0 && (
            <div className="mt-3 bg-black/40 p-2 rounded border border-white/5 font-mono text-[9px] text-gray-400 space-y-1">
              {exportingLines.map((line, i) => (
                <div key={i} className="animate-pulse">{line}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Summary */}
      <div className="glass-card p-4">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Profile Summary
        </div>
        <div className="space-y-2.5">
          {profileSummary.map(({ label, value, valueClass }) => (
            <div key={label} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
              <span className="text-[10px] text-gray-500">{label}</span>
              <span className={`text-[10px] font-medium ${valueClass}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Summary — boot-log style */}
      <div className="glass-card p-4 mt-auto">
        <div className="text-[10px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">System Summary</div>
        <div className="font-mono text-[10px] space-y-1.5">
          {SYSTEM_SUMMARY_LINES.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between transition-all duration-300"
              style={{ opacity: logVisible[i] ? 1 : 0 }}
            >
              <span className="text-gray-400">&gt; {item.text}</span>
              <span className={item.status === 'Done' ? 'text-green-400' : 'text-yellow-400 animate-pulse'}>
                {item.status === 'Done' ? 'Done ✓' : `${item.status} ●`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

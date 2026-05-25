'use client';

type ResumeMode = 'Recruiter' | 'Developer' | 'Researcher';

export function ResumeModes({ mode, setMode }: { mode: ResumeMode, setMode: (m: ResumeMode) => void }) {
  return (
    <div className="flex gap-1 p-2 bg-black/20 rounded-lg border border-white/5">
      {(['Recruiter', 'Developer', 'Researcher'] as ResumeMode[]).map(m => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`flex-1 py-1.5 rounded-md text-[10px] font-medium transition-colors
            ${mode === m
              ? 'bg-violet-600 text-white'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

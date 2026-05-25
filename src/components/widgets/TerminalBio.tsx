'use client';
import { useEffect, useRef, useState } from 'react';

const BIO_LINES = [
  "Hi, I'm Subhash.",
  "AI Engineer & DevOps enthusiast.",
  "Building intelligent systems,",
  "automating infrastructure, and",
  "exploring AI's real-world impact.",
];

const EASTER_EGG_RESPONSES: Record<string, string[]> = {
  ls: ['about.txt', 'skills.sh', 'projects/', 'research/', 'resume.pdf'],
  pwd: ['/home/subhash'],
  whoami: ['subhash — AI Engineer & DevOps Enthusiast'],
  help: ['Available: ls, pwd, whoami, date, uname'],
  date: [new Date().toDateString()],
  uname: ['SubhashOS v1.0.0 #1 SMP AI-Core x86_64'],
};

export function TerminalBio() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [commandTyped, setCommandTyped] = useState('');
  const [userInput, setUserInput] = useState('');
  const [extraLines, setExtraLines] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Type the command first
  useEffect(() => {
    const cmd = '$ cat about.txt';
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setCommandTyped(cmd.slice(0, i + 1));
        i++;
        if (i >= cmd.length) {
          clearInterval(interval);
          // Then reveal lines
          let lineIdx = 0;
          const lineInterval = setInterval(() => {
            if (lineIdx < BIO_LINES.length) {
              setVisibleLines(prev => [...prev, lineIdx]);
              lineIdx++;
            } else {
              clearInterval(lineInterval);
            }
          }, 120);
        }
      }, 40);
    }, 800);

    return () => clearTimeout(delay);
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = userInput.trim().toLowerCase();
      const response = EASTER_EGG_RESPONSES[cmd];
      if (response) {
        setExtraLines(prev => [...prev, `$ ${userInput}`, ...response]);
      } else if (cmd) {
        setExtraLines(prev => [...prev, `$ ${userInput}`, `bash: ${cmd}: command not found`]);
      }
      setUserInput('');
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    }
  };

  return (
    <div className="glass-card terminal-window font-mono text-sm w-full max-w-xs flex flex-col shrink-0">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <span className="text-green-400 text-[11px] font-bold">subhash@subhashOS ~</span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
        </div>
      </div>

      {/* Terminal content */}
      <div ref={scrollRef} className="p-4 space-y-0.5 text-gray-300 text-xs overflow-y-auto max-h-[180px]">
        {/* Typed command */}
        {commandTyped && (
          <div className="font-bold flex gap-1.5">
            <span className="text-green-400">$</span>
            <span className="text-gray-300">{commandTyped.replace('$ ', '')}</span>
          </div>
        )}

        {/* Bio lines */}
        {BIO_LINES.map((line, i) => (
          <div
            key={i}
            className="transition-all duration-150"
            style={{ opacity: visibleLines.includes(i) ? 1 : 0 }}
          >
            {line.includes('Subhash') ? (
              <span>
                {line.replace('Subhash.', '')}
                <span className="text-violet-400 font-bold">Subhash.</span>
              </span>
            ) : line}
          </div>
        ))}

        {/* Easter egg outputs */}
        {extraLines.map((line, i) => (
          <div key={`extra-${i}`} className={line.startsWith('$') ? 'text-violet-400 mt-1' : 'text-gray-300'}>
            {line}
          </div>
        ))}

        {/* Input line */}
        {visibleLines.length === BIO_LINES.length && (
          <div className="flex items-center mt-2" onClick={() => inputRef.current?.focus()}>
            <span className="text-green-400 font-bold shrink-0">$</span>
            <div className="relative flex-1 ml-2 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={handleCommand}
                className="w-full bg-transparent outline-none text-gray-300 caret-white z-10 relative"
                placeholder=""
                aria-label="Terminal input"
              />
              {!userInput && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-3.5 bg-gray-300 animate-blink pointer-events-none z-0" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

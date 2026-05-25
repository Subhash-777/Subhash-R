'use client';
import { ReactNode } from 'react';

export function TerminalText({ children, className = '', prefix = '$' }: { children: ReactNode; className?: string; prefix?: string }) {
  return (
    <div className={`font-mono text-xs text-gray-300 ${className}`}>
      {prefix && <span className="text-violet-400 mr-2">{prefix}</span>}
      {children}
    </div>
  );
}

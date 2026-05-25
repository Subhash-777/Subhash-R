export function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[10px] bg-violet-500/10 border border-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
}

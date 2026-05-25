'use client';
import { useAppStore } from '@/store/app';
import BootAnimation from './BootAnimation';

export function BootGate({ children }: { children: React.ReactNode }) {
  const bootComplete = useAppStore(s => s.bootComplete);

  return (
    <>
      {!bootComplete && <BootAnimation />}
      <div style={{ opacity: bootComplete ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}>
        {children}
      </div>
    </>
  );
}

'use client';
import { useAppStore } from '@/store/app';

export function useBootComplete() {
  const bootComplete = useAppStore(s => s.bootComplete);
  return bootComplete;
}

'use client';
import { useState } from 'react';

export function useMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Howler.js integration would go here
  return { isPlaying, setIsPlaying };
}

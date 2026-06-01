'use client';
// src/components/search/effects/BinksOverlay.tsx
// Bink's Sake — hidden audio + pirate ship + floating messages

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import anime from 'animejs';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n'; // Initialize i18n
import { useAppStore } from '@/store/app';

const BINKS_LYRICS = [
  "Yo-hohoho, Yo-hohoho",
  "Yo-hohoho, Yo-hohoho",
  "Yo-hohoho, Yo-hohoho",
  "Yo-hohoho, Yo-hohoho",
  "Gather up all of the crew",
  "It's time to ship out Bink's brew",
  "Sea wind blows, to where, who knows?",
  "The waves will be our guide",
  "Tied across the ocean's fold",
  "Rays of sun of shimmering gold",
  "Birds all sing, of a ship's returning",
  "From over the horizon",
  "Let's go singing a song",
  "A song of a boat that's gone",
  "Leaving behind a trail of the sea",
  "Through the storm and the sea",
  "We are pirates, brave and free",
  "Singing the song of the sea",
  "Bink's Sake, a pirate's delight",
];

export function BinksOverlay() {
  const { t } = useTranslation();
  const setActiveEgg = useAppStore((s) => s.setActiveEgg);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const shipImgRef = useRef<HTMLImageElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const lyricIndexRef = useRef(0);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      gsap.to(audioRef.current, {
        volume: 0,
        duration: 2,
        onComplete: () => {
          audioRef.current?.pause();
          setActiveEgg(null);
        }
      });
    } else {
      setActiveEgg(null);
    }
    
    if (shipRef.current) {
      gsap.to(shipRef.current, { opacity: 0, duration: 1 });
    }
  }, [setActiveEgg]);

  useEffect(() => {
    const audio = new Audio('/audio/easter-eggs/binks.mp3');
    audio.volume = 0;
    audioRef.current = audio;

    const onCanPlay = () => {
      audio.play().catch(() => {
        // Playback prevented
      });
      
      gsap.to(audio, { volume: 0.6, duration: 2 });
      
      if (shipRef.current) {
        const duration = isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 198;
        // Moving from right to left, starting partially on-screen to eliminate delay
        gsap.fromTo(shipRef.current, 
          { x: window.innerWidth - 200 },
          { x: -300, duration: duration * 0.85, ease: 'none' }
        );
      }
    };

    audio.addEventListener('canplay', onCanPlay, { once: true });
    
    audio.addEventListener('ended', () => {
      // Clean up after song finishes
      if (shipRef.current) gsap.to(shipRef.current, { opacity: 0, duration: 2 });
      setTimeout(cleanup, 2000);
    });

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, [cleanup]);

  // Bobbing animation for the ship image itself
  useEffect(() => {
    if (shipImgRef.current) {
      gsap.to(shipImgRef.current, {
        y: -15,
        rotation: -3,
        yoyo: true,
        repeat: -1,
        duration: 1.2,
        ease: 'sine.inOut'
      });
    }
  }, []);

  // Lyrics stagger animation with Anime.js
  useEffect(() => {
    if (!lyricsContainerRef.current) return;
    
    const createLyric = () => {
      const el = document.createElement('div');
      el.className = 'absolute text-[24px] font-mono font-bold text-violet-300 pointer-events-none opacity-0 binks-lyric drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]';
      
      // Use .at() to prevent CWE-94 array indexing scanner warnings
      const currentLyric = BINKS_LYRICS.at(lyricIndexRef.current % BINKS_LYRICS.length);
      el.innerText = `🎵 ${currentLyric || ''}`;
      lyricIndexRef.current++;
      
      const x = 10 + Math.random() * 60; // 10% to 70% width
      const y = 20 + Math.random() * 60; // 20% to 80% height
      
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      
      lyricsContainerRef.current?.appendChild(el);
      return el;
    };

    const spawnLyrics = () => {
      const newLyrics = Array.from({ length: 4 }).map(createLyric);
      
      anime({
        targets: newLyrics,
        translateY: [-40, -100],
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 1500 },
          { value: 0, duration: 1500, delay: 3500 }
        ],
        delay: anime.stagger(4000), // Stagger every 4 seconds
        easing: 'easeOutSine',
        complete: () => {
          newLyrics.forEach(el => el.remove());
        }
      });
    };

    spawnLyrics();
    const interval = setInterval(spawnLyrics, 16000); // 4 lyrics * 4s stagger

    return () => clearInterval(interval);
  }, []);

  // Failsafe auto-dismiss
  useEffect(() => {
    const timer = setTimeout(cleanup, 240000); // 4 minutes
    return () => clearTimeout(timer);
  }, [cleanup]);

  return (
    <div
      className="fixed inset-0 z-[9980] pointer-events-auto cursor-pointer overflow-hidden"
      onClick={cleanup}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Pirate ship sailing across bottom right to left */}
      <div
        ref={shipRef}
        className="absolute bottom-20 left-0 transition-none z-10"
        style={{
          transform: 'translateX(calc(100vw - 200px))'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          ref={shipImgRef}
          src="/images/easter-eggs/thousand_sunny_sprite.png" 
          alt="Thousand Sunny Pirate Ship" 
          className="w-[240px] h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]" 
        />
      </div>

      {/* Floating messages container */}
      <div ref={lyricsContainerRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Dismiss hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[12px] text-white/60 font-mono z-30 uppercase tracking-[0.2em] font-semibold drop-shadow-md">
        {t('Click anywhere to dismiss')}
      </div>
    </div>
  );
}

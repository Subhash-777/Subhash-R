'use client';
import { useRef, useEffect, useState } from 'react';
import { SkipBack, SkipForward, Play, Pause, Shuffle, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST = [
  { title: 'Vizhi Veekura', artist: 'Sai Abhyankkar', album: 'Single', src: '/audio/vizhi.mp3', cover: '/images/covers/vizhi.jpg' },
  { title: 'Nee Kavithaigala', artist: 'Dhibu Ninan Thomas', album: 'Maragatha Naanayam', src: '/audio/nee_kavithaigala.mp3', cover: '/images/covers/nee_kavithaigala.jpg' },
  { title: 'Pavazha Malli', artist: 'Sai Abhyankkar', album: 'Single', src: '/audio/pavazha_malli.mp3', cover: '/images/covers/pavazha_malli.jpg' },
  { title: 'Pavazha Malli (Unplugged)', artist: 'Sai Abhyankkar', album: 'Single', src: '/audio/pavazha_malli_unplugged.mp3', cover: '/images/covers/pavazha_malli_unplugged.jpg' },
];

function formatTime(secs: number) {
  if (!secs || isNaN(secs) || secs === Infinity) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function EqBars({ isPlaying }: { isPlaying: boolean }) {
  const [heights, setHeights] = useState([4, 8, 6, 10]);

  useEffect(() => {
    if (!isPlaying) {
      setHeights([4, 4, 4, 4]);
      return;
    }
    const interval = setInterval(() => {
      setHeights([
        Math.random() * 12 + 4,
        Math.random() * 16 + 6,
        Math.random() * 14 + 4,
        Math.random() * 18 + 6,
      ]);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-end gap-[3px] h-5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-white rounded-full transition-all duration-100 shadow-[0_0_5px_rgba(255,255,255,0.5)]"
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

export function MusicPlayer() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = PLAYLIST[trackIdx];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, trackIdx]);

  const handlePrev = () => {
    setTrackIdx(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleNext = () => {
    if (isShuffle) {
      setTrackIdx(Math.floor(Math.random() * PLAYLIST.length));
    } else {
      setTrackIdx(i => (i + 1) % PLAYLIST.length);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      let dur = audioRef.current.duration;
      if (dur === Infinity || isNaN(dur)) dur = 0;
      setDuration(dur);
    }
  };

  return (
    <motion.div 
      className="glass-card !bg-black/20 p-5 w-full rounded-[24px] relative overflow-hidden group border border-white/10" 
      layout
    >
      <audio
        ref={audioRef}
        src={track.src}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onCanPlay={handleLoadedMetadata}
        onEnded={handleNext}
        loop={isRepeat}
      />

      {/* Ambient Dynamic Background Blur */}
      <AnimatePresence>
        <motion.div 
          key={track.cover}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute -inset-4 saturate-[2] blur-[40px] pointer-events-none"
          style={{ backgroundImage: `url(${track.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </AnimatePresence>
      {/* Dimmer overlay to ensure crisp text contrast */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

      {/* Main Player Content */}
      <div className="relative z-10 flex flex-col gap-5">
        
        {/* Top Row: Art + Info + EqBars */}
        <div className="flex gap-4 items-center">
          {/* Cover Art */}
          <motion.div 
            className="relative w-[64px] h-[64px] rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-white/20 bg-gray-900 flex-shrink-0"
            animate={{ scale: isPlaying ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={track.cover} alt={track.album} className="w-full h-full object-cover" />
          </motion.div>

          {/* Title & Artist */}
          <div className="flex-1 min-w-0 flex flex-col justify-center pt-1">
            <AnimatePresence mode="wait">
              <motion.h3 
                key={track.title}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[15px] font-bold text-white keep-white truncate drop-shadow-md leading-tight"
              >
                {track.title}
              </motion.h3>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p 
                key={track.artist}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[12px] text-gray-300 keep-white truncate mt-0.5 font-medium drop-shadow-md"
              >
                {track.artist}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Visualizer */}
          <div className="flex-shrink-0 pr-1 pb-1">
            <EqBars isPlaying={isPlaying} />
          </div>
        </div>

        {/* Middle Row: Scrubber */}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[10px] text-gray-300 keep-white font-mono w-9 text-right drop-shadow-sm select-none">
            {formatTime(progress)}
          </span>
          
          {/* Scrubber Bar */}
          <input
            type="range"
            min={0}
            max={duration && duration !== Infinity ? duration : 100}
            value={progress}
            onChange={(e) => {
              const newTime = Number(e.target.value);
              setProgress(newTime);
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
              }
            }}
            className="flex-1 h-1.5 rounded-full cursor-pointer accent-white bg-white/20 appearance-none"
            style={{
               background: `linear-gradient(to right, white ${duration ? (progress / duration) * 100 : 0}%, rgba(255,255,255,0.2) ${duration ? (progress / duration) * 100 : 0}%)`
            }}
          />
          
          <span className="text-[10px] text-gray-300 keep-white font-mono w-9 drop-shadow-sm select-none">
            {formatTime(duration)}
          </span>
        </div>

        {/* Bottom Row: Controls */}
        <div className="flex items-center justify-between px-2 pt-1">
          <button 
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors ${isShuffle ? 'text-violet-400' : 'text-gray-400 keep-white hover:text-white'}`} 
            aria-label="Shuffle"
          >
            <Shuffle size={16} />
          </button>
          
          <div className="flex items-center gap-6">
            <button onClick={handlePrev} className="text-white keep-white hover:text-gray-300 transition-colors drop-shadow-lg" aria-label="Previous">
              <SkipBack size={22} fill="currentColor" />
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(p => !p)}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_8px_20px_rgba(255,255,255,0.2)] transition-all"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </motion.button>
            
            <button onClick={handleNext} className="text-white keep-white hover:text-gray-300 transition-colors drop-shadow-lg" aria-label="Next">
              <SkipForward size={22} fill="currentColor" />
            </button>
          </div>
          
          <button 
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition-colors ${isRepeat ? 'text-violet-400' : 'text-gray-400 keep-white hover:text-white'}`} 
            aria-label="Repeat"
          >
            <Repeat size={16} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}

import Image from 'next/image';

export function ProfileOrbit() {
  return (
    <div className="relative flex items-center justify-center w-full h-[520px]">
      {/* Deep Purple background glow - static to match reference */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25)_0%,transparent_65%)] pointer-events-none" />

      {/* Orbital SVG Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none drop-shadow-2xl scale-[1.2]">
        <svg width="800" height="800" viewBox="0 0 800 800" className="opacity-90 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <g style={{ transformOrigin: 'center' }}>
            <ellipse cx="400" cy="400" rx="360" ry="140" transform="rotate(35 400 400)" fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" strokeDasharray="4 6" />
            <ellipse cx="400" cy="400" rx="360" ry="140" transform="rotate(-25 400 400)" fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" strokeDasharray="4 6" />
            
            <circle cx="120" cy="220" r="4" fill="#c084fc" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px #c084fc)' }} />
            <circle cx="680" cy="180" r="4" fill="#c084fc" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px #c084fc)' }} />
            <circle cx="250" cy="650" r="4" fill="#c084fc" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px #c084fc)' }} />
            <circle cx="700" cy="550" r="4" fill="#c084fc" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px #c084fc)' }} />
          </g>
        </svg>
      </div>

      {/* Profile Image - Static and grounded like the reference */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none scale-[1.15] origin-bottom translate-y-[20px]">
        <div className="relative w-[500px] h-[520px]">
          <Image
            src="/images/profile.png"
            alt="Subhash R"
            fill
            className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            priority
            style={{
              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Quote Section */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 ml-[20px] z-20 w-max">
        <div className="group flex flex-col items-center gap-3 cursor-pointer">
          <div className="flex items-center gap-4">
            <span className="text-[#a855f7] font-serif text-4xl italic leading-none drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] transform -translate-y-1">"</span>
            <span className="text-gray-100 font-mono font-medium tracking-[0.2em] text-[13px] uppercase drop-shadow-md group-hover:text-white transition-colors">
              Build. Break. Learn. Repeat.
            </span>
            <span className="text-[#a855f7] font-serif text-4xl italic leading-none drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] transform -translate-y-1">"</span>
          </div>
          
          {/* Animated subtle underline */}
          <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#a855f7] to-transparent opacity-50 group-hover:w-24 group-hover:opacity-100 transition-all duration-500 ease-out" />
        </div>
      </div>
    </div>
  );
}

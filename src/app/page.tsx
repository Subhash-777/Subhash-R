import { CookieClock } from '@/components/widgets/CookieClock';
import { MusicPlayer } from '@/components/widgets/MusicPlayer';
import { TerminalBio } from '@/components/widgets/TerminalBio';
import { ProfileOrbit } from '@/components/home/ProfileOrbit';
import { WhoamiCard } from '@/components/home/WhoamiCard';
import { SkillsPanel } from '@/components/home/SkillsPanel';

export default function Home() {
  return (
    <div className="flex-1 w-full min-h-full flex flex-col items-center p-4">
      <div className="w-full max-w-[1400px] flex-1 grid grid-cols-1 lg:grid-cols-[340px_1fr_380px] gap-8 py-2 px-4 lg:px-8">
        
        {/* Left Column */}
        <div className="flex flex-col w-full max-w-[340px] mx-auto lg:mx-0 h-full pb-6 pt-4 justify-between">
          <div className="shrink-0 flex justify-center"><CookieClock /></div>
          <div className="shrink-0 flex justify-center mt-10"><TerminalBio /></div>
          <div className="shrink-0 flex justify-center"><MusicPlayer /></div>
        </div>

        {/* Center Column */}
        <div className="flex items-center justify-center relative min-h-0">
          <ProfileOrbit />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 w-full max-w-[380px] mx-auto lg:mx-0 h-full pb-6 pt-4">
          <div className="shrink-0"><WhoamiCard /></div>
          <div className="flex-1 flex flex-col min-h-0"><SkillsPanel /></div>
        </div>

      </div>
    </div>
  );
}

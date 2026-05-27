import { CookieClock } from '@/components/widgets/CookieClock';
import { MusicPlayer } from '@/components/widgets/MusicPlayer';
import { TerminalBio } from '@/components/widgets/TerminalBio';
import { ProfileOrbit } from '@/components/home/ProfileOrbit';
import { WhoamiCard } from '@/components/home/WhoamiCard';
import { SkillsPanel } from '@/components/home/SkillsPanel';

export default function Home() {
  return (
    <div className="w-full min-h-full flex flex-col items-center px-4 py-4">
      <div className="w-full max-w-[1400px] flex-1 lg:grid lg:grid-cols-[340px_1fr_380px] gap-8 lg:py-2 lg:px-8">

        {/* Mobile layout: stacked single column */}
        {/* Left Column — widgets */}
        <div className="flex flex-col w-full max-w-[480px] mx-auto lg:mx-0 lg:max-w-[340px] lg:h-full pb-6 pt-4 lg:justify-between gap-6 lg:gap-0">
          <div className="shrink-0 flex justify-center"><CookieClock /></div>
          <div className="shrink-0 flex justify-center lg:mt-10"><TerminalBio /></div>
          <div className="shrink-0 flex justify-center"><MusicPlayer /></div>
        </div>

        {/* Center Column — profile (hidden on mobile, shown on lg+) */}
        <div className="hidden lg:flex items-center justify-center relative min-h-0">
          <ProfileOrbit />
        </div>

        {/* Right Column — identity + skills */}
        <div className="flex flex-col gap-6 w-full max-w-[480px] mx-auto lg:mx-0 lg:max-w-[380px] lg:h-full pb-24 lg:pb-6 pt-0 lg:pt-4">
          <div className="shrink-0"><WhoamiCard /></div>
          <div className="flex-1 flex flex-col min-h-0"><SkillsPanel /></div>
        </div>

      </div>
    </div>
  );
}

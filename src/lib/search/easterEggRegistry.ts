// src/lib/search/easterEggRegistry.ts
// Metadata for all Easter eggs

import type { EasterEgg } from './types';

export const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'noir',
    name: 'Spider-Noir Mode',
    triggers: ['noir', 'spidernoir', 'spider-noir'],
    description: 'Turns the entire site into a black & white noir universe with rain, grain, and vintage quotes.',
    hintText: 'Try typing the name of a certain monochrome Spider-Man...',
    visibility: 'public',
    achievementId: 'noir-mode',
    achievementName: 'Earth-90214 Visitor',
  },
  {
    id: 'binks',
    name: "Bink's Sake",
    triggers: ['binks', 'binkssake', "bink's sake"],
    description: 'Plays a hidden sea shanty with a pirate ship sailing across the screen.',
    hintText: 'A certain pirate crew once sang a farewell song...',
    visibility: 'public',
    achievementId: 'binks-sake',
    achievementName: "Nakama's Song",
  },
  {
    id: 'return-by-death',
    name: 'Return by Death',
    triggers: ['return-by-death', 'rbd', 'return by death'],
    description: 'Freezes animations, rewinds the boot timeline, and replays the startup sequence.',
    hintText: 'What if you could rewind time itself?',
    visibility: 'public',
    achievementId: 'return-by-death',
    achievementName: 'Witch Cult Survivor',
  },
  {
    id: 'satella',
    name: 'Satella',
    triggers: ['satella', 'i can return by death'],
    description: 'A cinematic dark overlay with shadow hands and a forbidden revelation.',
    hintText: 'She who must not be named watches from the shadows...',
    visibility: 'hinted',
    achievementId: 'satella',
    achievementName: 'Witch of Envy',
  },
  {
    id: 'witch-factor',
    name: 'Witch Factor Combo',
    triggers: [],
    description: 'Triggered by activating Satella followed by Return by Death within 60 seconds.',
    hintText: 'Some abilities are stronger when combined...',
    visibility: 'secret',
    achievementId: 'witch-factor',
    achievementName: 'Authority Bearer',
  },
  {
    id: 'laugh-tale',
    name: 'Laugh Tale',
    triggers: ['laugh tale', 'laughtale'],
    description: 'The final island — confetti rain with tech icon shapes!',
    hintText: 'The final destination of the Grand Line...',
    visibility: 'public',
    achievementId: 'laugh-tale',
    achievementName: 'Pirate King',
  },
  {
    id: 'gear5',
    name: 'Gear 5',
    triggers: ['gear5', 'gear 5', 'gear5th', 'nika'],
    description: 'White flash, bouncy UI, cloud particles, and pure joy.',
    hintText: 'The most ridiculous power in the world...',
    visibility: 'public',
    achievementId: 'gear5',
    achievementName: 'Sun God Nika',
  },
  {
    id: 'sudo-rm',
    name: 'sudo rm -rf /',
    triggers: ['sudo rm -rf /', 'sudo rm -rf'],
    description: 'Fake destructive glitch — panels collapse, then everything restores.',
    hintText: 'The forbidden command...',
    visibility: 'public',
    achievementId: 'sudo-rm',
    achievementName: 'Chaos Agent',
  },
  {
    id: 'vim',
    name: 'Vim Mode',
    triggers: ['vim', 'vi'],
    description: 'Converts the palette into a fake Vim session. Good luck exiting.',
    hintText: 'How do you exit this thing?',
    visibility: 'public',
    achievementId: 'vim-escape',
    achievementName: 'Vim Escapist',
  },
  {
    id: 'konami',
    name: 'Konami Code',
    triggers: [],
    description: 'The classic cheat code — works on the main portfolio.',
    hintText: '↑↑↓↓←→←→BA',
    visibility: 'hinted',
    achievementId: 'konami',
    achievementName: 'Konami Master',
  },
  {
    id: 'ping-subhash',
    name: 'Ping Subhash',
    triggers: ['ping subhash', 'ping'],
    description: 'Fake low-latency ping output showing Subhash is online.',
    hintText: 'Is anybody out there?',
    visibility: 'public',
    achievementId: 'ping',
    achievementName: 'Pong Received',
  },
  {
    id: 'ls-secrets',
    name: 'ls -la secrets/',
    triggers: ['ls -la secrets/', 'ls secrets'],
    description: 'A peek into the secret files directory.',
    hintText: 'Every system has hidden files...',
    visibility: 'public',
    achievementId: 'ls-secrets',
    achievementName: 'Secret Agent',
  },
  {
    id: 'screensaver',
    name: 'Screensaver',
    triggers: [],
    description: 'DVD-style bouncing logo after 60s idle.',
    hintText: 'Sometimes doing nothing is the best action...',
    visibility: 'hinted',
    achievementId: 'screensaver',
    achievementName: 'Idle Champion',
  },
];

export function findEasterEgg(trigger: string): EasterEgg | undefined {
  const lower = trigger.toLowerCase().trim();
  return EASTER_EGGS.find((e) => e.triggers.some((t) => t === lower));
}

export function getVisibleEggs(): EasterEgg[] {
  return EASTER_EGGS.filter((e) => e.visibility !== 'secret');
}

export function getPublicEggs(): EasterEgg[] {
  return EASTER_EGGS.filter((e) => e.visibility === 'public');
}

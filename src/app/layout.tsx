import type { Metadata } from 'next';
import '../styles/globals.css';
import { Taskbar } from '@/components/shell/Taskbar';
import { BottomDock } from '@/components/shell/BottomDock';
import { PageTransition } from '@/components/shell/PageTransition';
import { BootGate } from '@/components/boot/BootGate';

export const metadata: Metadata = {
  title: 'SubhashOSss',
  description: 'Interactive OS-themed portfolio of Subhash R — AI Engineer, DevOps Enthusiast, Researcher, and Linux User based in Chennai, India.',
  keywords: ['AI Engineer', 'DevOps', 'Portfolio', 'Machine Learning', 'Next.js', 'Subhash R'],
  authors: [{ name: 'Subhash R' }],
  openGraph: {
    title: 'SubhashOSss',
    description: 'AI Engineer | DevOps Enthusiast | Linux User',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <BootGate>
          {/* Top Taskbar */}
          <Taskbar />

          {/* Main content area */}
          <main className="fixed inset-0 flex flex-col">
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          {/* Bottom Navigation Dock */}
          <BottomDock />
        </BootGate>
      </body>
    </html>
  );
}

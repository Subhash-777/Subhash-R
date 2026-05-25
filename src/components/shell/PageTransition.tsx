'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTightSpacing = pathname === '/' || pathname === '/contact';

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      className="absolute inset-x-0 flex-1 flex flex-col min-h-0"
      style={{ 
        top: isTightSpacing ? 44 : 70,
        bottom: 72,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}

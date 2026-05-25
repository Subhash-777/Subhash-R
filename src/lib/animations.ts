// src/lib/animations.ts
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, filter: 'blur(2px)', transition: { duration: 0.25, ease: 'easeIn' } },
};

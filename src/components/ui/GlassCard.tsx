'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`glass-card ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

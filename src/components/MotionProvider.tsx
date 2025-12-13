'use client';

/**
 * MotionProvider Component
 * @description Framer Motion lazy loading wrapper
 */
import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

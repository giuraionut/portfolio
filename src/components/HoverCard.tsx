// components/motion/HoverCard.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

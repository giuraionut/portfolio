
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, wordVariants } from '@/lib/animations';
import { cn } from '@/lib/cn';

interface StaggeredTextProps {
  text: string;
  /** Optional CSS classes for the main container div */
  className?: string;
  /**
   * The horizontal space (margin-left) applied to words after the first one.
   * Examples: "0.5rem", "4px", "1em".
   * Defaults to "0.25rem".
   */
  spacing?: string;
}

/**
 * Splits a string into words and animates them with a stagger and spring effect.
 */
export default function StaggeredText({
  text,
  className = '',
  spacing = '0.25rem',
}: StaggeredTextProps) {
  // Split on whitespace, filter out empty strings
  const words = text.trim().split(/\s+/);

  return (
    <motion.div
      className={cn('flex flex-wrap', className)}
      variants={containerVariants({ staggerChildren: 0.08, delayChildrenFactor: 0.04 })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={index > 0 ? { marginLeft: spacing } : undefined}
          variants={wordVariants({ delay: index * 0.04, distance: 24, damping: 12 })}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

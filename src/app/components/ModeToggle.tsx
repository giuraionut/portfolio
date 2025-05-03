'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isLight = theme === 'light';

  const iconVariants = {
    initial: { opacity: 0, rotate: 45, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: -45, scale: 0.5 },
  };

  return (
    <Button
      variant='outline'
      size='icon'
      aria-label='Toggle theme'
      className='relative rounded-full w-10 h-10 overflow-hidden'
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      {/* Pulse effect on click */}
      <motion.span
        key='pulse'
        className='absolute inset-0 bg-current opacity-0 rounded-full'
        initial={false}
        whileTap={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence mode='wait' initial={false}>
        {isLight ? (
          <motion.svg
            key='sun'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='absolute inset-0 w-6 h-6 m-auto'
            variants={iconVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <circle cx='12' cy='12' r='4' />
            <path d='M12 2v2' />
            <path d='M12 20v2' />
            <path d='m4.93 4.93 1.41 1.41' />
            <path d='m17.66 17.66 1.41 1.41' />
            <path d='M2 12h2' />
            <path d='M20 12h2' />
            <path d='m6.34 17.66-1.41 1.41' />
            <path d='m19.07 4.93-1.41 1.41' />
          </motion.svg>
        ) : (
          <motion.svg
            key='moon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='absolute inset-0 w-6 h-6 m-auto'
            variants={iconVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' />
          </motion.svg>
        )}
      </AnimatePresence>
    </Button>
  );
}

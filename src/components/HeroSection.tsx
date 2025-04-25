'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Mail, Download, ChevronDown } from 'lucide-react';
import { fadeIn } from '@/lib/animations';
import GitHubIcon from './icons/GitHubIcon';
import StaggeredText from './StaggeredText';
import LinkedInIcon from './icons/Linkedin';
import Image from 'next/image';
import MotionContainer from './MotionContainer';
import Link from 'next/link';

const HERO_TAGS: string[] = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'UI/UX Enthusiast',
  'TypeScript Advocate',
];
function useLoopedIndex(length: number, delay: number = 3000): number {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, delay);
    return () => clearInterval(timer);
  }, [length, delay]);
  return index;
}

export default function HeroSection() {
  const tagIndex = useLoopedIndex(HERO_TAGS.length, 2500);

  const scrollToProjects = () => {
    document
      .getElementById('projects')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id='hero'
      className='min-h-screen flex flex-col md:flex-row items-center justify-between px-8 pt-24 pb-16 md:py-24 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800'
    >
      <Head>
        <title>Giura Ionut | Web Developer Portfolio</title>
        <meta
          name='description'
          content='Portfolio of Your Name, a fullstack web developer specializing in modern web technologies.'
        />
      </Head>
      <div className='w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0'>
        <MotionContainer animation='popIn'>
          <span className='inline-block'>Hi, my name is</span>
        </MotionContainer>

        <MotionContainer animation='bounce'>
          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-900 dark:text-white'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300'>
              Giura Ionut
            </span>
          </h1>
        </MotionContainer>

        <div className='h-10 mt-2 mb-6'>
          <AnimatePresence mode='wait'>
            <MotionContainer animation='slideUp' index={tagIndex}>
              <h1 className='text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-300'>
                {HERO_TAGS[tagIndex]}
              </h1>
            </MotionContainer>
          </AnimatePresence>
        </div>

        <StaggeredText
          className='max-w-lg text-lg text-gray-600 dark:text-gray-400'
          text={`I create engaging digital experiences with modern web technologies, focusing on clean code and intuitive user interfaces.`}
          spacing='0.25rem'
        />

        <MotionContainer animation='popIn'>
          <div className='mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4'>
            <MotionContainer animation='popIn'>
              <div>
                <Button
                  size='lg'
                  className='group cursor-pointer'
                  onClick={scrollToProjects}
                >
                  View My Work
                  <ChevronDown className='ml-2 h-4 w-4 transition-transform group-hover:translate-y-1' />
                </Button>
              </div>
            </MotionContainer>

            <MotionContainer animation='popIn'>
              <div>
                <Button size='lg' variant='outline' className='group' asChild>
                  <a
                    href='/cv/your-cv.pdf'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Download CV
                    <Download className='ml-2 h-4 w-4 transition-transform group-hover:translate-y-1' />
                  </a>
                </Button>
              </div>
            </MotionContainer>
          </div>
        </MotionContainer>
      </div>

      <MotionContainer animation='popIn'>
        <div className='w-full md:w-auto flex flex-col items-center gap-6'>
          <MotionContainer animation='popIn'>
            <div className='w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative'>
              <Image
                src='/images/avatar.png'
                alt='Your Name'
                fill
                className='w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600 overflow-hidden p-1'
              />
              <div className='w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600 overflow-hidden p-1'>
                <div className='w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-4xl font-bold text-indigo-500 dark:text-indigo-400'>
                  YN
                </div>
              </div>
            </div>
          </MotionContainer>

          <MotionContainer variants={fadeIn()}>
            <div className='flex items-center gap-4'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionContainer
                      transition={{ type: 'spring', stiffness: 300 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 cursor-pointer'
                        href='https://github.com/yourusername'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Visit GitHub profile'
                      >
                        <GitHubIcon size={22} />
                      </Link>
                    </MotionContainer>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionContainer
                      transition={{ type: 'spring', stiffness: 300 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 cursor-pointer'
                        href='https://linkedin.com/yourusername'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Visit Linkedin profile'
                      >
                        <LinkedInIcon size={22} />
                      </Link>
                    </MotionContainer>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionContainer
                      transition={{ type: 'spring', stiffness: 300 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 cursor-pointer'
                        href='mailto:your.email@example.com'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Visit Linkedin profile'
                      >
                        <Mail size={22} />
                      </Link>
                    </MotionContainer>
                  </TooltipTrigger>
                  <TooltipContent>Email Me</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </MotionContainer>
        </div>
      </MotionContainer>
    </section>
  );
}

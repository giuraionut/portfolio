'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import MotionContainer from './MotionContainer';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section
      id='about'
      className='py-20 lg:py-28 px-6 sm:px-8 bg-white dark:bg-gray-900'
    >
      <MotionContainer
        useInView={true}
        once={true}
        viewportAmount={0.3}
        animation='slideUp'
      >
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <Badge
              variant='outline'
              className='mb-3 text-primary dark:text-white'
            >
              About
            </Badge>
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-white'>
              Get to know me
            </h2>
            <Separator className='w-20 h-1 mx-auto bg-primary' />
          </div>

          <div className='grid md:grid-cols-2 gap-10 items-center '>
            <MotionContainer
              useInView={true}
              once={true}
              viewportAmount={0.3}
              customTransition='spring'
              whileHover={{ scale: 1.02 }}
            >
              <div className='relative rounded-lg overflow-hidden shadow-xl aspect-[4/3] border-gray-800 border-4'>
                <Image
                  src='/images/avatar.png'
                  alt='Giura Ionut Placeholder BG'
                  width={100}
                  height={100}
                  className='object-cover blur-xl scale-110 w-full h-full'
                  aria-hidden='true'
                />
                <Image
                  src='/images/avatar.png'
                  alt='Giura Ionut Profile Picture'
                  fill
                  priority
                  sizes='(max-width: 768px) 100vw, 50vw'
                  className='object-contain h-full'
                />
              </div>
            </MotionContainer>

            <div className='space-y-6'>
              <MotionContainer
                useInView={true}
                once={true}
                animation='slideUp'
                delay={0.3}
              >
                <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
                  Frontend Developer based in [Your Location]
                </h3>
              </MotionContainer>

              <MotionContainer
                useInView={true}
                once={true}
                animation='fadeIn'
                delay={0.4}
              >
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  I&apos;m a passionate and results-driven Web Developer with [X]
                  years of experience creating dynamic, responsive, and
                  user-friendly web applications. My expertise lies in modern
                  frontend frameworks and server-side technologies.
                </p>
              </MotionContainer>

              <MotionContainer
                useInView={true}
                once={true}
                animation='fadeIn'
                delay={0.5}
              >
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  I thrive in collaborative environments and enjoy tackling
                  complex challenges to deliver high-quality software solutions.
                  My approach combines technical expertise with a keen eye for
                  design and user experience.
                </p>
              </MotionContainer>

              <MotionContainer
                useInView={true}
                once={true}
                customTransition='bounce'
                animation='fadeIn'
                delay={0.2}
                whileHover={{ x: 1.01, y: -1.01 }}
              >
                <div className='pt-4'>
                  <Button size='lg' asChild>
                    <Link
                      href='/cv/your-cv.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Full Resume
                    </Link>
                  </Button>
                </div>
              </MotionContainer>
            </div>
          </div>
        </div>
      </MotionContainer>
    </section>
  );
}

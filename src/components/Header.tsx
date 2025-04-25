'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
const SCROLL_THRESHOLD = 50;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // run once on mount to pick up initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className='container max-w-6xl mx-auto px-4 flex items-center justify-between'>
        <Link
          href='/'
          className='font-bold text-xl text-gray-900 dark:text-white hover:text-primary transition-colors'
        >
          <span className='text-primary'>Giura Ionut</span>
        </Link>

        <div className='flex items-center gap-1 md:gap-6'>
          <nav className='hidden md:flex items-center gap-6'>
            {['about', 'projects', 'skills', 'contact'].map((id) => (
              <Button
                key={id}
                variant='link'
                onClick={() => scrollToSection(id)}
              >
                {id[0].toUpperCase() + id.slice(1)}
              </Button>
            ))}
          </nav>

          <div className='flex gap-2 items-center'>
            <ModeToggle />
            <Button
              variant='default'
              size='sm'
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

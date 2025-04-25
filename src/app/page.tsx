import React from 'react';

import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import Header from '@/components/Header';
import BackToTop from '@/components/BackToTop';
import ProjectsSection from '@/components/ProjectsSection';

export const metadata = {
  title: 'Portfolio | Giura Ionut',
  description: 'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
  openGraph: {
    title: 'Portfolio | Giura Ionut',
    description: 'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
    url: 'https://giuraionut.dev',
    siteName: 'Giura Ionut Portfolio',
    images: [
      {
        url: 'https://giuraionut.dev/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Giura Ionut Portfolio Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Giura Ionut',
    description: 'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
    images: ['https://giuraionut.dev/assets/og-image.png'],
    creator: '@giuraionut',
  },
};

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <Header />
      <main className='flex-grow'>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

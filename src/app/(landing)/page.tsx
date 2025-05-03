import React from 'react';
import { notFound } from 'next/navigation';
import HeroSection from './hero/HeroSection';
import AboutSection from './about/AboutSection';
import ContactSection from './contact/ContactSection';
import ProjectsSection from './projects/ProjectsSection';
import SkillsSection from './skills/SkillsSection';
import { getPersonalInfo } from '@/actions/dataFetch';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

export const metadata = {
  title: 'Portfolio | Giura Ionut',
  description:
    'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
  openGraph: {
    title: 'Portfolio | Giura Ionut',
    description:
      'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
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
    description:
      'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
    images: ['https://giuraionut.dev/assets/og-image.png'],
    creator: '@giuraionut',
  },
};

export default async function Home() {
  const { profile } = await getPersonalInfo();

  if (!profile) notFound();

  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <Header name={profile.name} />
      <main className='flex-grow'>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer name={profile.name} />
      <BackToTop />
    </div>
  );
}

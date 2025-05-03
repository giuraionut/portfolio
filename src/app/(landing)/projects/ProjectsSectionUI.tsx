'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ContentSection, Project, Skill } from '@prisma/client';
import MotionContainer from '@/app/components/MotionContainer';
import MotionItem from '@/app/components/MotionItem';
import ProjectCard from '@/app/components/ProjectCard';
import MyCarousel from '@/app/components/MyCarousel';
import Link from 'next/link';

export type ProjectWithSkills = Project & { skills: Skill[] };

export type ProjectProps = {
  content: ContentSection;
  projects: ProjectWithSkills[];
};

export default function ProjectsSectionUI({ content, projects }: ProjectProps) {
  const FEATURED_STAGGER_DELAY = 0.15;
  const SECTION_BASE_DELAY = 0.2;

  return (
    <section
      id='projects'
      className='py-20 lg:py-28 px-6 sm:px-8 bg-white dark:bg-gray-900'
    >
      <MotionContainer
        useInView={true}
        once={true}
        viewportAmount={0.1}
        animation='slideUp'
      >
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <Badge
              variant='outline'
              className='mb-3 text-primary dark:text-white'
            >
              {content.title}
            </Badge>
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-white'>
              {content.shortDescription}
            </h2>
            <Separator className='w-20 h-1 mx-auto bg-primary' />
            <p className='mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              {content.bodies[0]}
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8 mb-16'>
            {projects
              .filter((project) => project.featured)
              .map((project, index) => (
                <MotionItem
                  key={project.id}
                  index={index}
                  useInView={true}
                  once={true}
                  viewportAmount={0.2}
                  animation='fadeUp'
                  delay={SECTION_BASE_DELAY + index * FEATURED_STAGGER_DELAY}
                >
                  <ProjectCard project={project} cardStyle='featured' />
                </MotionItem>
              ))}
          </div>

          <MotionContainer
            useInView={true}
            once={true}
            viewportAmount={0.2}
            animation='fadeIn'
            delay={
              SECTION_BASE_DELAY +
              projects.filter((project) => !project.featured).length *
                FEATURED_STAGGER_DELAY +
              0.1
            }
          >
            <div className='max-w-6xl mx-auto'>
              <div className='flex items-center justify-between mb-6 px-2'>
                <h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
                  More Projects
                </h3>
                <Button variant='link' asChild>
                  <Link href='/projects' className='text-primary'>
                    View All Projects
                    <ChevronDown className='ml-1 h-4 w-4 rotate-[-90deg]' />
                  </Link>
                </Button>
              </div>

              {projects.filter((project) => !project.featured).length > 0 ? (
                <MyCarousel
                  data={projects.filter((project) => !project.featured)}
                  renderItem={(project) => (
                    <div className='p-2 h-full'>
                      <ProjectCard project={project} cardStyle='compact' />
                    </div>
                  )}
                  itemsPerView={{
                    mobile: 1,
                    tablet: 2,
                    desktop: 3,
                  }}
                  autoplayDelay={5000}
                />
              ) : (
                <p className='text-center text-gray-500 dark:text-gray-400'>
                  No other projects to display yet.
                </p>
              )}
            </div>
          </MotionContainer>
        </div>
      </MotionContainer>
    </section>
  );
}

// components/projects/ProjectCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard } from './HoverCard';
import SkillBadge from './SkillBadge';
import { ProjectWithSkills } from '../(landing)/projects/ProjectsSectionUI';

interface ProjectCardProps {
  project: ProjectWithSkills;
  cardStyle?: 'default' | 'compact' | 'featured';
}

export default function ProjectCard({
  project,
  cardStyle = 'default',
}: ProjectCardProps) {
  return (
    <HoverCard className='h-full'>
      <Card className='shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'>
        <CardContent className='p-0 flex flex-col flex-grow'>
          <div
            className={`relative ${
              cardStyle === 'featured' ? 'aspect-video' : 'h-48'
            } w-full overflow-hidden ${
              cardStyle === 'compact' ? 'rounded-t-lg' : ''
            }`}
          >
            {project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover transition-transform duration-300 hover:scale-105'
              />
            )}
          </div>
          <div className='p-4 pt-0 flex flex-col flex-grow'>
            <CardHeader className='p-0 mb-2'>
              <CardTitle className='text-xl font-semibold text-gray-800 dark:text-white'>
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardDescription className='text-gray-600 dark:text-gray-400 mb-4 flex-grow'>
              {project.description}
            </CardDescription>
            <div className='flex flex-wrap gap-1 mb-4'>
              {project.skills.map((skill) => {
                return (
                  <SkillBadge
                    key={`${project.id}-${skill.name}`}
                    skill={skill}
                  />
                );
              })}
            </div>
            <div className='mt-auto'>
              {project.liveUrl && (
                <Button variant='default' className='w-full group' asChild>
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`View live project ${project.title}`}
                  >
                    View Project
                    <ExternalLink className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

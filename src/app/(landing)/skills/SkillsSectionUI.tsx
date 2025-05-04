'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Code, Container, Database, Palette, Server } from 'lucide-react';
import { ContentSection, Skill } from '@prisma/client';
import MotionContainer from '@/app/components/MotionContainer';
import SkillBadge from '@/app/components/SkillBadge';

const ICONS: Record<string, React.ReactNode> = {
  FRONTEND: <Code className='h-5 w-5' />,
  BACKEND: <Server className='h-5 w-5' />,
  DATABASE: <Database className='h-5 w-5' />,
  DEVOPS: <Container className='h-5 w-5' />,
  OTHER: <Palette className='h-5 w-5' />,
};

export type SkillsProps = {
  content: ContentSection;
  skills: Skill[];
};

export default function SkillsSectionUI({ content, skills }: SkillsProps) {
  const STAGGER_DELAY = 0.1;
  const skillsRender = () => {
    if (!Array.isArray(skills) || skills.length === 0) {
      return (
        <div className='text-center text-gray-500'>No skills to display</div>
      );
    }

    const categories = [...new Set(skills.map((s) => s.category || 'Other'))];

    return (
      <div className='grid md:grid-cols-3 gap-8'>
        {categories.map((category, catIndex) => {
          const filteredSkills = skills.filter(
            (skill) => (skill.category || 'Other') === category
          );

          return (
            <MotionContainer
              key={category}
              useInView={true}
              once={true}
              viewportAmount={0.3}
              animation='popIn'
              delay={catIndex * STAGGER_DELAY}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className='bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-shadow duration-300 ease-in-out'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-primary/10 rounded-md text-primary'>
                    {ICONS[category] || ICONS['Other']}
                  </div>
                  <h3 className='font-semibold text-lg text-gray-800 dark:text-white'>
                    {category}
                  </h3>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {filteredSkills.map((skill, index) => (
                    <MotionContainer
                      key={skill.id || `${category}-${index}`}
                      animation='fadeIn'
                    >
                      <SkillBadge key={index} skill={skill} />
                    </MotionContainer>
                  ))}
                </div>
              </div>
            </MotionContainer>
          );
        })}
      </div>
    );
  };

  return (
    <section
      id='skills'
      className='py-20 lg:py-28 px-6 sm:px-8 bg-gray-50 dark:bg-gray-800'
    >
      <MotionContainer
        useInView={true}
        once={true}
        viewportAmount={0.2}
        animation='slideUp'
      >
        <div className='max-w-4xl mx-auto'>
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
          </div>
          {skillsRender()}
        </div>
      </MotionContainer>
    </section>
  );
}

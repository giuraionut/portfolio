'use client'; // Essential for hooks and event handlers

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MotionContainer from './MotionContainer'; // Assuming path is correct
import { SKILLS } from '@/constants/skills'; // Assuming path is correct
import { Code, Palette, Server } from 'lucide-react';
import SkillBadge from './SkillBadge'; // Assuming path is correct

const ICONS: Record<string, React.ReactNode> = {
  Frontend: <Code className='h-5 w-5' />,
  Backend: <Server className='h-5 w-5' />,
  Design: <Palette className='h-5 w-5' />,
};

// Ensure SKILLS has a 'type' property matching these categories
const categories = ['Frontend', 'Backend', 'Design'] as const;
type SkillCategory = typeof categories[number]; // Create a type from categories

// Define the expected shape of items in SKILLS array
interface Skill {
  name: string;
  website?: string; // Assuming optional website
  type: SkillCategory; // Ensure type matches one of the categories
}

// --- Assuming SKILLS constant looks like this: ---
// const SKILLS: Skill[] = [
//   { name: 'React', type: 'Frontend', website: '...' },
//   { name: 'Node.js', type: 'Backend', website: '...' },
//   { name: 'Figma', type: 'Design', website: '...' },
//   // ... more skills
// ];
// ---

export default function SkillsSection() {
  const STAGGER_DELAY = 0.1; // Delay in seconds between each card animation

  return (
    <section
      id='skills'
      className='py-20 lg:py-28 px-6 sm:px-8 bg-gray-50 dark:bg-gray-800'
    >
      {/* --- Outer Container --- */}
      {/* Use MotionContainer's props for scroll triggering */}
      <MotionContainer
        useInView={true}       // Enable scroll trigger for the whole section content
        once={true}           // Animate only once
        viewportAmount={0.2}  // Trigger when 20% is visible (adjust as needed)
        animation='slideUp'   // Animate the entire content block sliding up
      >
        <div className='max-w-4xl mx-auto'>
          {/* --- Section Header --- */}
          {/* This header will animate as part of the outer container's slideUp */}
          <div className='text-center mb-16'>
            <Badge
              variant='outline'
              className='mb-3 text-primary dark:text-white'
            >
              Skills
            </Badge>
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-white'>
              My Technical Expertise
            </h2>
            <Separator className='w-20 h-1 mx-auto bg-primary' />
          </div>

          {/* --- Grid Container (No Motion needed here) --- */}
          {/* The grid itself doesn't need animation; its children will animate */}
          <div className='grid md:grid-cols-3 gap-8'>
            {categories.map((category, index) => {
              // Type assertion might be needed if TS can't infer SKILLS structure perfectly
              const filteredSkills = (SKILLS as Skill[]).filter(
                (skill) => skill.type === category
              );

              return (
                // --- Individual Card Container ---
                <MotionContainer
                  key={category}
                  useInView={true}  // Trigger animation when this card scrolls into view
                  once={true}      // Animate only once
                  viewportAmount={0.3} // Trigger when 30% of the card is visible
                  animation='popIn' // Use the popIn animation for the card
                  delay={index * STAGGER_DELAY} // Apply staggered delay based on index
                  // Keep custom transition for the popIn animation if desired
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {/* This div is the direct child that gets the popIn animation */}
                  <div className='bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-shadow duration-300 ease-in-out'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='p-2 bg-primary/10 rounded-md text-primary'>
                        {ICONS[category]}
                      </div>
                      <h3 className='font-semibold text-lg text-gray-800 dark:text-white'>
                        {category}
                      </h3>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {filteredSkills.map((skill) => (
                        <SkillBadge
                          key={skill.name}
                          name={skill.name}
                          website={skill.website}
                        />
                      ))}
                    </div>
                  </div>
                </MotionContainer>
              );
            })}
          </div>
        </div>
      </MotionContainer>
    </section>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, ExternalLink } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import GitHubIcon from './icons/GitHubIcon'; // Assuming path
// import ProjectCard from './ProjectCard'; // Assuming path & implementation
import MotionContainer from './MotionContainer'; // Assuming path
import MotionItem from './MotionItem'; // Assuming path & implementation (accepts useInView etc.)
import MyCarousel from './MyCarousel'; // Assuming path & implementation
import SkillBadge from './SkillBadge'; // Assuming path
import { SKILLS } from '@/constants/skills'; // Assuming path

// --- Placeholder ProjectCard ---
const ProjectCard = ({
  project,
  isLoading,
  cardStyle,
}: {
  project: Project;
  isLoading: boolean;
  cardStyle?: string; // Example prop
}) => (
  <Card className={`m-2 ${cardStyle === 'compact' ? 'p-4' : 'p-6'}`}>
    {isLoading ? (
      <Skeleton className='h-40 w-full' />
    ) : (
      <div className='relative aspect-video w-full overflow-hidden mb-4'>
        <Image src={project.image} alt={project.title} fill objectFit='cover' />
      </div>
    )}
    <CardTitle>{project.title}</CardTitle>
    <CardDescription>{project.description}</CardDescription>
  </Card>
);
// ---

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  tech: string[];
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A modern shopping experience built with Next.js, TypeScript, and Stripe integration.',
    image: '/images/placeholder-project.png', // Make sure this path is correct
    link: '#',
    github: 'https://github.com/yourusername/ecommerce',
    tech: ['Next.js', 'TypeScript', 'MongoDB'],
    featured: true,
  },
  {
    id: 2,
    title: 'Dashboard UI',
    description:
      'Admin dashboard with real-time data visualization using React, TailwindCSS, and D3.js.',
    image: '/images/placeholder-project.png', // Make sure this path is correct
    link: '#',
    github: 'https://github.com/yourusername/dashboard',
    tech: ['React', 'TailwindCSS', 'Redux'],
    featured: true,
  },
  {
    id: 3,
    title: 'Task Management API',
    description:
      'RESTful API service for task management with Node.js, Express, and PostgreSQL.',
    image: '/images/placeholder-project.png', // Make sure this path is correct
    link: '#',
    github: 'https://github.com/yourusername/task-api',
    tech: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'Social Media App',
    description:
      'A full-featured social platform with real-time chat using Socket.io and React.',
    image: '/images/placeholder-project.png', // Make sure this path is correct
    link: '#',
    github: 'https://github.com/yourusername/social-app',
    tech: ['React', 'MongoDB', 'Express'],
  },
  // Add more projects as needed
];

// --- Assume SKILLS constant is defined and typed correctly ---
interface Skill {
  name: string;
  website?: string;
}
// const SKILLS: Skill[] = [ ... ];
// ---

export default function ProjectsSection() {
  const [isLoading, setIsLoading] = useState(true);
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  const FEATURED_STAGGER_DELAY = 0.15; // Stagger delay for featured projects
  const SECTION_BASE_DELAY = 0.2; // Base delay after section starts animating

  // Simulate image loading
  useEffect(() => {
    // Simulate network request or image preloading finish
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Shortened delay for faster testing
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id='projects'
      className='py-20 lg:py-28 px-6 sm:px-8 bg-white dark:bg-gray-900'
    >
      {/* --- Outer Container for the whole section content --- */}
      <MotionContainer
        useInView={true} // Trigger when section scrolls into view
        once={true} // Animate only once
        viewportAmount={0.1} // Trigger when 10% is visible (adjust as needed)
        animation='slideUp' // Slide up the entire section content
        // No delay needed for the base section container
      >
        <div className='max-w-6xl mx-auto'>
          {/* --- Section Header --- */}
          {/* Header animates as part of the outer container's slideUp */}
          <div className='text-center mb-16'>
            <Badge
              variant='outline'
              className='mb-3 text-primary dark:text-white'
            >
              Portfolio
            </Badge>
            <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-white'>
              Featured Projects
            </h2>
            <Separator className='w-20 h-1 mx-auto bg-primary' />
            <p className='mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Check out some of my recent work. I specialize in creating
              responsive, performant applications with clean code and intuitive
              user interfaces.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8 mb-16'>
            {featuredProjects.map((project, index) => (
              <MotionItem
                key={project.id}
                index={index}
                useInView={true}
                once={true}
                viewportAmount={0.2}
                animation='fadeUp'
                delay={SECTION_BASE_DELAY + index * FEATURED_STAGGER_DELAY}
              >
                <Card className='overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-md'>
                  <div className='relative aspect-video w-full overflow-hidden border-b dark:border-gray-700'>
                    {isLoading ? (
                      <Skeleton className='w-full h-full absolute inset-0' />
                    ) : (
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes='(max-width: 768px) 100vw, 50vw'
                        className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-105' // Added group-hover
                      />
                    )}
                  </div>
                  <div className='flex flex-col flex-grow p-6'>
                    {' '}
                    {/* Use flex-grow for content */}
                    <CardHeader className='p-0 mb-4'>
                      <div className='flex justify-between items-start gap-2'>
                        <CardTitle className='text-xl text-gray-900 dark:text-white'>
                          {project.title}
                        </CardTitle>
                        {project.github && (
                          <TooltipProvider delayDuration={200}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  asChild
                                  className='h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                >
                                  <a
                                    href={project.github}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={`View source code for ${project.title}`}
                                  >
                                    <GitHubIcon className='h-5 w-5' />
                                  </a>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View on GitHub</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <CardDescription className='text-gray-600 dark:text-gray-400 pt-1'>
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='p-0 flex-grow mb-4'>
                      {' '}
                      {/* Use flex-grow */}
                      <div className='flex flex-wrap gap-2'>
                        {project.tech.map((techName, i) => {
                          // Find skill data, handle case where skill might not be in SKILLS constant
                          const skillData = (SKILLS as Skill[]).find(
                            (s) => s.name === techName
                          );
                          return (
                            <SkillBadge
                              key={`${project.id}-tech-${i}`} // More specific key
                              name={techName} // Display tech name directly
                              website={skillData?.website} // Use website if found
                            />
                          );
                        })}
                      </div>
                    </CardContent>
                    <CardFooter className='p-0 mt-auto'>
                      {' '}
                      {/* Use mt-auto to push footer down */}
                      <Button
                        variant='default'
                        className='w-full group'
                        asChild
                      >
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`View live project ${project.title}`}
                        >
                          View Project
                          <ExternalLink className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </a>
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </MotionItem>
            ))}
          </div>

          {/* --- Carousel for other projects --- */}
          <MotionContainer
            useInView={true} // Trigger when this section scrolls into view
            once={true} // Animate only once
            viewportAmount={0.2} // Trigger when 20% is visible
            animation='fadeIn' // Fade in the carousel section
            // Delay calculation: Start after featured projects likely started animating
            delay={
              SECTION_BASE_DELAY +
              featuredProjects.length * FEATURED_STAGGER_DELAY +
              0.1
            }
          >
            <div className='max-w-6xl mx-auto'>
              <div className='flex items-center justify-between mb-6 px-2'>
                <h3 className='text-2xl font-semibold text-gray-800 dark:text-white'>
                  More Projects
                </h3>
                <Button variant='link' asChild>
                  <a href='/projects' className='text-primary'>
                    View All Projects
                    <ChevronDown className='ml-1 h-4 w-4 rotate-[-90deg]' />
                  </a>
                </Button>
              </div>

              {/* Ensure MyCarousel handles potential empty otherProjects array */}
              {otherProjects.length > 0 ? (
                <MyCarousel
                  data={otherProjects}
                  renderItem={(project) => (
                    // Ensure ProjectCard is designed to fit well within the carousel item container
                    <div className='p-2 h-full'>
                      {' '}
                      {/* Padding around each card in carousel */}
                      <ProjectCard
                        project={project}
                        isLoading={isLoading}
                        cardStyle='compact' // Example style for carousel cards
                      />
                    </div>
                  )}
                  itemsPerView={{
                    mobile: 1,
                    tablet: 2,
                    desktop: 3, // Adjust based on ProjectCard size/design
                  }}
                  autoplayDelay={5000} // Slightly longer delay
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

import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import GitHubIcon from './icons/GitHubIcon';
import { Mail } from 'lucide-react';
import LinkedInIcon from './icons/Linkedin';

export default function Footer() {
  return (
    <footer className='py-8 px-6 sm:px-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <Link
              href='/'
              className='text-xl font-bold text-gray-900 dark:text-white'
            >
              <span className='text-primary'>Giura Ionut</span>
            </Link>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              Creating exceptional digital experiences
            </p>
          </div>

          <div className='flex space-x-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href='https://github.com/yourusername'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='GitHub'
                    className='text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors'
                  >
                    <GitHubIcon size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href='https://linkedin.com/in/yourusername'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn'
                    className='text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors'
                  >
                    <LinkedInIcon size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href='mailto:your.email@example.com'
                    aria-label='Email'
                    className='text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors'
                  >
                    <Mail size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Email</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400'>
          © {new Date().getFullYear()} Giura Ionut. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

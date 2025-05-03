'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { Terminal, Mail } from 'lucide-react';
import { ContentSection, SocialLink } from '@prisma/client';
import MotionContainer from '@/app/components/MotionContainer';
import GitHubIcon from '@/app/components/icons/GitHubIcon';
import LinkedInIcon from '@/app/components/icons/Linkedin';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must not exceed 500 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactProps = {
  content: ContentSection;
  socialLinks: SocialLink[];
};
export default function ContactSectionUI({
  content,
  socialLinks,
}: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const sendEmail = async (data: ContactFormValues): Promise<boolean> => {
    console.log('Simulating email send:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const success = Math.random() > 0.2;
    if (success) return true;
    else throw new Error('Failed to send message. Please try again later.');
  };

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await sendEmail(data);
      setSubmitStatus({
        type: 'success',
        message: "Your message sent successfully! I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      setSubmitStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SECTION_BASE_DELAY = 0.1;
  const COLUMN_STAGGER = 0.1;
  const ITEM_STAGGER = 0.1;

  return (
    <section
      id='contact'
      className='py-20 lg:py-28 px-6 sm:px-8 bg-gray-50 dark:bg-gray-800'
    >
      <MotionContainer
        useInView={true}
        once={true}
        viewportAmount={0.15}
        animation='slideUp'
      >
        <div className='max-w-5xl mx-auto'>
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

          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <MotionContainer
              useInView={true}
              once={true}
              viewportAmount={0.2}
              animation='fadeIn'
              delay={SECTION_BASE_DELAY}
            >
              <div className='md:col-span-2'>
                <Card className='border-none shadow-md bg-white dark:bg-gray-900 h-full'>
                  <CardContent className='pt-6'>
                    <div className='space-y-6'>
                      {socialLinks &&
                        socialLinks.map((link) => {
                          return (
                            <MotionContainer
                              key={link.id}
                              useInView={true}
                              once={true}
                              viewportAmount={0.5}
                              animation='fadeIn'
                              delay={SECTION_BASE_DELAY + ITEM_STAGGER * 1}
                              customTransition='spring'
                              whileHover={{ x: 5 }}
                            >
                              <div className='flex items-start gap-4 cursor-pointer group'>
                                <div className='mt-1 bg-primary/10 p-2 rounded-md text-primary transition-colors group-hover:bg-primary/20'>
                                  {link.name === 'github' && <GitHubIcon />}
                                  {link.name === 'linkedin' && <LinkedInIcon />}
                                  {link.name === 'email' && <Mail />}
                                </div>
                                <div>
                                  <h3 className='font-medium text-gray-900 dark:text-white'>
                                    {link.name}
                                  </h3>
                                  <p className='text-gray-600 dark:text-gray-400 mt-1'>
                                    <a
                                      href='mailto:your.email@example.com'
                                      className='hover:text-primary transition-colors'
                                    >
                                      {link.url}
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </MotionContainer>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </MotionContainer>

            <MotionContainer
              useInView={true}
              once={true}
              viewportAmount={0.2}
              animation='fadeIn'
              delay={SECTION_BASE_DELAY + COLUMN_STAGGER}
            >
              <div className='md:col-span-3'>
                <Card className='border-none shadow-md bg-white dark:bg-gray-900'>
                  <CardContent className='pt-6'>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                      >
                        <AnimatePresence mode='wait'>
                          {submitStatus && (
                            <MotionContainer
                              animation='popIn'
                              key={submitStatus.type}
                            >
                              <div>
                                <Alert
                                  variant={
                                    submitStatus.type === 'error'
                                      ? 'destructive'
                                      : 'default'
                                  }
                                >
                                  <Terminal className='h-4 w-4' />
                                  <AlertTitle>
                                    {submitStatus.type === 'error'
                                      ? 'Error'
                                      : 'Success'}
                                  </AlertTitle>
                                  <AlertDescription>
                                    {submitStatus.message}
                                  </AlertDescription>
                                </Alert>
                              </div>
                            </MotionContainer>
                          )}
                        </AnimatePresence>

                        <div className='grid sm:grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className='text-gray-700 dark:text-gray-300'>
                                  Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='Your Name'
                                    {...field}
                                    disabled={isSubmitting}
                                    className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className='text-gray-700 dark:text-gray-300'>
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type='email'
                                    placeholder='your.email@example.com'
                                    {...field}
                                    disabled={isSubmitting}
                                    className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name='message'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-gray-700 dark:text-gray-300'>
                                Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder='Tell me about your project or query...'
                                  rows={5}
                                  {...field}
                                  disabled={isSubmitting}
                                  className='bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 resize-none'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <MotionContainer
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          customTransition='spring'
                        >
                          <div>
                            <Button
                              type='submit'
                              className='w-full cursor-pointer'
                              disabled={isSubmitting}
                              size='lg'
                            >
                              {isSubmitting ? (
                                <>
                                  <span className='mr-2'>
                                    <svg
                                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                    >
                                      <circle
                                        className='opacity-25'
                                        cx='12'
                                        cy='12'
                                        r='10'
                                        stroke='currentColor'
                                        strokeWidth='4'
                                      ></circle>
                                      <path
                                        className='opacity-75'
                                        fill='currentColor'
                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                      ></path>
                                    </svg>
                                  </span>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Send Message
                                  <Mail className='ml-2 h-4 w-4' />
                                </>
                              )}
                            </Button>
                          </div>
                        </MotionContainer>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </MotionContainer>
          </div>
        </div>
      </MotionContainer>
    </section>
  );
}

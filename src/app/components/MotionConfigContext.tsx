'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Transition } from 'framer-motion';
import { MotionOptions } from '@/lib/animations';

interface MotionConfigContextType {
  /** Default animation to use */
  defaultAnimation: string;
  /** Default delay for animations */
  defaultDelay: number;
  /** Default transition */
  defaultTransition: Transition;
  /** Default animation options */
  defaultAnimationOptions: MotionOptions;
  /** Default viewport options */
  defaultViewport: {
    amount: number;
    once: boolean;
  };
  /** Whether to enable all animations */
  animationsEnabled: boolean;
}

// Default context values
const defaultMotionConfig: MotionConfigContextType = {
  defaultAnimation: 'slideUp',
  defaultDelay: 0,
  defaultTransition: {},
  defaultAnimationOptions: {
    duration: 0.7,
    distance: 32,
    ease: [0.25, 0.1, 0.25, 1],
  },
  defaultViewport: {
    amount: 0.3,
    once: true,
  },
  animationsEnabled: true,
};

// Create context
const MotionConfigContext = createContext<MotionConfigContextType>(defaultMotionConfig);

// Provider component
interface MotionConfigProviderProps {
  children: ReactNode;
  config?: Partial<MotionConfigContextType>;
}

export function MotionConfigProvider({ 
  children, 
  config = {} 
}: MotionConfigProviderProps) {
  const mergedConfig = { ...defaultMotionConfig, ...config };
  
  return (
    <MotionConfigContext.Provider value={mergedConfig}>
      {children}
    </MotionConfigContext.Provider>
  );
}

// Hook for using the context
export function useMotionConfig() {
  const context = useContext(MotionConfigContext);
  if (context === undefined) {
    throw new Error('useMotionConfig must be used within a MotionConfigProvider');
  }
  return context;
}

// Utility hook for combining component props with context defaults
export function useMotionProps<T extends Record<string, unknown>>(props: T) {
  const config = useMotionConfig();
  
  return {
    animation: props.animation || config.defaultAnimation,
    delay: props.delay !== undefined ? props.delay : config.defaultDelay,
    transition: props.transition || config.defaultTransition,
    viewport: props.viewport || config.defaultViewport,
    // If animations are disabled globally, override props
    animate: config.animationsEnabled ? (props.animate || 'visible') : 'visible',
    initial: config.animationsEnabled ? (props.initial || 'hidden') : false,
  };
}
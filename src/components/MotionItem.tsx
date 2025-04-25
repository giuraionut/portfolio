// components/motion/MotionItem.tsx
'use client';

// Import necessary types from framer-motion
import {
  motion,
  MotionProps,
  Variants,
  TargetAndTransition,
} from 'framer-motion';
import { ReactNode } from 'react';

// Assuming your animation functions are correctly typed to return AnimationVariants
import { fadeUp, scale, MotionOptions } from '@/lib/animations';

// Define the expected structure using Framer Motion's types
type AnimationVariants = {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
  exit?: TargetAndTransition; // exit is optional
};

// Update MotionOptions type if it's not already defined in animations module
// Make sure this aligns with the types used in your actual animation functions
declare module '@/lib/animations' {
  export interface MotionOptions {
    delay?: number;
    duration?: number;
    distance?: number; // Ensure consistency here
    startScale?: number;
    // Add other options used by fadeUp, scale, etc.
  }
}

// Use Omit to prevent collision with Framer Motion's internal props we handle
type HandledMotionProps =
  | 'initial'
  | 'animate'
  | 'whileInView'
  | 'exit'
  | 'variants'
  | 'viewport';
interface MotionItemProps extends Omit<MotionProps, HandledMotionProps> {
  children: ReactNode;
  className?: string;
  /** Stagger index */
  index?: number;
  /** Base delay before index calculation */
  delay?: number;
  /** Specific animation to use */
  animation?: 'fadeUp' | 'scale';
  /** Animation duration */
  duration?: number;
  /** Distance for fadeUp (can be px number or string like '50%') */
  distance?: number; // <-- CORRECTED TYPE
  /** Start scale for scale animation */
  startScale?: number;
  /** Trigger animation on scroll into view? Defaults to true */
  useInView?: boolean;
  /** Portion visible to trigger scroll animation (0–1). Defaults to 0.2 */
  viewportAmount?: number;
  /** Only animate once when in view? Defaults to true */
  once?: boolean;
  /** Optional explicit transition override */
  transition?: MotionProps['transition'];
}

export default function MotionItem({
  children,
  className,
  index = 0,
  delay = 0.2, // Base delay
  animation = 'fadeUp',
  duration = 0.5,
  distance = 24, // Default can still be number
  startScale = 0.9,
  useInView = true,
  viewportAmount = 0.2,
  once = true,
  transition,
  ...rest
}: MotionItemProps) {
  const indexedDelay = delay + index * 0.1; // Stagger factor

  // Configure animation options
  // Ensure MotionOptions in animations.ts also uses number | string for distance
  const animationOptions: MotionOptions = {
    delay: indexedDelay,
    duration,
    distance,
    startScale,
  };

  // Define available animation variants using the functions
  // Assuming fadeUp and scale now correctly return AnimationVariants type
  const variantsMap: Record<typeof animation, AnimationVariants> = {
    fadeUp: fadeUp(animationOptions),
    scale: scale(animationOptions),
  };

  // currentVariants now correctly has the refined AnimationVariants type
  const currentVariants = variantsMap[animation];

  // --- Calculate animation control props conditionally ---
  const animationProps: MotionProps = {};

  if (useInView) {
    animationProps.initial = 'hidden';
    animationProps.whileInView = 'visible';
    animationProps.viewport = { once: once, amount: viewportAmount };
  } else {
    animationProps.initial = 'hidden';
    animationProps.animate = 'visible';
  }

  if (currentVariants.exit) {
    animationProps.exit = 'exit';
  }
  // --- End calculation ---

  return (
    <motion.div
      className={className}
      // currentVariants is now assignable to Framer Motion's Variants type
      variants={currentVariants satisfies Variants} // Optional: use 'satisfies' for extra check
      transition={transition}
      {...animationProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

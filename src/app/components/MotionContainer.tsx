'use client';
import React from 'react';
import { motion, MotionProps, Transition } from 'framer-motion';
import * as animations from '@/lib/animations';
import { useMotionConfig } from './MotionConfigContext';

/** Supported animation variants */
type Animation =
  | 'slideUp'
  | 'fadeIn'
  | 'popIn'
  | 'stagger'
  | 'spring'
  | 'fadeLeft'
  | 'fadeRight'
  | 'fadeDown'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'pulse'
  | 'rotate'
  | 'flip'
  | 'bounce';

/** Supported custom transition presets */
type CustomTransition = 'spring' | 'default' | 'bounce' | 'gentle';

/** Props for MotionContainer */
interface MotionContainerProps extends MotionProps {
  /** Which animation variant to use */
  animation?: Animation;
  /** Delay before the animation starts */
  delay?: number;
  /** Key for AnimatePresence transitions */
  index?: string | number;
  /** Trigger on scroll into view? */
  useInView?: boolean;
  /** Portion visible to trigger scroll animation (0–1) */
  viewportAmount?: number;
  /** Only animate once when in view */
  once?: boolean;
  /** Name of a custom transition preset */
  customTransition?: CustomTransition;
  /** Animation options to pass to the animation variant */
  animationOptions?: animations.MotionOptions;
  /** Exactly one child element required */
  children: React.ReactElement;
}

/**
 * A wrapper that applies motion variants and optional scroll or presence behaviors,
 * plus an overrideable transition preset.
 */
export default function MotionContainer({
  animation,
  delay,
  index,
  useInView = false,
  viewportAmount,
  once,
  customTransition,
  animationOptions = {},
  children,
  transition: userTransition,
  ...rest
}: MotionContainerProps) {
  // Get defaults from context
  const config = useMotionConfig();

  // Determine final settings
  const finalAnimation = animation || (config.defaultAnimation as Animation);
  const finalDelay = delay !== undefined ? delay : config.defaultDelay;
  const finalViewportAmount = viewportAmount || config.defaultViewport.amount;
  const finalOnce = once !== undefined ? once : config.defaultViewport.once;
  const finalCustomTransition = customTransition || 'default';

  // Validate animation existence
  if (!animations[finalAnimation]) {
    console.error(`Animation "${finalAnimation}" not found in animations library.`);
    return <>{children}</>;
  }

  // Merge options and create variants
  const mergedAnimationOptions = {
    ...config.defaultAnimationOptions,
    ...animationOptions,
    delay: finalDelay,
  };
  const variants = animations[finalAnimation](mergedAnimationOptions);

  // Define transition presets
  const transitionPresets: Record<CustomTransition, Transition> = {
    default: userTransition ?? config.defaultTransition,
    spring: { type: 'spring', stiffness: 400, damping: 10 },
    bounce: { type: 'spring', stiffness: 300, damping: 10 },
    gentle: { type: 'spring', stiffness: 100, damping: 20 },
  };

  // Define animation props based on scroll or animate trigger
  const animationProps = config.animationsEnabled
    ? {
        initial: 'hidden',
        ...(useInView
          ? { whileInView: 'visible', viewport: { once: finalOnce, amount: finalViewportAmount } }
          : { animate: 'visible' }),
        exit: 'exit',
      }
    : { initial: false };

  // Render a motion.div wrapper that simply nests the original child
  return (
    <motion.div
      key={index}
      variants={variants}
      {...animationProps}
      transition={transitionPresets[finalCustomTransition]}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

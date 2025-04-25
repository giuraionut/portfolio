'use client';
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { ReactElement, isValidElement } from 'react';
import { motion, MotionProps, Transition } from 'framer-motion';
import * as animations from '@/lib/animations';
import { useMotionConfig } from './MotionConfigContext';

/** Supported animation variants */
type Animation = 'slideUp' | 'fadeIn' | 'popIn' | 'stagger' | 'spring' | 'fadeLeft' | 
  'fadeRight' | 'fadeDown' | 'slideDown' | 'slideLeft' | 'slideRight' | 'pulse' | 
  'rotate' | 'flip' | 'bounce';

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
  children: ReactElement<any, string | React.JSXElementConstructor<any>>;
}

/**
 * Determines the appropriate motion tag based on child element
 */
const getMotionTag = (children: ReactElement) => {
  const childType = children.type;
  const tagName = typeof childType === 'string' ? childType : undefined;
  return tagName && (motion as any)[tagName] ? (motion as any)[tagName] : motion.div;
};

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
  
  // Merge defaults with props
  const finalAnimation = animation || config.defaultAnimation as Animation;
  const finalDelay = delay !== undefined ? delay : config.defaultDelay;
  const finalViewportAmount = viewportAmount || config.defaultViewport.amount;
  const finalOnce = once !== undefined ? once : config.defaultViewport.once;
  const finalCustomTransition = customTransition || 'default';
  
  // Ensure a valid React element was passed
  if (!isValidElement(children)) {
    console.error('MotionContainer requires exactly one React element child.');
    return <>{children}</>;
  }

  // Check if the animation function exists
  if (!animations[finalAnimation]) {
    console.error(`Animation "${finalAnimation}" not found in animations library.`);
    return <>{children}</>;
  }

  // Get the animation with options
  const mergedAnimationOptions = {
    ...config.defaultAnimationOptions,
    ...animationOptions,
    delay: finalDelay
  };
  
  // Create animation variants with merged options
  const variants = animations[finalAnimation](mergedAnimationOptions);

  // Define transition presets
  const transitionPresets: Record<CustomTransition, Transition> = {
    default: userTransition ?? config.defaultTransition,
    spring: { type: 'spring', stiffness: 400, damping: 10 },
    bounce: { type: 'spring', stiffness: 300, damping: 10 },
    gentle: { type: 'spring', stiffness: 100, damping: 20 },
  };

  // Determine tag name for motion component
  const MotionTag = getMotionTag(children);

  // Destructure original child props
  const { children: nestedChildren, ...childProps } = (children.props as any);

  // Calculate view and animation props
  const animationProps = config.animationsEnabled 
    ? {
        initial: 'hidden',
        ...(useInView
          ? { whileInView: 'visible', viewport: { once: finalOnce, amount: finalViewportAmount } }
          : { animate: 'visible' }),
        exit: 'exit',
      }
    : { initial: false };

  return (
    <MotionTag
      key={index}
      variants={variants}
      {...animationProps}
      transition={transitionPresets[finalCustomTransition]}
      {...childProps}
      {...rest}
    >
      {nestedChildren}
    </MotionTag>
  );
}
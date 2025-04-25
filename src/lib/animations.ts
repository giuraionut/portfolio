// lib/animations.ts
// Enhanced factory-style Framer Motion variants

export interface MotionOptions {
  /** Delay before animation starts, in seconds */
  delay?: number;
  /** Duration of the animation, in seconds */
  duration?: number;
  /** Vertical offset for slide/offset animations, in pixels */
  distance?: number;
  /** Horizontal offset for slide/offset animations, in pixels */
  horizontalDistance?: number;
  /** Starting scale for scale/pop-in animations */
  startScale?: number;
  /** Ending scale for scale/pop-in animations */
  endScale?: number;
  /** Easing curve */
  ease?: number[];
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Stagger between children */
  staggerChildren?: number;
  /** Delay factor for child staggering in containerVariants */
  delayChildrenFactor?: number;
  /** Rotation in degrees */
  rotate?: number;
  /** Delay before any children start animating */
  delayChildren?: number;
}

// A smooth, consistent easing used across all variants
const defaultEase = [0.25, 0.1, 0.25, 1];

/** Fade in from opacity 0 → 1 */
export const fadeIn = ({
  delay = 0,
  duration = 0.6,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, transition: { duration: 0.3, ease } },
});

/** Fade from left to right */
export const fadeLeft = ({
  delay = 0.1,
  duration = 0.6,
  horizontalDistance = 24,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, x: -horizontalDistance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, x: -horizontalDistance, transition: { duration: 0.3, ease } },
});

/** Fade from right to left */
export const fadeRight = ({
  delay = 0.1,
  duration = 0.6,
  horizontalDistance = 24,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, x: horizontalDistance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, x: horizontalDistance, transition: { duration: 0.3, ease } },
});

/** Fade up (from below) */
export const fadeUp = ({
  delay = 0.1,
  duration = 0.6,
  distance = 24,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, y: distance, transition: { duration: 0.3, ease } },
});

/** Fade down (from above) */
export const fadeDown = ({
  delay = 0.1,
  duration = 0.6,
  distance = 24,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, y: -distance, transition: { duration: 0.3, ease } },
});

/** Scale from smaller → full size */
export const scale = ({
  delay = 0.1,
  duration = 0.6,
  startScale = 0.9,
  endScale = 1,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, scale: startScale },
  visible: {
    opacity: 1,
    scale: endScale,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, scale: startScale, transition: { duration: 0.3, ease } },
});

/** Slide up motion */
export const slideUp = ({
  delay = 0,
  duration = 0.7,
  distance = 32,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, y: distance, transition: { duration: 0.3, ease } },
});

/** Slide down motion */
export const slideDown = ({
  delay = 0,
  duration = 0.7,
  distance = 32,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, y: -distance, transition: { duration: 0.3, ease } },
});

/** Slide left motion */
export const slideLeft = ({
  delay = 0,
  duration = 0.7,
  horizontalDistance = 32,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, x: -horizontalDistance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, x: -horizontalDistance, transition: { duration: 0.3, ease } },
});

/** Slide right motion */
export const slideRight = ({
  delay = 0,
  duration = 0.7,
  horizontalDistance = 32,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, x: horizontalDistance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, x: horizontalDistance, transition: { duration: 0.3, ease } },
});

/** Container that staggers children */
export const stagger = ({
  delay = 0,
  staggerChildren = 0.08,
  delayChildren = 0,
}: MotionOptions = {}) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren: delayChildren || delay },
  },
});

/** Pop in with spring physics */
export const popIn = ({
  delay = 0.1,
  startScale = 0.8,
  endScale = 1,
  stiffness = 350,
  damping = 20,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, scale: startScale },
  visible: {
    opacity: 1,
    scale: endScale,
    transition: { type: 'spring', delay, stiffness, damping },
  },
  exit: { opacity: 0, scale: startScale, transition: { duration: 0.3 } },
});

/** Spring animation */
export const spring = ({
  delay = 0,
  startScale = 0.8,
  endScale = 1,
  stiffness = 400,
  damping = 10,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, scale: startScale },
  visible: {
    opacity: 1,
    scale: endScale,
    transition: { type: 'spring', delay, stiffness, damping },
  },
  exit: { opacity: 0, scale: startScale, transition: { type: 'spring', stiffness, damping } },
});

/** Pulse attention animation */
export const pulse = ({
  delay = 0,
  duration = 0.5,
  startScale = 0.95,
  endScale = 1.05,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { scale: 1 },
  visible: {
    scale: [1, endScale, startScale, endScale, 1],
    transition: {
      delay,
      duration,
      ease,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
});

/** Rotate animation */
export const rotate = ({
  delay = 0,
  duration = 0.7,
  rotate = 180,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, rotate: -rotate },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, rotate: rotate, transition: { duration: 0.3, ease } },
});

/** Variants for splitting text into words/letters */
export const wordVariants = ({
  delay = 0,
  distance = 24,
  damping = 12,
}: MotionOptions = {}) => ({
  hidden: {
    opacity: 0,
    y: distance,
    transition: { type: 'spring', damping, delay },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping, delay },
  },
});

/** Container for text/children with delayFactor-based staggering */
export const containerVariants = ({
  staggerChildren = 0.08,
  delayChildrenFactor = 0.05,
}: MotionOptions = {}) => ({
  hidden: { opacity: 1 },
  visible: (i: number = 1) => ({
    opacity: 1,
    transition: { staggerChildren, delayChildren: i * delayChildrenFactor },
  }),
});

/** Flip animation */
export const flip = ({
  delay = 0,
  duration = 0.8,
  ease = defaultEase,
}: MotionOptions = {}) => ({
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { delay, duration, ease },
  },
  exit: { opacity: 0, rotateY: 90, transition: { duration: 0.3, ease } },
});

/** Bounce animation */
export const bounce = ({
  delay = 0,
  stiffness = 300,
  damping = 10,
}: MotionOptions = {}) => ({
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      y: { 
        type: 'spring', 
        stiffness, 
        damping,
        // Add these to create bouncy effect
        bounce: 0.5,  
        velocity: 550
      },
      opacity: { duration: 0.2 }
    },
  },
});
'use client';

import React from 'react';
import { MotionConfig, motion, type Variants } from 'motion/react';

// The entrance shared by the home hero, every inner-page banner and the home
// FAQs: content settles in line by line while a banner's backdrop eases into
// place.
//
// Client-only wrappers so the pages and PageHero can stay server components and
// keep fetching from Payload; they pass their markup through as children.

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const group: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Staggers its `RevealItem` descendants in — on mount, or with `inView` the
 * first time a fifth of the group scrolls into view, for content that may
 * start below the fold. `reducedMotion="user"` drops the movement for visitors
 * who ask for less motion, leaving only the fade.
 */
export const RevealGroup = ({
  children,
  className,
  inView = false,
}: WrapperProps & { inView?: boolean }) => (
  <MotionConfig reducedMotion="user">
    <motion.div
      className={className}
      variants={group}
      initial="hidden"
      {...(inView
        ? { whileInView: 'visible', viewport: { once: true, amount: 0.2 } }
        : { animate: 'visible' })}
    >
      {children}
    </motion.div>
  </MotionConfig>
);

/** One step of the entrance — a heading, a paragraph, a row of buttons, a question. */
export const RevealItem = ({ children, className }: WrapperProps) => (
  <motion.div className={className} variants={item}>
    {children}
  </motion.div>
);

/**
 * The visual half of a hero (a photo backdrop, the video): fades in while
 * settling from a slight zoom, slower than the copy so the text leads. A
 * full-bleed backdrop clipped by its section zooms out from 1.06; a framed
 * element like the video grows from just under size so it never overflows.
 */
export const HeroMedia = ({
  children,
  className,
  delay = 0,
  fromScale = 1.06,
}: WrapperProps & { delay?: number; fromScale?: number }) => (
  <MotionConfig reducedMotion="user">
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: fromScale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  </MotionConfig>
);

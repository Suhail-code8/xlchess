import type { Variants, Transition } from 'framer-motion';

export const REVEAL_TRANSITION: Transition = {
  duration: 0.8,
  ease: 'easeOut',
};

export const REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: REVEAL_TRANSITION },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

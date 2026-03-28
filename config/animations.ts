const DURATIONS = {
  VeryFast: 0.3,
  Fast: 0.6,
  Normal: 0.8,
  Slow: 1.2,
  VerySlow: 1.8,
};
const easing = [0.6, -0.05, 0.01, 0.99];

const SPRING_PHYSICS = {
  type: "spring" as const,
  stiffness: 112,
  damping: 22,
  mass: 1,
};

const RISE_DISTANCE = 20;

const fadeInUp = {
  initial: {
    y: RISE_DISTANCE,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const fadeInUpSlower = {
  initial: {
    y: RISE_DISTANCE,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const riseIn = {
  initial: {
    y: RISE_DISTANCE,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const letterSpace = {
  initial: {
    y: RISE_DISTANCE,
    opacity: 0,
    letterSpacing: "-0.05em",
  },
  animate: {
    y: 0,
    letterSpacing: "0.02em",
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const simpleOpacity = {
  initial: {
    y: RISE_DISTANCE,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const scaleUp = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    opacity: [0, 1],
    scale: [1, 1.05, 1],
    transition: {
      ...SPRING_PHYSICS,
    },
  },
  lightMode: {
    opacity: [0, 1],
    scale: [0.99, 1.05, 1],
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const menuAnim = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
  hide: {
    opacity: 0,
    y: -20,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
};

const avatarAnimation = {
  initial: {
    opacity: 0,
    y: RISE_DISTANCE,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...SPRING_PHYSICS,
    },
  },
  exit: {
    opacity: 0,
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const galleryStagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export {
  DURATIONS,
  easing,
  fadeInUp,
  fadeInUpSlower,
  riseIn,
  letterSpace,
  stagger,
  galleryStagger,
  simpleOpacity,
  menuAnim,
  scaleUp,
  avatarAnimation,
  SPRING_PHYSICS,
  RISE_DISTANCE,
};

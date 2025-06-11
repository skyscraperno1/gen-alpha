export const offset = 16;

export const containerVariants = {
  hover: {
    transition: {
      staggerChildren: 0.015,
    },
  },
};
export const characterVariants = {
  initial: { x: 0 },
  hover: {
    x: -offset,
    transition: {
      type: "spring",
    },
  },
};

export const dotVariants = {
  initial: { x: 0, scale: 1, opacity: 1 },
  hover: {
    x: -offset,
    scale: 0,
    opacity: 0,
    transition: {
      x: {
        duration: 0.2,
        ease: "easeInOut",
      },
      scale: {
        duration: 0.25,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  },
};

export const plusVariants = {
  initial: { x: offset, scale: 0, opacity: 0 },
  hover: {
    x: -offset,
    scale: 1,
    opacity: 1,
    transition: {
      x: {
        duration: 0.2,
        ease: "easeInOut",
      },
      scale: {
        duration: 0.25,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  },
};

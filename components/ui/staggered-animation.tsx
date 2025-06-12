"use client";
import React from "react";
import { motion, Variants } from "motion/react";

interface StaggeredAnimationProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  variants?: {
    card?: Variants;
    content?: Variants;
  };
}

// Default card animation variants
export const defaultCardVariants: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
    scale: 0.9,
    rotateX: 15,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      damping: 20,
      stiffness: 100,
      opacity: { duration: 0.4 },
    },
  },
};

// Default content animation variants
export const defaultContentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Image animation variants
export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

// Sequential staggered variants (for RWA section)
export const sequentialCardVariants: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
    scale: 0.95,
  },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.15,
      duration: 0.4,
      type: "spring",
      damping: 25,
      stiffness: 150,
      opacity: { duration: 0.3 },
    },
  }),
};

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className = "",
  variants = { card: defaultCardVariants },
}) => {
  const cardVariants = variants.card || defaultCardVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Sequential StaggeredAnimation component
export const SequentialAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  index = 0,
  className = "",
  variants = { card: sequentialCardVariants },
}) => {
  const cardVariants = variants.card || sequentialCardVariants;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hook for content animation
export const useStaggeredContent = (index: number, variants?: Variants) => {
  const contentVariants = variants || defaultContentVariants;

  return {
    variants: contentVariants,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true },
  };
};

// Hook for image animation
export const useStaggeredImage = (index: number, variants?: Variants) => {
  const imgVariants = variants || imageVariants;

  return {
    variants: imgVariants,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true },
  };
};

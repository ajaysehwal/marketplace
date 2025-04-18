"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Reusable motion components
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    transition={{ delay, duration }}
  >
    {children}
  </motion.div>
);

export const SlideIn = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={slideIn}
    transition={{ delay, duration }}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={slideUp}
    transition={{ delay, duration }}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={scaleIn}
    transition={{ delay, duration }}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    transition={{ delay, duration }}
  >
    {children}
  </motion.div>
);

// Card hover effect
export const CardHover = ({ children }: { children: ReactNode }) => (
  <motion.div
    whileHover={{
      scale: 1.02,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

// Button hover effect
export const ButtonHover = ({ children }: { children: ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </motion.div>
);

// Page transition
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

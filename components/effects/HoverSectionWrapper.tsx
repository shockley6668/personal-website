import React from 'react';
import { motion } from 'framer-motion';

interface HoverSectionWrapperProps {
  children: React.ReactNode;
}

const HoverSectionWrapper: React.FC<HoverSectionWrapperProps> = ({ children }) => {
  return (
    <motion.div
      // This outer div scales and shows shadow.
      whileHover={{
        scale: 1.025, // Slightly more noticeable scale
        boxShadow: "0 0 30px 8px rgba(52, 152, 219, 0.35)", // Enhanced blue glow
        zIndex: 10, // Bring to front to avoid being overlapped by subsequent sections
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.7 }} // Softer spring
    >
      <motion.div
        className="h-full w-full rounded-lg" // Apply rounded-lg here to match the section.
                                            // This assumes child sections will also add/have rounded-lg.
        style={{
          border: "2px solid transparent", // Occupy space for border to prevent layout shift
        }}
        whileHover={{
          borderColor: "rgba(52, 152, 219, 0.8)", // Visible, brighter border on hover
        }}
        transition={{ duration: 0.25, ease: "circOut" }} // Faster, smooth border transition
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default HoverSectionWrapper;

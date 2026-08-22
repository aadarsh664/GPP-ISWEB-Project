import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const getVariants = () => {
    switch (direction) {
      case 'up': return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
      case 'down': return { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } };
      case 'left': return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
      case 'right': return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
      case 'none': return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      default: return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;

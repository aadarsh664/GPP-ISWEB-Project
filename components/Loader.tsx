import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [startOutro, setStartOutro] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");
    if (hasVisited) {
      setIsHidden(true);
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setStartOutro(true);
    }, 1500); // After progress bar

    return () => clearTimeout(timer);
  }, [onComplete]);

  const finishLoading = () => {
    setIsHidden(true);
    sessionStorage.setItem("visited", "true");
    if (onComplete) onComplete();
  };

  if (isHidden) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex h-screen w-screen pointer-events-none">
      {/* Background Strips Layer */}
      <div className="absolute inset-0 flex w-full h-full z-0">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <motion.div 
          key={i} 
          className="flex-1 bg-white h-full relative"
          initial={{ y: 0 }}
          animate={startOutro ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.8 + index * 0.1 }}
          onAnimationComplete={() => {
             if (index === 4) finishLoading();
          }}
        />
      ))}
      </div>

      {/* Content Layer (Logo & Progress) */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        initial={{ y: 0, opacity: 1 }}
        animate={startOutro ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <div className="w-48 md:w-64 mb-8">
           <BrandLogo className="w-full h-auto" />
        </div>
        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-slate-100 rounded-[30px] overflow-hidden">
           <motion.div 
             className="h-full bg-black" 
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
           />
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;

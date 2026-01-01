import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import Loader from './Loader';

const TypingText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block whitespace-nowrap ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 1.5 second delay before playing
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Video play failed", e));
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <Loader />
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero/Final Video.mp4" type="video/mp4" />
        </motion.video>
        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-5xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-6 text-white tracking-tighter">
            <span className="block pb-2">
              <TypingText text="Your One-Stop" delay={0.2} /> <br />
              <TypingText text="Printing Solution" className="text-white" delay={0.6} />
            </span>
          </h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-xl text-white/90 mb-0 max-w-2xl mx-auto leading-relaxed font-bold"
          >
            Partner with Patna’s most reliable press for seamless corporate printing and logistics.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

import RadialRevealButton from './RadialRevealButton';
import FocusReveal from './FocusReveal';
import RevealOnScroll from './RevealOnScroll';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleEntrance = () => setIsLoaded(true);
    
    // Check if the global loader has already finished (e.g. returning to home page from another route)
    const loaderEl = document.getElementById('global-loader');
    if (!loaderEl || loaderEl.style.display === 'none') {
      setIsLoaded(true);
    } else {
      window.addEventListener('hero-entrance-start', handleEntrance);
    }

    return () => window.removeEventListener('hero-entrance-start', handleEntrance);
  }, []);

  const [videoSrc, setVideoSrc] = useState("/hero/Final Video.mp4");

  useEffect(() => {
    // Basic Adaptive Loading: check hardware concurrency and network connection
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlowNetwork = connection && (connection.effectiveType === '2g' || connection.effectiveType === '3g' || connection.saveData);
    
    // If running on a low-end device (<= 4 cores) or slow network, request compressed video
    if (cores <= 4 || isSlowNetwork) {
      setVideoSrc("/hero/Final Video Compressed.mp4"); // Fallback compressed version
    }

    if (videoRef.current) {
      // Fix for Android Chrome strict autoplay: forcefully set muted via DOM
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.setAttribute('playsinline', '');

      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Video play failed", e));
    }
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      let elementPosition = 0;
      let el: HTMLElement | null = element;
      while (el) {
        elementPosition += el.offsetTop;
        el = el.offsetParent as HTMLElement;
      }
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="contain-section relative min-h-screen w-full overflow-hidden flex items-center justify-center md:justify-start bg-black text-center md:text-left"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero/main gif.gif"
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
      </div>

      {/* Soft Dissolving Gradient Overlay - Completely seamless fade without any sharp line */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b md:bg-gradient-to-r from-black/90 via-black/55 to-transparent backdrop-blur-[3px] md:backdrop-blur-[6px]" />

      {/* Main Hero Container */}
      <div className="relative z-20 container mx-auto px-6 sm:px-10 md:px-16 pt-20 pb-12 md:pt-28 md:pb-16 flex flex-col justify-between min-h-screen">
        {/* Main Content Box */}
        <div className="max-w-4xl text-center md:text-left my-auto mx-auto md:mx-0">

          {/* Dynamic Weight Heading */}
          <div className="mb-4 md:mb-6 w-full max-w-[800px]">
            {/* Desktop Left-Aligned Stacked Lines */}
            <div className="hidden md:flex flex-col items-start text-left w-full space-y-0.5">
              <div className="w-full whitespace-nowrap">
                <h1 className="text-white font-normal tracking-tight leading-[1.05]" style={{ fontSize: '95px' }}>
                  <FocusReveal text="The Benchmark of" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.2, staggerChildren: 0.035 }} />
                </h1>
              </div>
              <div className="w-full whitespace-nowrap">
                <h1 className="text-white font-normal tracking-tight leading-[1.05]" style={{ fontSize: '95px' }}>
                  <FocusReveal text="Commercial Print" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.2, delay: 0.35, staggerChildren: 0.035 }} />
                </h1>
              </div>
            </div>

            {/* Mobile Centered Stacked Lines */}
            <div className="md:hidden flex flex-col items-center text-center w-full space-y-0.5">
              <div className="w-full whitespace-nowrap">
                <h1 className="text-white font-normal tracking-tight leading-[1.05]" style={{ fontSize: 'clamp(40px, 10vw, 60px)' }}>
                  <FocusReveal text="The Benchmark of" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.2, staggerChildren: 0.035 }} />
                </h1>
              </div>
              <div className="w-full whitespace-nowrap">
                <h1 className="text-white font-normal tracking-tight leading-[1.05]" style={{ fontSize: 'clamp(40px, 10vw, 60px)' }}>
                  <FocusReveal text="Commercial Print" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.2, delay: 0.35, staggerChildren: 0.035 }} />
                </h1>
              </div>
            </div>
          </div>

          {/* Subtext */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="mb-8 md:mb-10 w-full max-w-[800px]"
          >
            <div>
              <p className="text-white/85 text-sm sm:text-base md:text-xl font-normal leading-relaxed text-center md:text-left mx-auto md:mx-0">
                World-class commercial design meets flawless print execution. We transform corporate visions into tactile, high-end assets.
              </p>
            </div>
          </motion.div>

          {/* Radial Reveal Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
          >
            <div className="flex flex-row items-center justify-center md:justify-start gap-3 sm:gap-5 w-full md:scale-[1.2] md:origin-left mt-2 md:mt-4">
              <RadialRevealButton
                label="Explore"
                onClick={() => scrollTo('featured-products')}
                padding="12px 28px"
                rounded={100}
                colors={{
                  fill: "rgba(255, 255, 255, 0.05)",
                  textColor: "#FFFFFF",
                  hoverFill: "#FFFFFF",
                  hoverTextColor: "#000000",
                }}
                border={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
                font={{
                  fontFamily: "'Helvetica Now Display', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                }}
              />
              <RadialRevealButton
                label="Shop"
                onClick={() => window.open('https://shop.guruprintingpress.com', '_blank')}
                padding="12px 36px"
                rounded={100}
                colors={{
                  fill: "#FFFFFF",
                  textColor: "#000000",
                  hoverFill: "#000000",
                  hoverTextColor: "#FFFFFF",
                }}
                border={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#FFFFFF",
                }}
                font={{
                  fontFamily: "'Helvetica Now Display', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Text Sections (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="hidden md:flex flex-row justify-start gap-24 w-full pt-10"
        >
          <div className="flex flex-col text-left">
            <h3 className="text-white text-[20px] font-normal tracking-tight leading-tight mb-1">Your Reliable Partner</h3>
            <p className="text-white/80 text-[14px] font-normal leading-relaxed">Trusted by elite brands for absolute print perfection.</p>
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-white text-[20px] font-normal tracking-tight leading-tight mb-1">Premium Craftsmanship</h3>
            <p className="text-white/80 text-[14px] font-normal leading-relaxed">Mastery in high-end commercial print and tactile finishes.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

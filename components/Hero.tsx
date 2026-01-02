import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';

// Note: GSAP is loaded via CDN in index.html, so we access it via window.gsap
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

  // GSAP Animations & Master Sequence
  useLayoutEffect(() => {
    const ctx = window.gsap.context(() => {
      // 1. Initial State: Hide Hero Content
      window.gsap.set(".hero-line", { yPercent: 100, opacity: 0 });
      window.gsap.set(".hero-subheading", { yPercent: 100, opacity: 0 });

      // 2. Setup Automatic Infinite Text Swap (Solution <-> Partner) - Runs continuously
      const tlSwap = window.gsap.timeline({ repeat: -1 });
      const duration = 0.8;
      const pause = 3;

      // Initial State: Word 1 (Solution) is visible, Word 2 (Partner) is hidden below
      window.gsap.set(".word-2", { yPercent: 100, opacity: 0 });

      // Step 1: Swap Solution -> Partner
      tlSwap.to(".word-1", { yPercent: -100, opacity: 0, duration: duration, ease: "power3.inOut", force3D: true }, `+=${pause}`)
        .to(".word-2", { yPercent: 0, opacity: 1, duration: duration, ease: "power3.inOut", force3D: true }, "<")

        // Reset Solution to bottom
        .set(".word-1", { yPercent: 100, opacity: 0 })

        // Step 2: Swap Partner -> Solution
        .to(".word-2", { yPercent: -100, opacity: 0, duration: duration, ease: "power3.inOut", force3D: true }, `+=${pause}`)
        .to(".word-1", { yPercent: 0, opacity: 1, duration: duration, ease: "power3.inOut", force3D: true }, "<")

        // Reset Partner to bottom for loop
        .set(".word-2", { yPercent: 100, opacity: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const playHeroEntrance = () => {
    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline();

      // 1. Trigger Header Entrance (Navigation)
      window.dispatchEvent(new CustomEvent('hero-entrance-start'));

      // 2. Animate Hero Heading Lines & Subheading
      tl.to(".hero-line", {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        force3D: true
      })
        .to(".hero-subheading", {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          force3D: true
        }, "-=0.8"); // Overlap slightly with heading

    }, containerRef);
  };

  useEffect(() => {
    // 1.5 second delay before playing
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Video play failed", e));
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section ref={containerRef} id="home" className="contain-section relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <Loader onComplete={playHeroEntrance} />

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
        <div className="w-full">
          <h1 className="text-fluid-hero font-dharma uppercase leading-[0.85] mb-0 text-white flex flex-col items-center w-full text-balance">

            {/* Line 1 Desktop: "Your One-Stop" | Mobile: Stacked "Your" then "One-Stop" */}
            <div className="overflow-hidden pb-1 md:pb-4 w-full md:w-auto">
              <div className="hero-reveal-text hero-line gpu-accelerate flex flex-col md:block">
                <span className="block md:inline">Your </span>
                <span className="block md:inline">One-Stop</span>
              </div>
            </div>

            {/* Line 2 Desktop: "Printing [Swap]" | Mobile: Stacked "Printing" then "[Swap]" */}
            <div className="overflow-hidden pb-1 md:pb-4 w-full md:w-auto">
              <div className="hero-reveal-text hero-line gpu-accelerate flex flex-col md:flex-row items-center gap-0 md:gap-4 justify-center">
                <span className="block">Printing</span>

                {/* Text Swap Container */}
                <span className="gpu-accelerate relative inline-block align-bottom overflow-hidden min-w-[3ch] h-[1.1em] md:h-auto w-full md:w-auto">
                  {/* Invisible placeholder to set width/height */}
                  <span className="opacity-0 select-none">Solution</span>

                  {/* Word 1: Solution */}
                  <span className="word-1 absolute top-0 left-0 w-full text-center text-white">
                    Solution
                  </span>

                  {/* Word 2: Partner */}
                  <span className="word-2 absolute top-0 left-0 w-full text-center text-white">
                    Partner
                  </span>
                </span>
              </div>
            </div>
          </h1>

          <div className="overflow-hidden pb-2">
            <p className="masked-heading hero-subheading gpu-accelerate text-fluid-body text-white/90 mb-0 max-w-2xl mx-auto leading-relaxed font-bold inline-block drop-shadow-md px-4 text-balance">
              Partner with Patna’s most reliable press for seamless printing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

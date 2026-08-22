import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT, IMAGES } from '../constants';
import Loader from './Loader';
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

  // GSAP Entrance Animations
  useLayoutEffect(() => {
    const ctx = window.gsap.context(() => {
      window.gsap.set(".hero-reveal-item", { y: 20, opacity: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const playHeroEntrance = () => {
    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline();
      window.dispatchEvent(new CustomEvent('hero-entrance-start'));
      tl.to(".hero-reveal-item", {
        y: 0,
        opacity: 1,
        duration: 1.8,
        stagger: 0.12,
        ease: "power2.inOut",
        force3D: true
      });
    }, containerRef);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.error("Video play failed", e));
      }
    }, 600);
    return () => clearTimeout(timeout);
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
      <Loader onComplete={playHeroEntrance} />

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
          <source src="/hero/Final Video.mp4" type="video/mp4" />
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
                  <FocusReveal text="The Benchmark of" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.8, staggerChildren: 0.05 }} />
                </h1>
              </div>
              <div className="w-full whitespace-nowrap">
                <h1 className="text-white font-normal tracking-tight leading-[1.05]" style={{ fontSize: '95px' }}>
                  <FocusReveal text="Commercial Print" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.8, delay: 0.5, staggerChildren: 0.05 }} />
                </h1>
              </div>
            </div>

            {/* Mobile Centered Stacked Lines */}
            <div className="md:hidden flex flex-col items-center text-center w-full space-y-0.5">
              <div className="w-full whitespace-nowrap">
                <h1 className="text-white font-normal tracking-tight leading-[1.05]" style={{ fontSize: 'clamp(40px, 10vw, 60px)' }}>
                  <FocusReveal text="The Benchmark of" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.8, staggerChildren: 0.05 }} />
                </h1>
              </div>
              <div className="w-full whitespace-nowrap">
                <h1 className="text-white font-normal tracking-tight leading-[1.05]" style={{ fontSize: 'clamp(40px, 10vw, 60px)' }}>
                  <FocusReveal text="Commercial Print" color="white" appearTrigger="custom" customTriggerEvent="hero-entrance-start" transition={{ duration: 1.8, delay: 0.5, staggerChildren: 0.05 }} />
                </h1>
              </div>
            </div>
          </div>

          {/* Subtext */}
          <div className="mb-8 md:mb-10 w-full max-w-[800px]">
            <div className="hero-reveal-item opacity-0">
              <p className="text-white/85 text-sm sm:text-base md:text-xl font-normal leading-relaxed text-center md:text-left mx-auto md:mx-0">
                World-class commercial design meets flawless print execution. We transform corporate visions into tactile, high-end assets.
              </p>
            </div>
          </div>

          {/* Radial Reveal Buttons */}
          <div className="hero-reveal-item opacity-0">
            <div className="flex flex-row items-center justify-center md:justify-start gap-3 sm:gap-5 w-full md:scale-[1.2] md:origin-left mt-2 md:mt-4">
              <RadialRevealButton
                label="Explore"
                onClick={() => scrollTo('about')}
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
                onClick={() => scrollTo('products')}
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
          </div>
        </div>

        {/* Bottom Text Sections (Desktop Only) */}
        <div className="hidden md:flex flex-row justify-start gap-24 w-full opacity-0 hero-reveal-item pt-10">
          <div className="flex flex-col text-left">
            <h3 className="text-white text-[20px] font-normal tracking-tight leading-tight mb-1">Your Reliable Partner</h3>
            <p className="text-white/80 text-[14px] font-normal leading-relaxed">Trusted by elite brands for absolute print perfection.</p>
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-white text-[20px] font-normal tracking-tight leading-tight mb-1">Premium Craftsmanship</h3>
            <p className="text-white/80 text-[14px] font-normal leading-relaxed">Mastery in high-end commercial print and tactile finishes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

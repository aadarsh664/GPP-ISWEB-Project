import React, { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';
import TextEmerge from './TextEmerge';
import ScrollVelocityGSAP from './ScrollVelocityGSAP';
import RevealOnScroll from './RevealOnScroll';

function AnimatedNumber({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (val) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(val).toLocaleString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [value, inView, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const logos = Array.from({ length: 17 }, (_, i) => `/client-logos/logo${i + 1}.svg`);

const StatsSection: React.FC = () => {
  return (
    <section id="about-section" className="py-24 md:py-40 font-normal bg-white" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Main Text */}
        <div className="max-w-[1000px] mx-auto text-center mb-32 md:mb-48">
          <TextEmerge
            text="The biggest challenge for global brands is maintaining absolute consistency when moving from screen to scale. We engineer out the guesswork, delivering uncompromising print quality and flawless tactile finishes that command authority and protect your brand's integrity across every physical touchpoint."
            font={{
              fontFamily: "'Helvetica Now Display', sans-serif",
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: "1.3",
              textAlign: "center"
            }}
            color="#000000"
            staggerFrom="start"
          />
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 mb-40 md:mb-48">
          
          <div className="flex flex-col items-center text-center">
            <h3 className="text-6xl md:text-[5.5rem] mb-4 text-black font-medium tracking-normal w-[300px]" style={{ letterSpacing: '0' }}>
              <AnimatedNumber value={16} suffix="+" />
            </h3>
            <RevealOnScroll delay={0.2}>
              <p className="text-lg md:text-2xl tracking-tight text-black leading-snug">
                Years of Commercial<br />Print Mastery
              </p>
            </RevealOnScroll>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="text-6xl md:text-[5.5rem] mb-4 text-black font-medium tracking-normal w-[300px]" style={{ letterSpacing: '0' }}>
              <AnimatedNumber value={1257} suffix="+" />
            </h3>
            <RevealOnScroll delay={0.4}>
              <p className="text-lg md:text-2xl tracking-tight text-black leading-snug">
                Global Brands<br />Empowered
              </p>
            </RevealOnScroll>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="text-6xl md:text-[5.5rem] mb-4 text-black font-medium tracking-normal w-[300px]" style={{ letterSpacing: '0' }}>
              <AnimatedNumber value={36785} suffix="+" />
            </h3>
            <RevealOnScroll delay={0.6}>
              <p className="text-lg md:text-2xl tracking-tight text-black leading-snug">
                Flawless Executions<br />Delivered
              </p>
            </RevealOnScroll>
          </div>

        </div>

        {/* Client Logos Header */}
        <RevealOnScroll direction="up" delay={0.1} className="text-center mb-16 md:mb-24">
          <p className="text-base md:text-xl tracking-tight text-black">
            Chosen by Global Industry Leaders
          </p>
        </RevealOnScroll>

      </div>

      <div className="w-full overflow-hidden relative pb-8">
        <ScrollVelocityGSAP
          items={logos.map((src, i) => (
            <img 
              key={i} 
              src={src} 
              alt="Client Logo" 
              className="h-9 md:h-11 w-auto max-w-[200px] object-contain opacity-60 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0 pointer-events-auto"
              draggable={false}
            />
          ))}
          baseVelocity={2}
          direction="left"
          gap={56}
        />
      </div>
    </section>
  );
};

export default StatsSection;

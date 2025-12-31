
import React, { useState, useEffect } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import WhatsAppLogo from './WhatsAppLogo';
import HeroCard from './HeroCard';
import Loader from './Loader';
import Lenis from 'lenis';

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
  const { scrollY } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 1,
      smoothWheel: true,
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, []);

  // Parallax effect: Video moves slower than scroll (0px to 300px down as user scrolls 0 to 1000px)
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);

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

  const whatsappLink = `https://wa.me/919341749399?text=${encodeURIComponent("Hi GPP, I found your website and want to discuss a printing project.")}`;

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-start lg:items-center pt-4 pb-12 md:pt-20 lg:py-20">
      <Loader />
      
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 bg-[#F0FBFF] will-change-transform">
        <div className="absolute inset-0 bg-white/10 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Using the brand intro video as the background loop */}
          <source src="https://v.fastcdn.co/u/6f554522/62497181-0-GPP-Intro.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-printing-machine-printing-on-paper-34444-large.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-4 lg:gap-20 h-full justify-start lg:justify-between pt-0 lg:pt-0">
        {/* Left Content: Text & Buttons */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full lg:w-1/2 text-center lg:text-left pt-0 lg:pt-0"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-3 md:mb-8 text-black tracking-tighter">
            <span className="block pb-2">
              <TypingText text="Your One-Stop" delay={0.2} /> <br />
              <TypingText text="Printing Solution" className="text-[#FF6600]" delay={0.6} />
            </span>
          </h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-xl text-slate-600 mb-4 md:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold line-clamp-2"
          >
            Partner with Patna’s most reliable press for seamless corporate printing and logistics.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-5 mb-4 lg:mb-0">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-black flex items-center gap-2 hover:bg-[#FF6600] transition-all shadow-2xl group active:scale-95 text-xs md:text-base"
            >
              GET STARTED
              <ChevronRight className="group-hover:translate-x-1 transition-transform w-4 h-4 md:w-auto md:h-auto" />
            </button>
            
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] border-2 border-[#25D366] text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-black flex items-center gap-2 md:gap-3 hover:bg-black hover:border-black transition-all shadow-xl active:scale-95 text-xs md:text-base"
            >
              <WhatsAppLogo size={16} className="md:w-5 md:h-5" />
              CHAT NOW
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content: 3D Hero Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center perspective-1000 relative z-30 scale-[0.65] md:scale-100 origin-top md:origin-center mt-2 md:mt-0"
        >
          <HeroCard />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

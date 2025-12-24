
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import WhatsAppLogo from './WhatsAppLogo';

const Hero: React.FC = () => {
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
    <section id="home" className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-start lg:items-center pt-32 md:pt-40 lg:pt-20">
      <div className="absolute inset-0 z-0 bg-white">
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
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-20 container mx-auto px-6 md:px-12"
      >
        <div className="max-w-4xl lg:text-left text-center mx-auto lg:mx-0">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-8 text-black tracking-tighter"
          >
            <span className="block pb-2">
              Your One-Stop <br className="hidden lg:block" />
              <span className="text-[#FF6600]">Printing Solution</span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-xl text-slate-600 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold"
          >
            Partner with Patna’s most reliable press for seamless corporate printing and logistics.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-5">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black text-white px-10 py-5 rounded-full font-black flex items-center gap-2 hover:bg-[#FF6600] transition-all shadow-2xl group active:scale-95"
            >
              GET STARTED
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] border-2 border-[#25D366] text-white px-10 py-5 rounded-full font-black flex items-center gap-3 hover:bg-black hover:border-black transition-all shadow-xl active:scale-95"
            >
              <WhatsAppLogo size={20} />
              CHAT NOW
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

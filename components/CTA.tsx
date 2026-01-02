
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import WhatsAppLogo from './WhatsAppLogo';
import { ChevronUp } from 'lucide-react';

const CTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], ["100%", "-200%"]);
  const x = useSpring(xRaw, { stiffness: 40, damping: 25 });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  const whatsappLink = `https://wa.me/919341749399?text=${encodeURIComponent("Hi GPP, I am ready to start my printing project. Please assist me.")}`;

  return (
    <div ref={containerRef} className="cta-responsive relative h-[200vh] md:h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#4F46E5]">
        
        {/* Background Decorative Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/50 h-full" />
            ))}
          </div>
        </div>

        {/* The Animated Text Section - Reduced letter gap, kept word gap large */}
        <motion.div 
          style={{ x, scale }}
          className="w-full whitespace-nowrap py-10"
        >
          <h2 className="text-[25vw] font-black text-white leading-none flex items-center gap-[0.5em] uppercase select-none tracking-normal">
            <span>Ready to Print?</span>
            <span>Ready to Print?</span>
            <span>Ready to Print?</span>
          </h2>
        </motion.div>

        {/* Content & Call to Action */}
        <div className="relative z-10 text-center px-6 mt-8 max-w-full">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white/90 text-xl md:text-3xl font-black mb-10 max-w-3xl mx-auto tracking-tight"
          >
            Don't settle for less. Experience industrial-grade quality prints and seamless delivery.
          </motion.p>
          
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 md:gap-5 bg-[#25D366] text-white border-2 border-[#25D366] px-6 py-4 md:px-14 md:py-7 rounded-xl md:rounded-3xl font-black text-sm md:text-2xl shadow-[0_30px_70px_rgba(0,0,0,0.4)] hover:bg-white hover:text-[#25D366] transition-all group uppercase tracking-widest relative z-20 whitespace-nowrap"
          >
            <WhatsAppLogo className="w-5 h-5 md:w-9 md:h-9 group-hover:rotate-12 transition-transform" />
            <span>Start Your Project</span>
          </motion.a>
        </div>

        {/* Scroll Up Indicator - Mobile Only */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:hidden absolute bottom-24 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
              Scroll Up
            </p>
            <ChevronUp className="text-white/60 mt-1" size={16} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA;

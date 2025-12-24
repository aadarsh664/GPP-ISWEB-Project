
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import WhatsAppLogo from './WhatsAppLogo';

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
    <div ref={containerRef} className="relative h-[300vh] bg-black">
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
            className="inline-flex items-center gap-5 bg-[#25D366] text-white border-2 border-[#25D366] px-14 py-7 rounded-3xl font-black text-2xl shadow-[0_30px_70px_rgba(0,0,0,0.4)] hover:bg-white hover:text-[#25D366] transition-all group uppercase tracking-widest relative z-20"
          >
            <WhatsAppLogo size={36} className="group-hover:rotate-12 transition-transform" />
            <span>Start Your Project</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default CTA;


import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import WhatsAppLogo from './WhatsAppLogo';
import { ChevronUp } from 'lucide-react';
import RadialRevealButton from './RadialRevealButton';

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
    <div id="cta-section" ref={containerRef} className="cta-responsive relative h-[180vh] md:h-[250vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">

        {/* Background Decorative Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/50 h-full" />
            ))}
          </div>
        </div>

        {/* The Animated Text Section */}
        <motion.div
          style={{ x, scale }}
          className="w-full whitespace-nowrap py-6 md:py-8"
        >
          <h2 className="text-[22vw] font-normal text-white leading-none flex items-center gap-[0.5em] uppercase select-none tracking-normal">
            <span>Ready to Print?</span>
            <span>Ready to Print?</span>
            <span>Ready to Print?</span>
          </h2>
        </motion.div>

        {/* Content & Call to Action */}
        <div className="relative z-10 text-center px-6 mt-6 max-w-full">
          <RadialRevealButton
            label="Start Your Project"
            link={whatsappLink}
            newTab={true}
            addIcon={true}
            icon={{
              type: "symbol",
              symbol: "→",
              color: "#000000",
              hoverColor: "#FFFFFF",
              size: 20,
              side: "right",
            }}
            padding="16px 40px"
            rounded={100}
            colors={{
              fill: "#FFFFFF",
              textColor: "#000000",
              hoverFill: "#FF6600",
              hoverTextColor: "#FFFFFF",
            }}
            border={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "#FFFFFF",
            }}
            font={{
              fontFamily: "'Helvetica Now Display', sans-serif",
              fontWeight: 400,
              fontSize: 18,
            }}
          />
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
            <p className="text-white/60 text-[10px] font-normal uppercase tracking-[0.2em]">
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

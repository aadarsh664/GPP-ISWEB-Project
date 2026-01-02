
import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Linkedin, Facebook, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GALLERY_IMAGES = [
  '/ourwork/Our Work (1).jpg',
  '/ourwork/Our Work (2).jpg',
  '/ourwork/Our Work (3).jpg',
  '/ourwork/Our Work (4).jpg',
  '/ourwork/Our Work (5).jpg',
  '/ourwork/Our Work (6).jpg',
  '/ourwork/Our Work (7).jpg',
  '/ourwork/Our Work (8).jpg',
  '/ourwork/Our Work (9).jpg',
  '/ourwork/Our Work (10).jpg',
  '/ourwork/Our Work (11).jpg',
  '/ourwork/Our Work (12).jpg',
  '/ourwork/Our Work (13).jpg',
  '/ourwork/Our Work (14).jpg',
  '/ourwork/Our Work (15).jpg',
  '/ourwork/Our Work (16).jpg',
  '/ourwork/Our Work (17).jpg',
  '/ourwork/Our Work (18).jpg',
  '/ourwork/Our Work (19).jpg',
  '/ourwork/Our Work (20).jpg'
];

const PerspectiveCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [xOffset, setXOffset] = useState(260);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth < 768) {
        setXOffset(160); // Smaller offset for mobile
      } else {
        setXOffset(260); // Default offset for desktop
      }
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  // Auto-play functionality
  useEffect(() => {
    const autoPlayInterval = setInterval(handleNext, 3000); // Change image every 3 seconds

    return () => clearInterval(autoPlayInterval); // Cleanup interval on component unmount
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="relative w-full py-10 md:py-20 flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          const { offset, velocity } = info;
          const swipeThreshold = 50; // pixels
          const velocityThreshold = 300;

          if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
            handleNext();
          } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
            handlePrev();
          }
        }}
        className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence mode="popLayout">
          {GALLERY_IMAGES.map((src, i) => {
            let offset = i - activeIndex;
            const len = GALLERY_IMAGES.length;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;

            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 3) return null;

            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: offset * xOffset,
                  z: isActive ? 0 : -300 - (absOffset * 150),
                  rotateY: isActive ? 0 : offset * -30,
                  scale: isActive ? 1 : 0.8,
                  opacity: absOffset > 2 ? 0 : 1,
                  zIndex: 100 - absOffset,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute top-1/2 left-1/2 w-[220px] h-[310px] md:w-[320px] md:h-[440px] bg-black rounded-[24px] md:rounded-[30px] shadow-2xl overflow-hidden cursor-pointer -ml-[110px] -mt-[155px] md:-ml-[160px] md:-mt-[220px] will-change-transform"
                onClick={() => {
                  if (offset === 0) return;
                  if (offset > 0) handleNext();
                  else handlePrev();
                }}
              >
                <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex gap-8 mt-10 z-20">
        <button
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-black/90 text-white flex items-center justify-center hover:bg-[#FF6600] transition-all shadow-xl active:scale-90 backdrop-blur-md"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-black/90 text-white flex items-center justify-center hover:bg-[#FF6600] transition-all shadow-xl active:scale-90 backdrop-blur-md"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: Instagram, href: 'https://www.instagram.com/guruprintingpress/' },
    { Icon: Youtube, href: 'https://www.youtube.com/@Guruprintingpress' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/guru-printing-press-89b31a3a3/' },
    { Icon: Facebook, href: '#' }
  ];

  return (
    <footer className="bg-white pt-16 md:pt-32 overflow-hidden border-t border-slate-100">
      <div id="our-work" className="container mx-auto px-6 md:px-12 mb-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1] tracking-tighter text-black">
            Our Work
          </h3>
          <p className="text-[#FF6600] font-black text-xs tracking-[0.5em] uppercase">
            Real Projects. Real Results.
          </p>
        </div>
        <PerspectiveCarousel />
      </div>

      <div className="bg-slate-50 py-32 px-6 text-center relative z-10">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 leading-[1.1] tracking-tighter">
            Your company deserves the <br />
            <span className="text-indigo-600">right printing partner.</span>
          </h2>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-6 py-3 md:px-14 md:py-6 rounded-xl md:rounded-2xl font-black text-xs md:text-xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-3 mx-auto group active:scale-95 whitespace-nowrap"
          >
            CONTACT US NOW
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      <div className="bg-white container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100 pt-12">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href }, i) => (
              <a
                key={href}
                href={href}
                target={href === '#' ? undefined : "_blank"}
                rel={href === '#' ? undefined : "noopener noreferrer"}
                className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-black hover:text-white hover:scale-110 transition-all shadow-sm"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-8 text-sm font-black text-slate-400 uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy & Policy</Link>
            <Link to="/terms-conditions" className="hover:text-indigo-600 transition-colors">Terms & Conditions</Link>
          </div>

          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest text-center md:text-right">
            @2025 Guru Printing Press. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

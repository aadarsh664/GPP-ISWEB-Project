
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Facebook, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517420980554-3e91d848123d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1598501479159-408f652d536a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&q=80&w=800'
];

const PerspectiveCarousel = () => {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);

  // Constants optimized to prevent "sliver" distortion
  const spacing = 220; // Increased spacing to prevent tight overlap
  const depth = 200;

  const handleNext = () => setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  const onDragEnd = (e: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) handleNext();
    else if (info.offset.x > threshold) handlePrev();
    setDragX(0);
  };

  return (
    <div className="relative w-full overflow-visible py-24 select-none flex flex-col items-center">
      <div className="perspective-[2000px] w-full h-[450px] md:h-[600px] relative flex items-center justify-center overflow-visible">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center preserve-3d"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={(e, info) => setDragX(info.offset.x)}
          onDragEnd={onDragEnd}
        >
          {GALLERY_IMAGES.map((src, i) => {
            const offset = i - index;
            const isActive = offset === 0;
            
            // Capping the rotation to prevent the 3D plane from becoming invisible/too thin
            const rawRotate = offset * -35;
            const rotateY = Math.max(Math.min(rawRotate, 45), -45);
            
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  x: offset * spacing + (dragX * 0.4), 
                  scale: isActive ? 1.1 : 0.85,
                  rotateY: rotateY,
                  z: isActive ? depth : -Math.abs(offset) * 150,
                  opacity: Math.abs(offset) > 3 ? 0 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                  mass: 1
                }}
                className="absolute w-[260px] h-[350px] md:w-[320px] md:h-[430px] rounded-[32px] overflow-hidden bg-white shadow-[0_50px_100px_rgba(0,0,0,0.4)] preserve-3d pointer-events-none"
                style={{
                  backfaceVisibility: 'hidden',
                  zIndex: 100 - Math.abs(offset),
                }}
              >
                <img src={src} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                <motion.div 
                  animate={{ opacity: isActive ? 0 : 0.5 }}
                  className="absolute inset-0 bg-black pointer-events-none"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-16 flex justify-center items-center gap-8">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF6600] transition-all shadow-xl active:scale-90"
        >
          <ChevronLeft size={28} />
        </button>
        <div className="flex gap-2">
          {GALLERY_IMAGES.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-[#FF6600]' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF6600] transition-all shadow-xl active:scale-90"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-32 overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1] tracking-tighter text-black">
            GPP Gallery
          </h3>
          <p className="text-[#FF6600] font-black text-xs tracking-[0.5em] uppercase">
            A New Perspective on Print
          </p>
        </div>
        <PerspectiveCarousel />
      </div>

      <div className="bg-slate-50 py-32 px-6 text-center relative z-10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 leading-[1.1] tracking-tighter">
            Your company deserves the <br />
            <span className="text-indigo-600">right printing partner.</span>
          </h2>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-14 py-6 rounded-2xl font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-4 mx-auto group active:scale-95"
          >
            CONTACT US NOW
            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      <div className="bg-white container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100 pt-12">
          <div className="flex items-center gap-4">
            {[Instagram, Youtube, Linkedin, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-black hover:text-white hover:scale-110 transition-all shadow-sm">
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


import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MoveRight } from 'lucide-react';

const brandLogos = Array.from({ length: 17 }, (_, i) => `/client-logos/logo${i + 1}.svg`);

const ScrollRevealText = ({ content, className }: { content: string, className?: string }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25']
  });

  const words = content.split(" ");

  return (
    <p ref={element} className={`${className} flex flex-wrap justify-center md:justify-start`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        
        return (
          <motion.span 
            key={i} 
            style={{ opacity }} 
            className={i === words.length - 1 ? "" : "mr-1.5"}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

const About: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Scroll logic for the rotating arrow
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the right side cards (moves slightly faster/slower than text)
  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Rotates the arrow based on scroll progress
  const rotation = useTransform(scrollYProgress, [0.1, 0.6], [0, 360]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Tom and Jerry Effect (Magnetic Repulsion)
  const springConfig = { stiffness: 200, damping: 15 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!arrowRef.current) return;
      
      const rect = arrowRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const triggerDistance = 200; // Detection range

      if (distance < triggerDistance) {
        // Calculate repulsion force (stronger when closer)
        const force = (triggerDistance - distance) / triggerDistance;
        const moveDistance = force * 120; // Max movement range
        
        // Move opposite to mouse direction
        const angle = Math.atan2(dy, dx);
        x.set(-Math.cos(angle) * moveDistance);
        y.set(-Math.sin(angle) * moveDistance);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  const cards = [
    { id: 1, title: 'Design', image: '/aboutcardimages/design.jpg', label: 'Step 01' },
    { id: 2, title: 'Print', image: '/aboutcardimages/print.jpg', label: 'Step 02' },
    { id: 3, title: 'Deliver', image: '/aboutcardimages/deliver.jpg', label: 'Step 03' }
  ];

  return (
    <section ref={containerRef} id="about" className="py-12 md:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: textY }}
            className="lg:w-1/2 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <span className="text-[#FF6600] font-black uppercase tracking-[0.3em] text-xs mb-6 block">Our Vision</span>
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1.1] text-black tracking-tighter">
              More Than Just <br />
              <span className="text-[#4F46E5]">Ink on Paper.</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-black mb-8 text-black">Your Reliable Printing Partner.</h3>
            <ScrollRevealText 
              content="At GPP, we turn printing from a hassle into an asset. Bridging creative design and premium production, we serve as your complete backend solution. We replace vendor chaos with a streamlined workflow, delivering not just prints, but peace of mind."
              className="text-slate-900 text-xl leading-relaxed mb-6 max-w-xl mx-auto md:mx-0 font-medium"
            />

            {/* Sticky/Pinned Rotating Arrow aligned left */}
            <div className="relative w-full h-24 hidden md:flex items-center justify-start">
              <motion.div 
                ref={arrowRef}
                style={{ rotate: rotation, opacity: arrowOpacity, x, y }}
                className="text-[#FF6600] flex items-center justify-center"
              >
                <MoveRight size={64} className="stroke-[2.5]" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: cardsY }}
            className="lg:w-1/2 w-full flex gap-4 h-[500px] md:h-[650px]"
          >
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => setHoveredCard(hoveredCard === idx ? null : idx)}
                animate={{ 
                  width: hoveredCard === idx ? '60%' : hoveredCard === null ? '33.3%' : '20%',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative overflow-hidden rounded-[30px] md:rounded-[40px] h-full cursor-pointer group"
              >
                <img 
                  src={card.image} 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  alt={card.title}
                />
                
                {/* Premium Bottom Glass Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-[40%] z-10 pointer-events-none">
                  <div 
                    className="w-full h-full backdrop-blur-md bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-700 group-hover:backdrop-blur-xl"
                    style={{ 
                      maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
                    }} 
                  />
                </div>

                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-20">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FF6600] flex items-center justify-center shrink-0">
                      <ArrowRight className="text-white w-[14px] h-[14px] md:w-[18px] md:h-[18px]" />
                    </div>
                    <span className="text-white/80 text-[10px] md:text-xs font-black uppercase tracking-widest">{card.label}</span>
                  </div>
                  <h4 className="text-white font-black text-xl sm:text-2xl md:text-4xl whitespace-normal md:whitespace-nowrap tracking-tighter leading-tight pb-1">
                    {card.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative pt-16 border-t border-slate-100">
          <p className="text-center text-slate-400 font-bold text-xs tracking-[0.4em] uppercase mb-16">Trusted by Corporate Leaders</p>
          <div className="w-full overflow-hidden flex">
            <motion.div
              className="flex-shrink-0 flex whitespace-nowrap"
              animate={{ x: ['0%', '-100%'] }}
              transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
            >
              {brandLogos.map((logo, i) => (
                <div key={i} className="flex-shrink-0 w-60 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <img src={logo} alt={`Client Logo ${i}`} className="h-20 md:h-24 w-auto object-contain" loading="eager" />
                </div>
              ))}
            </motion.div>
            <motion.div
              className="flex-shrink-0 flex whitespace-nowrap"
              animate={{ x: ['0%', '-100%'] }}
              transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
              aria-hidden="true"
            >
              {brandLogos.map((logo, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 w-60 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <img src={logo} alt={`Client Logo ${i}`} className="h-20 md:h-24 w-auto object-contain" loading="eager" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

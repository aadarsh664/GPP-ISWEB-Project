
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHY_CHOOSE_US, TESTIMONIALS } from '../constants';
import * as LucideIcons from 'lucide-react';
import { Star } from 'lucide-react';

// Optimized Marquee Component to prevent re-renders
const ClientsMarquee = React.memo(() => {


  return (
    <div className="flex overflow-hidden relative py-8">
      <div className="flex w-max will-change-transform" style={{ animation: 'marquee 60s linear infinite' }}>
        <div className="flex flex-shrink-0">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-[15rem] sm:w-[20rem] bg-white border border-slate-100 p-5 sm:p-8 rounded-[24px] sm:rounded-[24px] shadow-sm hover:shadow-md hover:shadow-slate-200 hover:-translate-y-1 transition-all transform-gpu mr-4 sm:mr-6"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4F46E5]/10 rounded-[30px] flex items-center justify-center text-[#4F46E5] shrink-0 overflow-hidden">
                  {t.avatarUrl ? (
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <LucideIcons.User className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
                <div>
                  <h5 className="font-normal text-black text-sm sm:text-base">{t.name}</h5>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 font-normal uppercase tracking-[0.2em] whitespace-normal">{t.designation}, {t.company}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed whitespace-normal text-xs sm:text-sm mb-0 font-normal">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-shrink-0">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={`${t.id}-${idx}-dup`}
              className="w-[15rem] sm:w-[20rem] bg-white border border-slate-100 p-5 sm:p-8 rounded-[24px] sm:rounded-[24px] shadow-sm hover:shadow-md hover:shadow-slate-200 hover:-translate-y-1 transition-all transform-gpu mr-4 sm:mr-6"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4F46E5]/10 rounded-[30px] flex items-center justify-center text-[#4F46E5] shrink-0 overflow-hidden">
                  {t.avatarUrl ? (
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <LucideIcons.User className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
                <div>
                  <h5 className="font-normal text-black text-sm sm:text-base">{t.name}</h5>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 font-normal uppercase tracking-[0.2em] whitespace-normal">{t.designation}, {t.company}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed whitespace-normal text-xs sm:text-sm mb-0 font-normal">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const WhyChooseUs: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const getIcon = (iconName: string) => {
    const formattedName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    // @ts-ignore
    const Icon = LucideIcons[formattedName];
    return Icon ? <Icon size={24} /> : <LucideIcons.HelpCircle size={24} />;
  };

  return (
    <section id="why-choose-us" className="py-10 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        {/* Why Choose GPP Header */}
        <div className="text-center mb-8 md:mb-12 relative">
          <h2 
            ref={headerRef}
            className="font-normal tracking-tight mb-6 text-black relative z-10 inline-block cursor-default" 
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            onMouseEnter={() => setIsHoveringHeader(true)}
            onMouseLeave={() => setIsHoveringHeader(false)}
            onMouseMove={handleMouseMove}
          >
            Why choose GPP?
            <AnimatePresence>
              {isHoveringHeader && (
                <motion.img 
                  src="/favicon/Logo.svg"
                  alt="GPP"
                  className="absolute pointer-events-none z-20 w-16 h-16 md:w-24 md:h-24 object-contain origin-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, left: mousePos.x, top: mousePos.y, x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
                />
              )}
            </AnimatePresence>
          </h2>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <LucideIcons.ArrowDown className="mx-auto text-black w-4 h-4 md:w-6 md:h-6" />
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-20 max-w-7xl mx-auto items-start">
          {WHY_CHOOSE_US.map((card) => (
            <motion.div
              key={card.id}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative p-4 md:p-8 rounded-[30px] md:rounded-[30px] border transition-colors duration-300 cursor-pointer overflow-hidden group 
                [&:nth-child(odd):last-child]:col-span-2 [&:nth-child(odd):last-child]:justify-self-center [&:nth-child(odd):last-child]:w-[calc(50%-0.375rem)] md:[&:nth-child(odd):last-child]:w-[calc(50%-0.75rem)] lg:[&:nth-child(odd):last-child]:col-span-1 lg:[&:nth-child(odd):last-child]:w-auto lg:[&:nth-child(odd):last-child]:justify-self-auto
                ${activeCard === card.id
                  ? 'bg-black text-white shadow-2xl border-transparent z-10'
                  : 'bg-slate-50 text-slate-900 border-slate-100 hover:border-slate-300'
                }`}
            >
              <motion.div className={`w-10 h-10 md:w-14 md:h-14 rounded-[30px] md:rounded-[30px] flex items-center justify-center mb-3 md:mb-6 transition-colors duration-300 ${activeCard === card.id ? 'bg-[#FF6600]/20' : 'bg-white shadow-sm'
                }`}>
                <div className={`${activeCard === card.id ? 'text-[#FF6600]' : 'text-[#4F46E5]'} scale-75 md:scale-100 transition-colors duration-300`}>
                  {getIcon(card.icon)}
                </div>
              </motion.div>

              <motion.h4 className="text-sm md:text-xl font-normal mb-2 md:mb-4 tracking-tight leading-tight">
                {card.title}
              </motion.h4>

              <motion.div
                initial={false}
                animate={{
                  height: activeCard === card.id ? 'auto' : 0,
                  opacity: activeCard === card.id ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <p className="text-slate-400 leading-relaxed text-[10px] md:text-base pb-2 font-normal">
                  {card.content}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="relative">
          <div className="text-center mb-4 md:mb-8 relative">
            <h2 className="font-normal tracking-tight mb-2 text-black" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Testimonials
            </h2>
          </div>

          <ClientsMarquee />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

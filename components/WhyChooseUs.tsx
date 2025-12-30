
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US, TESTIMONIALS } from '../constants';
import * as LucideIcons from 'lucide-react';
import { Star } from 'lucide-react';

// Optimized Marquee Component to prevent re-renders
const ClientsMarquee = React.memo(() => {
  const getStars = (idx: number) => {
    const ratings = [5, 4.5, 5, 4.5, 4.5];
    const rating = ratings[idx % ratings.length];
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} size={14} className="text-[#FF6600] fill-[#FF6600]" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <div key={i} className="relative">
            <Star size={14} className="text-slate-200 fill-slate-200" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={14} className="text-[#FF6600] fill-[#FF6600]" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-slate-200 fill-slate-200" />);
      }
    }
    return stars;
  };

  return (
    <div className="flex overflow-hidden relative py-8">
      <motion.div 
        className="flex flex-shrink-0"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ ease: "linear", duration: 60, repeat: Infinity }}
      >
        {TESTIMONIALS.map((t, idx) => (
          <div 
            key={`${t.id}-${idx}`} 
            className="w-[280px] sm:w-[400px] bg-white border border-slate-100 p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all transform-gpu mr-6 sm:mr-10"
          >
            <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#4F46E5]/10 rounded-full flex items-center justify-center text-[#4F46E5] shrink-0 overflow-hidden">
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
                <h5 className="font-black text-black text-base sm:text-lg">{t.name}</h5>
                <p className="text-[8px] sm:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] whitespace-normal">{t.designation}, {t.company}</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed whitespace-normal text-sm sm:text-lg mb-4 sm:mb-6">
              "{t.content}"
            </p>
            <div className="flex gap-1 items-center scale-90 origin-left sm:scale-100">
              {getStars(idx)}
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div 
        className="flex flex-shrink-0"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ ease: "linear", duration: 60, repeat: Infinity }}
      >
        {TESTIMONIALS.map((t, idx) => (
          <div 
            key={`${t.id}-${idx}-dup`} 
            className="w-[280px] sm:w-[400px] bg-white border border-slate-100 p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all transform-gpu mr-6 sm:mr-10"
          >
            <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#4F46E5]/10 rounded-full flex items-center justify-center text-[#4F46E5] shrink-0 overflow-hidden">
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
                <h5 className="font-black text-black text-base sm:text-lg">{t.name}</h5>
                <p className="text-[8px] sm:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] whitespace-normal">{t.designation}, {t.company}</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed whitespace-normal text-sm sm:text-lg mb-4 sm:mb-6">
              "{t.content}"
            </p>
            <div className="flex gap-1 items-center scale-90 origin-left sm:scale-100">
              {getStars(idx)}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

const WhyChooseUs: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

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
    <section id="why-choose-us" className="py-12 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        {/* Why Choose GPP Header */}
        <div className="text-center mb-10 md:mb-24 relative">
          <h3 className="text-[1.8rem] sm:text-[2.6rem] md:text-5xl lg:text-6xl font-black mb-2 md:mb-4 text-black tracking-tighter whitespace-nowrap">Why Choose GPP?</h3>
          <p className="text-[#FF6600] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 md:mb-8">Unmatched Printing Excellence</p>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <LucideIcons.ArrowDown className="mx-auto text-black w-4 h-4 md:w-6 md:h-6" />
          </motion.div>
        </div>

        {/* Feature Cards Grid - Refactored to 3 columns on large screens */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-20 md:mb-40 max-w-7xl mx-auto">
          {WHY_CHOOSE_US.map((card) => (
            <motion.div
              key={card.id}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative p-4 md:p-8 rounded-[24px] md:rounded-[40px] border transition-all duration-500 cursor-pointer overflow-hidden [&:nth-child(odd):last-child]:col-span-2 [&:nth-child(odd):last-child]:justify-self-center [&:nth-child(odd):last-child]:w-[calc(50%-0.375rem)] md:[&:nth-child(odd):last-child]:w-[calc(50%-0.75rem)] lg:[&:nth-child(odd):last-child]:col-span-1 lg:[&:nth-child(odd):last-child]:w-auto lg:[&:nth-child(odd):last-child]:justify-self-auto ${
                activeCard === card.id 
                  ? 'bg-black text-white shadow-2xl scale-[1.03] border-transparent' 
                  : 'bg-slate-50 text-slate-900 border-slate-100'
              }`}
            >
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 transition-colors ${
                activeCard === card.id ? 'bg-[#FF6600]/20' : 'bg-white shadow-sm'
              }`}>
                <div className={`${activeCard === card.id ? 'text-[#FF6600]' : 'text-[#4F46E5]'} scale-75 md:scale-100`}>
                  {getIcon(card.icon)}
                </div>
              </div>
              <h4 className="text-sm md:text-xl font-black mb-2 md:mb-4 tracking-tight leading-tight">{card.title}</h4>
              
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeCard === card.id ? 'auto' : 0,
                  opacity: activeCard === card.id ? 1 : 0
                }}
                className="text-slate-400 leading-relaxed overflow-hidden text-[10px] md:text-base"
              >
                {card.content}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Our Clients Say Header */}
        <div className="relative">
          <div className="text-center mb-10 md:mb-20 relative">
            <h3 className="text-[1.8rem] sm:text-[2.6rem] md:text-5xl lg:text-6xl font-black mb-2 md:mb-4 text-black tracking-tighter whitespace-nowrap">Our Clients Say</h3>
            <p className="text-[#FF6600] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 md:mb-8">Voices of Satisfaction</p>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <LucideIcons.Star className="mx-auto text-[#FF6600] fill-[#FF6600]" size={20} />
            </motion.div>
          </div>
          
          <ClientsMarquee />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

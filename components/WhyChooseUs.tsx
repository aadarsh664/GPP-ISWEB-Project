
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US, TESTIMONIALS } from '../constants';
import * as LucideIcons from 'lucide-react';
import { Star } from 'lucide-react';

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

  const getStars = (idx: number) => {
    // Generate variety of ratings, mostly 4.5
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
    <section id="why-choose-us" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Why Choose GPP Header */}
        <div className="text-center mb-24 relative">
          <h3 className="text-[1.8rem] sm:text-[2.6rem] md:text-5xl lg:text-6xl font-black mb-4 text-black tracking-tighter whitespace-nowrap">Why Choose GPP?</h3>
          <p className="text-[#FF6600] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-8">Unmatched Printing Excellence</p>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <LucideIcons.ArrowDown className="mx-auto text-black" />
          </motion.div>
        </div>

        {/* Feature Cards Grid - Refactored to 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-40 max-w-7xl mx-auto">
          {WHY_CHOOSE_US.map((card) => (
            <motion.div
              key={card.id}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-[40px] border transition-all duration-500 cursor-pointer overflow-hidden ${
                activeCard === card.id 
                  ? 'bg-black text-white shadow-2xl scale-[1.03] border-transparent' 
                  : 'bg-slate-50 text-slate-900 border-slate-100'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                activeCard === card.id ? 'bg-[#FF6600]/20' : 'bg-white shadow-sm'
              }`}>
                <div className={activeCard === card.id ? 'text-[#FF6600]' : 'text-[#4F46E5]'}>
                  {getIcon(card.icon)}
                </div>
              </div>
              <h4 className="text-xl font-black mb-4 tracking-tight leading-tight">{card.title}</h4>
              
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeCard === card.id ? 'auto' : 0,
                  opacity: activeCard === card.id ? 1 : 0
                }}
                className="text-slate-400 leading-relaxed overflow-hidden text-sm md:text-base"
              >
                {card.content}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Our Clients Say Header */}
        <div className="relative">
          <div className="text-center mb-20 relative">
            <h3 className="text-[1.8rem] sm:text-[2.6rem] md:text-5xl lg:text-6xl font-black mb-4 text-black tracking-tighter whitespace-nowrap">Our Clients Say</h3>
            <p className="text-[#FF6600] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-8">Voices of Satisfaction</p>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <LucideIcons.Star className="mx-auto text-[#FF6600] fill-[#FF6600]" size={20} />
            </motion.div>
          </div>
          
          <div className="flex overflow-hidden relative py-8">
            <div className="flex gap-10 whitespace-nowrap animate-marquee" style={{ animationDuration: '60s' }}>
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div 
                  key={`${t.id}-${idx}`} 
                  className="inline-block w-[320px] sm:w-[400px] bg-white border border-slate-100 p-8 sm:p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-[#4F46E5]/10 rounded-full flex items-center justify-center text-[#4F46E5] shrink-0 overflow-hidden">
                      {t.avatarUrl ? (
                        <img 
                          src={t.avatarUrl} 
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <LucideIcons.User size={24} />
                      )}
                    </div>
                    <div>
                      <h5 className="font-black text-black text-lg">{t.name}</h5>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] whitespace-normal">{t.designation}, {t.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed whitespace-normal text-base sm:text-lg mb-6">
                    "{t.content}"
                  </p>
                  <div className="flex gap-1 items-center">
                    {getStars(idx)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

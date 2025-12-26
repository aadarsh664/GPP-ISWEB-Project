
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { Circle } from 'lucide-react';

const ServiceCard: React.FC<{ service: typeof SERVICES[0], index: number }> = ({ service, index }) => {
  const [activeBrand, setActiveBrand] = useState(service.brands[0]);
  const isDesigning = service.title.toLowerCase() === 'designing';

  return (
    <div className="relative w-full bg-white border-t border-slate-100 shadow-2xl overflow-hidden py-20 lg:py-0 lg:sticky lg:top-0 lg:min-h-screen lg:flex lg:items-center">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
        className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
      >
        {/* Left Side: Text and Buttons */}
        <div className="z-10 flex flex-col justify-center h-full lg:py-16 order-1">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-sm mb-6 block">Service 0{index + 1}</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none text-slate-900 tracking-tight">{service.title}</h2>
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-slate-400">{service.subtitle}</h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
            {service.description}
          </p>

          <div className="space-y-4 mb-8">
             <p className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Specifications</p>
             <div className="flex flex-wrap gap-2">
                {service.options.map(opt => (
                  <span key={opt} className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-slate-600">
                    {opt}
                  </span>
                ))}
             </div>
          </div>

          <p className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-4">
            {isDesigning ? 'Select Software (Hover to preview)' : 'Select Machine (Hover to preview)'}
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {service.brands.map((brand) => (
              <button
                key={brand}
                onMouseEnter={() => setActiveBrand(brand)}
                onClick={() => setActiveBrand(brand)}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all ${
                  activeBrand === brand ? 'bg-black text-white scale-[1.02] shadow-xl' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Circle size={8} className={activeBrand === brand ? 'fill-[#FF6600] text-[#FF6600]' : 'text-slate-300'} />
                <span className="text-sm font-bold tracking-tight">{brand}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Image Display */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[650px] w-full rounded-[40px] lg:rounded-[48px] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] order-2 mt-10 lg:mt-0">
          <AnimatePresence>
            <motion.img
              key={activeBrand}
              src={service.images[activeBrand]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s]"
              alt={activeBrand}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-60" />
          <div className="absolute bottom-8 left-8 lg:bottom-10 lg:left-10">
            <p className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] mb-2">
              {isDesigning ? 'Creative Studio' : 'Industrial Precision'}
            </p>
            <p className="text-white text-3xl lg:text-4xl font-black uppercase tracking-tighter">{activeBrand}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Service: React.FC = () => {
  return (
    <section id="service" className="relative bg-white">
      {SERVICES.map((service, idx) => (
        <ServiceCard key={service.id} service={service} index={idx} />
      ))}
    </section>
  );
};

export default Service;

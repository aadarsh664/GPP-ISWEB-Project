
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { Circle } from 'lucide-react';

const ServiceCard: React.FC<{ service: typeof SERVICES[0], index: number }> = ({ service, index }) => {
  const [activeBrand, setActiveBrand] = useState(service.brands[0]);
  const isDesigning = service.title.toLowerCase() === 'designing';

  return (
    <div className="relative lg:sticky lg:top-0 min-h-screen w-full bg-white flex items-center border-t border-slate-100 shadow-2xl py-24 md:py-48 lg:py-0 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side: Text and Buttons - Added flex-col justify-center for perfect desktop alignment */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="z-10 flex flex-col justify-center h-full lg:py-16"
        >
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-sm mb-6 block">Service 0{index + 1}</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none text-slate-900 tracking-tight">{service.title}</h2>
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-slate-400">{service.subtitle}</h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-md">
            {service.description}
          </p>

          <div className="space-y-4 mb-10">
             <p className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Specifications</p>
             <div className="flex flex-wrap gap-2">
                {service.options.map(opt => (
                  <span key={opt} className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-slate-600">
                    {opt}
                  </span>
                ))}
             </div>
          </div>

          <p className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-5">
            {isDesigning ? 'Select Software (Hover to preview)' : 'Select Machine (Hover to preview)'}
          </p>
          <div className="grid grid-cols-1 gap-3 max-w-sm">
            {service.brands.map((brand) => (
              <button
                key={brand}
                onMouseEnter={() => setActiveBrand(brand)}
                onClick={() => setActiveBrand(brand)}
                className={`flex items-center gap-4 w-full text-left p-4 rounded-2xl transition-all ${
                  activeBrand === brand ? 'bg-black text-white scale-[1.02] shadow-xl' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Circle size={10} className={activeBrand === brand ? 'fill-[#FF6600] text-[#FF6600]' : 'text-slate-300'} />
                <span className="text-lg font-black uppercase tracking-tight">{brand}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Image Display */}
        <div className="relative h-[400px] md:h-[550px] lg:h-[650px] w-full rounded-[48px] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
          <AnimatePresence mode="wait">
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
          <div className="absolute bottom-10 left-10">
            <p className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] mb-2">
              {isDesigning ? 'Creative Studio' : 'Industrial Precision'}
            </p>
            <p className="text-white text-4xl font-black uppercase tracking-tighter">{activeBrand}</p>
          </div>
        </div>
      </div>
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

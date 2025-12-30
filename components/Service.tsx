
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES } from '../constants';
import { Circle } from 'lucide-react';

const ServiceCard: React.FC<{ service: typeof SERVICES[0], index: number }> = ({ service, index }) => {
  const [activeBrand, setActiveBrand] = useState(service.brands[0]);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });
  const isDesigning = service.title.toLowerCase() === 'designing';

  useEffect(() => {
    if (isHovered || !isInView) return;

    const interval = setInterval(() => {
      const currentIndex = service.brands.indexOf(activeBrand);
      const nextIndex = (currentIndex + 1) % service.brands.length;
      setActiveBrand(service.brands[nextIndex]);
    }, 2500);

    return () => clearInterval(interval);
  }, [activeBrand, isHovered, isInView, service.brands]);

  return (
    <div ref={containerRef} id={`service-0${index + 1}`} className="relative w-full bg-white border-t border-slate-100 shadow-sm overflow-hidden py-12 md:py-20 lg:py-0 lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
        className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center"
      >
        {/* Left Side: Text and Buttons */}
        <div className="z-10 flex flex-col justify-center h-full lg:py-16 order-1">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-3 block">Service 0{index + 1}</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-2 md:mb-3 leading-none text-slate-900 tracking-tight">{service.title}</h2>
          <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-slate-400">{service.subtitle}</h3>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4 md:mb-6 max-w-x1.2">
            {service.description}
          </p>

          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
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
          <div 
            className="grid grid-cols-2 gap-3 max-w-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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
        <div className="relative h-[350px] md:h-[500px] lg:h-[600px] w-full rounded-[32px] md:rounded-[40px] lg:rounded-[48px] overflow-hidden group order-2 mt-6 lg:mt-0">
          <motion.img
            key={activeBrand}
            src={service.images[activeBrand]}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s]"
            alt={activeBrand}
          />
          
          {/* Premium Bottom Glass Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] z-10 pointer-events-none">
            <div 
              className="w-full h-full backdrop-blur-md bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-700 group-hover:backdrop-blur-xl"
              style={{ 
                maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
              }} 
            />
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10 z-20">
            <p className="text-[#FF6600] font-black uppercase tracking-widest text-[8px] md:text-[10px] mb-1 md:mb-2">
              {isDesigning ? 'Creative Studio' : 'Industrial Precision'}
            </p>
            <p className="text-white text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter">{activeBrand}</p>
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

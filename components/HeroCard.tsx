import React, { useRef, useState, MouseEvent } from 'react';

const HeroCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Handle Mouse Move for 3D Parallax Effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Rotation Intensity (Adjust this value to increase/decrease tilt)
    const intensity = 40;

    // Calculate rotation values
    // rotateY: tilts left/right based on X axis movement
    // rotateX: tilts up/down based on Y axis movement (inverted for natural feel)
    const newRotateX = -yPct * intensity;
    const newRotateY = xPct * intensity;

    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  // Reset to neutral position on mouse leave
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      className="relative w-full max-w-[400px] md:max-w-[450px] aspect-[3/4] group z-30"
      style={{ perspective: '1200px' }} // CSS Perspective for 3D depth
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full relative transition-transform duration-100 ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* LAYER 1: Background GIF (Deepest Layer) */}
        <div 
          className="absolute inset-0 rounded-[30px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] bg-white border border-slate-100"
          style={{ transform: 'translateZ(0px)' }}
        >
          <img 
            src="/hero/main gif.gif" 
            alt="Printing Process Animation" 
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
          />
        </div>

        {/* LAYER 2: Floating Decorative Elements (Middle Layer) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(40px)' }} // Parallax depth
        >
           {/* Right Side Border Element */}
           <div className="absolute -right-2 md:-right-4 top-16 md:top-20 bg-white/40 backdrop-blur-2xl border border-slate-200/50 p-2 md:p-4 rounded-[30px] md:rounded-[30px] shadow-xl transition-transform duration-500 group-hover:translate-x-2">
             <img 
               src="/hero/right side border element.svg" 
               className="w-16 h-16 md:w-24 md:h-24 drop-shadow-lg opacity-90"
               alt=""
             />
           </div>
           
           {/* Left Side Logo */}
           <div className="absolute -left-4 md:-left-8 top-1/3 bg-white/40 backdrop-blur-2xl border border-slate-200/50 p-2 md:p-4 rounded-[30px] shadow-2xl">
             <img 
               src="/hero/left side logo.svg" 
               className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg"
               alt=""
             />
           </div>
        </div>

        {/* LAYER 3: Glassmorphism Icons (Top Layer) */}
        <div 
          className="absolute inset-0 pointer-events-none flex flex-col justify-end p-8"
          style={{ transform: 'translateZ(80px)' }} // Maximum depth
        >
           {/* Bottom Glass Card */}
           <div className="bg-white/60 backdrop-blur-2xl border border-white/50 p-3 md:p-4 rounded-[30px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] flex items-center gap-3 md:gap-4 w-max max-w-full transition-transform duration-300 group-hover:-translate-y-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[30px] flex items-center justify-center shadow-sm shrink-0">
                <img src="/hero/bottom logo.svg" className="w-7 h-7 object-contain" alt="GPP" />
              </div>
              <div>
                <p className="text-slate-900 font-black text-sm leading-tight tracking-wide">HASSLE FREE PRINTING</p>
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">Built on reliability</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
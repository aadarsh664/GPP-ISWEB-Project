import React, { useRef, useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import RadialRevealButton from './RadialRevealButton';
import Text3DFlip from './Text3DFlip';
import RevealOnScroll from './RevealOnScroll';

const categories = [
  "Visiting Card",
  "Letterheads",
  "Envelope",
  "Diaries",
  "Files",
  "Calendars",
  "Pen",
  "Flyer",
  "Sticker",
  "Led Frame"
];

const products = [
  { id: 1, title: "Luxury Visiting Card" },
  { id: 2, title: "Premium Letterhead" },
  { id: 3, title: "Custom Envelopes" },
  { id: 4, title: "Corporate Diaries" },
  { id: 5, title: "Executive Files" },
  { id: 6, title: "Wall Calendars" },
];

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, hasDragged: false });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    dragState.current.isDown = true;
    dragState.current.startX = e.pageX - ref.current.offsetLeft;
    dragState.current.scrollLeft = ref.current.scrollLeft;
    dragState.current.hasDragged = false;
    ref.current.style.scrollBehavior = 'auto';
    ref.current.style.scrollSnapType = 'none';
  };

  const onMouseLeave = () => {
    if (!dragState.current.isDown) return;
    setIsDragging(false);
    dragState.current.isDown = false;
    if (ref.current) {
      ref.current.style.scrollBehavior = '';
      ref.current.style.scrollSnapType = '';
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    dragState.current.isDown = false;
    if (ref.current) {
      ref.current.style.scrollBehavior = '';
      ref.current.style.scrollSnapType = '';
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.isDown || !ref.current) return;
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5; 
    
    if (Math.abs(walk) > 5) {
      dragState.current.hasDragged = true;
    }
    
    if (dragState.current.hasDragged) {
      e.preventDefault();
      ref.current.scrollLeft = dragState.current.scrollLeft - walk;
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      // Reset for next click
      dragState.current.hasDragged = false;
    }
  };

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    onClickCapture,
    isDragging,
  };
}

const About: React.FC = () => {
  const categoriesScroll = useDragScroll();
  const productsScroll = useDragScroll();

  const scrollLeft = () => {
    if (productsScroll.ref.current) {
      productsScroll.ref.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (productsScroll.ref.current) {
      productsScroll.ref.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="featured-products" className="py-16 md:py-24 bg-white font-normal" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24">
        {/* Categories Strip */}
        <div 
          className="w-full overflow-x-auto pb-6 hide-scrollbar md:overflow-visible cursor-grab active:cursor-grabbing select-none"
          ref={categoriesScroll.ref}
          onMouseDown={categoriesScroll.onMouseDown}
          onMouseLeave={categoriesScroll.onMouseLeave}
          onMouseUp={categoriesScroll.onMouseUp}
          onMouseMove={categoriesScroll.onMouseMove}
          onClickCapture={categoriesScroll.onClickCapture}
        >
          <div className="flex md:grid items-start gap-4 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-5 lg:grid-cols-10 min-w-max md:min-w-0" onDragStart={(e) => e.preventDefault()}>
            {categories.map((cat, idx) => (
              <a
                key={idx}
                href="#"
                draggable={false}
                className="flex flex-col items-center gap-3 md:gap-4 w-[100px] md:w-full shrink-0 group pointer-events-auto"
              >
                <div className="w-[100px] h-[100px] md:w-full md:aspect-square border border-slate-200 rounded-[30px] flex items-center justify-center bg-slate-50 transition-colors group-hover:border-slate-400 group-hover:bg-slate-100 overflow-hidden">
                  <span className="text-[10px] md:text-xs text-slate-400 font-medium tracking-wide text-center px-1">
                    Transparent Image
                  </span>
                </div>
                <span className="text-black text-[11px] md:text-sm tracking-tight text-center">
                  {cat}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Our Products Section */}
      <div className="container mx-auto px-6 md:px-12 relative group">
        <RevealOnScroll delay={0.1}>
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-4xl md:text-[3.5rem] tracking-tight leading-none">Our Products</h2>
            <a href="#" className="hidden md:flex items-center group pointer-events-auto overflow-visible pb-1">
            <Text3DFlip 
              text="View all" 
              font={{ fontSize: '18px', fontWeight: 500, fontFamily: "'Helvetica Now Display', sans-serif", lineHeight: "1em" }} 
              color="#000000" 
              animation="hover" 
            />
          </a>
        </div>
        </RevealOnScroll>
        
        {/* Floating Arrows */}
        <button 
          onClick={scrollLeft} 
          className="flex absolute left-4 md:left-8 top-[calc(50%-45px)] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-[30px] border border-slate-200 bg-white shadow-md items-center justify-center text-black hover:bg-slate-50 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={scrollRight} 
          className="flex absolute right-4 md:right-8 top-[calc(50%-45px)] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-[30px] border border-slate-200 bg-white shadow-md items-center justify-center text-black hover:bg-slate-50 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div 
          className="w-full overflow-x-auto pb-10 hide-scrollbar cursor-grab active:cursor-grabbing select-none"
          ref={productsScroll.ref}
          onMouseDown={productsScroll.onMouseDown}
          onMouseLeave={productsScroll.onMouseLeave}
          onMouseUp={productsScroll.onMouseUp}
          onMouseMove={productsScroll.onMouseMove}
          onClickCapture={productsScroll.onClickCapture}
        >
          <div className="flex items-start gap-6 min-w-max" onDragStart={(e) => e.preventDefault()}>
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flex flex-col w-[280px] md:w-[calc((100vw-6rem-4.5rem)/4)] lg:w-[calc((100vw-6rem-4.5rem)/4)] max-w-[400px]"
              >
                {/* Product Image Area */}
                <a href="#" draggable={false} className="w-full aspect-[3/4] border border-slate-200 rounded-[30px] bg-slate-50 flex items-center justify-center mb-5 md:mb-6 overflow-hidden relative group pointer-events-auto">
                  {/* Container that will hold the future image, scales on hover */}
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center bg-slate-50">
                    <span className="text-slate-400 text-sm md:text-base">
                      Image
                    </span>
                  </div>
                </a>

                {/* Product Info */}
                <div className="flex items-center justify-between mb-2 md:mb-3 px-1">
                  <h3 className="text-xl md:text-2xl tracking-tight text-black">{product.title}</h3>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 md:gap-4 px-1 pointer-events-auto">
                  <RadialRevealButton
                    label="Buy"
                    link="#"
                    padding="8px 24px"
                    rounded={30}
                    colors={{
                      fill: "#000000",
                      textColor: "#FFFFFF",
                      hoverFill: "#FF6600",
                      hoverTextColor: "#FFFFFF",
                    }}
                    border={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "#000000",
                    }}
                    font={{
                      fontFamily: "'Helvetica Now Display', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Required CSS for hiding scrollbars but allowing scroll */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default About;

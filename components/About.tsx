import React, { useRef, useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import RadialRevealButton from './RadialRevealButton';
import Text3DFlip from './Text3DFlip';
import RevealOnScroll from './RevealOnScroll';

// Toggle to show/hide the category strip (currently hidden until all categories are added to Shopify)
const SHOW_CATEGORIES = false;

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

interface ProductItem {
  id: number;
  title: string;
  link: string;
  imageUrl: string;
  fallbackImage: string;
}

const products: ProductItem[] = [
  {
    id: 1,
    title: "Luxury Visiting Card",
    link: "https://shop.guruprintingpress.com/products/luxury-visiting-card",
    imageUrl: "https://cdn.shopify.com/s/files/1/1022/6561/8797/files/Photoshoot_7.png?v=1788428585",
    fallbackImage: "/ourproductimages/luxury-visiting-card.png"
  },
  {
    id: 2,
    title: "Metal Visiting Card",
    link: "https://shop.guruprintingpress.com/products/metal-visiting-card",
    imageUrl: "https://cdn.shopify.com/s/files/1/1022/6561/8797/files/4_b82c2eef-b86e-4820-b268-45928ad07171.png?v=1788435322",
    fallbackImage: "/ourproductimages/metal-visiting-card.png"
  },
  {
    id: 3,
    title: "Custom Shape Die-Cut Visiting Card",
    link: "https://shop.guruprintingpress.com/products/customized-die-cut-luxury-visiting-card",
    imageUrl: "https://cdn.shopify.com/s/files/1/1022/6561/8797/files/1_08b0f9e1-1a50-4344-b0f0-5f257c884584.png?v=1788546364",
    fallbackImage: "/ourproductimages/customized-die-cut-luxury-visiting-card.png"
  },
  {
    id: 4,
    title: "Premium Visiting Card",
    link: "https://shop.guruprintingpress.com/products/premium-visiting-card",
    imageUrl: "https://cdn.shopify.com/s/files/1/1022/6561/8797/files/1_358b9225-0840-4846-b247-4b32386076ca.png?v=1788469337",
    fallbackImage: "/ourproductimages/premium-visiting-card.png"
  },
  {
    id: 5,
    title: "Standard Visiting Card",
    link: "https://shop.guruprintingpress.com/products/standard-visiting-card",
    imageUrl: "https://cdn.shopify.com/s/files/1/1022/6561/8797/files/3_51cb26e2-aece-42af-8491-c28d45c08acc.png?v=1788471502",
    fallbackImage: "/ourproductimages/standard-visiting-card.png"
  },
  {
    id: 6,
    title: "Glossy Visiting Card",
    link: "https://shop.guruprintingpress.com/products/glossy-visiting-card",
    imageUrl: "https://cdn.shopify.com/s/files/1/1022/6561/8797/files/2_8c9d4bee-c0dd-481f-9040-c772dc608b00.png?v=1788471688",
    fallbackImage: "/ourproductimages/glossy-visiting-card.png"
  },
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
    <section id="featured-products" className={`bg-white font-normal ${SHOW_CATEGORIES ? 'py-16 md:py-24' : 'pt-12 pb-16 md:pt-16 md:pb-24'}`} style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
      {/* Categories Strip - Hidden until all categories are ready in Shopify */}
      {SHOW_CATEGORIES && (
        <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24">
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
      )}

      {/* Our Products Section */}
      <div className="container mx-auto px-6 md:px-12 relative group">
        <RevealOnScroll delay={0.1}>
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-4xl md:text-[3.5rem] tracking-tight leading-none">Our Products</h2>
            <a 
              href="https://shop.guruprintingpress.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:flex items-center group pointer-events-auto overflow-visible pb-1"
            >
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
          aria-label="Previous products"
          className="flex absolute left-4 md:left-8 top-[calc(50%-45px)] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-[30px] border border-slate-200 bg-white shadow-md items-center justify-center text-black hover:bg-slate-50 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={scrollRight} 
          aria-label="Next products"
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
                <a 
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false} 
                  className="w-full aspect-[3/4] border border-slate-200 rounded-[30px] bg-slate-50 flex items-center justify-center mb-5 md:mb-6 overflow-hidden relative group pointer-events-auto shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center bg-slate-50 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (product.fallbackImage && !target.src.includes(product.fallbackImage)) {
                          target.src = product.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </a>

                {/* Product Info */}
                <div className="flex items-center justify-between mb-2 md:mb-3 px-1 min-h-[3rem]">
                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF6600] transition-colors"
                  >
                    <h3 className="text-xl md:text-2xl tracking-tight text-black line-clamp-2 leading-snug">{product.title}</h3>
                  </a>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 md:gap-4 px-1 pointer-events-auto">
                  <RadialRevealButton
                    label="Buy"
                    link={product.link}
                    newTab={true}
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

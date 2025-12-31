
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import WhatsAppLogo from './WhatsAppLogo';

// Helper to generate low-res URL (assumes _small suffix exists)
const getThumbnailUrl = (url: string) => {
  // Example: /images/product.jpg -> /images/product_small.jpg
  return url.replace(/(\.[\w\d_-]+)$/i, '_small$1');
};

const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const whatsappMessage = `Hello GPP Team, I have a requirement for ${product.name}. Please share the best quote.`;
  const whatsappUrl = `https://wa.me/919341749399?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-[24px] md:rounded-[40px] max-w-5xl w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col relative z-10 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-6 md:right-6 z-30 w-8 h-8 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#FF6600] transition-colors shadow-lg"
        >
          <X size={18} className="md:w-5 md:h-5" />
        </button>

        <div className="flex flex-col md:flex-row min-h-full h-full overflow-y-auto">
          <div 
            className="w-full h-[250px] md:h-auto md:w-1/2 relative shrink-0 bg-slate-50 flex items-center justify-center overflow-hidden"
          >
            <img src={product.imageUrl} className="w-full h-full object-contain md:object-cover" alt={product.name} loading="eager" />
          </div>
          
          <div 
            className="w-full md:w-1/2 p-5 sm:p-8 md:p-16 flex flex-col justify-center"
          >
            <span className="text-[#FF6600] font-black uppercase tracking-widest text-[10px] md:text-xs mb-3 md:mb-4 block">
              {product.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-8 leading-tight tracking-tight text-black">{product.name}</h2>
            <p className="text-slate-500 text-sm md:text-lg mb-6 md:mb-10 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="mb-8 md:mb-12">
              <p className="font-black text-[10px] md:text-xs text-black mb-4 md:mb-6 uppercase tracking-widest">Premium Specifications</p>
              <ul className="grid grid-cols-1 gap-2 md:gap-4">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-3 md:gap-4 text-slate-700 font-bold">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#FF6600]" />
                    <span className="text-xs md:text-base">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-8 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-3xl font-black flex items-center justify-between group hover:bg-[#25D366] transition-all shadow-2xl mt-auto"
            >
              <span className="text-sm md:text-lg">REQUEST QUOTATION</span>
              <WhatsAppLogo size={20} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productListRef = useRef<HTMLDivElement>(null);

  // Listen for custom event from Header to open specific product modal
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent) => {
      const productId = e.detail;
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    };

    window.addEventListener('open-product-modal' as any, handleOpenModal as any);
    return () => {
      window.removeEventListener('open-product-modal' as any, handleOpenModal as any);
    };
  }, []);

  // Group products by category for better performance and structure
  const productsByCategory = PRODUCTS.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <section id="products" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="mb-20">
          <h3 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-black">Our Products</h3>
          <p className="text-[#FF6600] font-black uppercase tracking-[0.4em] text-xs md:text-sm">Premium Corporate Branding Assets</p>
        </div>

        <div 
          ref={productListRef}
          className="relative"
        >
          {/* Masonry Layout using CSS Columns */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-12 [column-fill:_balance]">
            {Object.entries(productsByCategory).map(([category, products]) => (
              <div key={category} className="break-inside-avoid mb-12 space-y-8 w-full">
                <h4 className="text-2xl md:text-3xl font-black mb-8 pb-4 border-b-4 border-black text-black uppercase tracking-tight text-left">
                  {category}
                </h4>
                <div className="flex flex-col gap-4">
                  {products.map(product => (
                    <motion.button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      whileHover={{ x: 12, backgroundColor: "rgba(255, 255, 255, 1)" }}
                      className="flex items-center justify-between group p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl hover:shadow-2xl hover:shadow-black/5 transition-all border border-slate-200 text-left w-full"
                    >
                      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        <div 
                          className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-lg md:rounded-2xl shadow-inner border border-slate-200/50 overflow-hidden shrink-0"
                        >
                          <img 
                            src={getThumbnailUrl(product.imageUrl)} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                            loading="lazy" 
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.onerror = null; // Prevent infinite loop
                              e.currentTarget.src = product.imageUrl; // Fallback to original if small not found
                            }}
                          />
                        </div>
                        <span className="font-black text-slate-800 group-hover:text-black transition-colors text-base md:text-xl leading-tight">
                          {product.name}
                        </span>
                      </div>
                      <ArrowRight size={24} className="text-[#FF6600] shrink-0 group-hover:translate-x-2 transition-all ml-2" />
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Products;

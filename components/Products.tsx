
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import WhatsAppLogo from './WhatsAppLogo';

const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const whatsappMessage = `Hello GPP Team, I have a requirement for ${product.name}. Please share the best quote.`;
  const whatsappUrl = `https://wa.me/919341749399?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        className="bg-white rounded-[24px] md:rounded-[40px] max-w-5xl w-full max-h-[85vh] md:max-h-[90vh] overflow-y-auto shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-6 md:right-6 z-30 w-8 h-8 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#FF6600] transition-colors shadow-lg"
        >
          <X size={18} className="md:w-5 md:h-5" />
        </button>

        <div className="flex flex-col md:flex-row min-h-full">
          <div className="w-full md:w-1/2 h-[160px] sm:h-[250px] md:h-auto relative shrink-0">
            <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.name} />
          </div>
          
          <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-16 flex flex-col justify-center">
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
    </motion.div>
  );
};

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

        {/* Masonry Layout using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 [column-fill:_balance]">
          {Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category} className="break-inside-avoid mb-12 space-y-8 w-full">
              <h4 className="text-3xl font-black mb-8 pb-4 border-b-4 border-black text-black uppercase tracking-tight text-left">
                {category}
              </h4>
              <div className="flex flex-col gap-4">
                {products.map(product => (
                  <motion.button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    whileHover={{ 
                      x: 12, 
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      backdropFilter: "blur(12px)"
                    }}
                    className="flex items-center justify-between group p-6 bg-white/50 backdrop-blur-sm rounded-3xl hover:shadow-2xl hover:shadow-black/5 transition-all border border-slate-200 text-left w-full"
                  >
                    <span className="font-black text-slate-800 group-hover:text-black transition-colors text-xl leading-tight">
                      {product.name}
                    </span>
                    <ArrowRight size={24} className="text-[#FF6600] shrink-0 group-hover:translate-x-2 transition-all" />
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
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

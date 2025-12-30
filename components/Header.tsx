
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search as SearchIcon } from 'lucide-react';
import WhatsAppLogo from './WhatsAppLogo';
import BrandLogo from './BrandLogo';
import { PRODUCTS } from '../constants';
import Search from './Search';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      
      let elementPosition = 0;
      let el: HTMLElement | null = element;
      while (el) {
        elementPosition += el.offsetTop;
        el = el.offsetParent as HTMLElement;
      }
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const handleProductClick = (productId: string) => {
    scrollTo('products');
    // Dispatch a custom event to open the product modal
    setTimeout(() => {
      const event = new CustomEvent('open-product-modal', { detail: productId });
      window.dispatchEvent(event);
    }, 600); // Slight delay to allow scrolling to finish
  };

  // Group products by category for the dropdown
  const productsByCategory = PRODUCTS.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof PRODUCTS>);

  const navItems = ['Home', 'About', 'Service', 'Products', 'Contact', 'Our Work'];
  const headerWhatsappLink = `https://wa.me/919341749399?text=${encodeURIComponent("Hi GPP, I found your website and want to discuss a printing project.")}`;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        onAnimationComplete={() => setAnimationComplete(true)}
        style={animationComplete ? { transform: 'none' } : undefined}
        className="sticky top-0 left-0 right-0 z-[110] bg-white/95 backdrop-blur-md border-b border-slate-100 h-20 flex items-center shadow-sm"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>
             <BrandLogo className="h-14 w-auto group-hover:scale-105 transition-transform" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => {
              if (item === 'Products') {
                return (
                  <div key={item} className="relative group">
                    <button
                      onClick={() => scrollTo('products')}
                      className="text-sm font-bold text-slate-500 hover:text-black transition-colors relative py-4"
                    >
                      {item}
                      <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-[#FF6600] transition-all group-hover:w-full" />
                    </button>
                    
                    {/* Products Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[600px]">
                      <div 
                        className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 max-h-[60vh] overflow-y-auto overscroll-contain"
                        data-lenis-prevent
                      >
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {Object.entries(productsByCategory).map(([category, products]) => (
                            <div key={category}>
                              <h4 className="font-black text-black text-[10px] uppercase tracking-widest mb-3 border-b border-slate-100 pb-2 text-left">{category}</h4>
                              <ul className="space-y-2 text-left">
                                {products.map(product => (
                                  <li key={product.id}>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleProductClick(product.id);
                                      }}
                                      className="text-sm text-slate-500 hover:text-[#FF6600] hover:font-bold transition-all w-full text-left block"
                                    >
                                      {product.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(/ /g, '-'))}
                  className="text-sm font-bold text-slate-500 hover:text-black transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6600] transition-all group-hover:w-full" />
                </button>
              );
            })}
          </nav>

          {/* Action Button & Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 group cursor-pointer"
            >
              <SearchIcon className="text-slate-500 group-hover:text-black transition-colors" size={22} />
              <span className="text-sm font-bold text-slate-500 w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap">
                Search
              </span>
            </button>

            <div className="hidden lg:block w-px h-6 bg-slate-200" />

            <a
              href={headerWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white border-2 border-[#25D366] px-6 py-3 rounded-full hover:bg-white hover:text-[#25D366] transition-all flex items-center gap-2 group active:scale-95"
            >
              <WhatsAppLogo size={18} />
              <span className="text-sm font-black hidden sm:block">WHATSAPP US</span>
            </a>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-black hover:bg-slate-50 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-black text-white flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {/* Mobile Search Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex items-center gap-4 text-2xl font-black text-slate-400 hover:text-white transition-colors mb-4"
            >
              <SearchIcon size={24} />
              <span>Search Products</span>
            </motion.button>

            {navItems.map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => scrollTo(item.toLowerCase().replace(/ /g, '-'))}
                className="text-4xl font-black hover:text-[#FF6600] transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;

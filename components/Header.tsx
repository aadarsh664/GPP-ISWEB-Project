import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search as SearchIcon } from 'lucide-react';
import WhatsAppLogo from './WhatsAppLogo';
import BrandLogo from './BrandLogo';
import { PRODUCTS } from '../constants';
import Search from './Search';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger change ONLY after scrolling past the hero video (approx 100vh)
      setIsScrolled(window.scrollY > window.innerHeight - 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance Animation Logic
  useLayoutEffect(() => {
    const ctx = window.gsap.context(() => {
      // 1. Initial State: Hide Nav Items
      window.gsap.set([".nav-logo", ".nav-link", ".nav-action"], { 
        y: -30, 
        opacity: 0 
      });
    }, headerRef);

    const handleEntrance = () => {
      ctx.add(() => {
        window.gsap.to([".nav-logo", ".nav-link", ".nav-action"], {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true
        });
      });
    };

    window.addEventListener('hero-entrance-start', handleEntrance);
    return () => {
      window.removeEventListener('hero-entrance-start', handleEntrance);
      ctx.revert();
    };
  }, []);

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

  // Shared transition styles for expansion
  const expansionTransition = { transition: "max-width 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), padding-right 0.4s cubic-bezier(0.25, 1, 0.5, 1)" };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full max-w-[100vw] z-[1000] transition-all duration-300 h-20 flex items-center ${
          isScrolled ? 'bg-white border-b border-slate-100 shadow-sm' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
          {/* Logo */}
          <div className={`nav-logo flex items-center gap-3 cursor-pointer group px-3 py-2 rounded-2xl transition-all relative z-20 ${isScrolled ? 'bg-transparent' : ''}`} onClick={() => scrollTo('home')}>
             <BrandLogo isWhite={!isScrolled} className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navItems.map((item) => {
              if (item === 'Products') {
                return (
                  <div key={item} className="nav-link relative group">
                    <button
                      onClick={() => scrollTo('products')}
                      className={`text-sm font-bold hover:text-[#FF6600] transition-colors relative py-4 ${isScrolled ? 'text-slate-500' : 'text-white'}`}
                    >
                      {item}
                      <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-[#FF6600] transition-all group-hover:w-full" />
                    </button>
                    
                    {/* Products Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[600px] -z-10 group-hover:z-50 transform origin-top scale-95 group-hover:scale-100">
                      <div 
                        className={`rounded-2xl shadow-2xl p-6 border backdrop-blur-md max-h-[60vh] overflow-y-auto overscroll-contain transition-all duration-300 ${
                          isScrolled 
                            ? 'bg-white/80 border-black/5' 
                            : 'bg-black/70 border-white/10'
                        }`}
                        data-lenis-prevent
                      >
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {Object.entries(productsByCategory).map(([category, products]) => (
                            <div key={category}>
                              <h4 className={`font-black text-[10px] uppercase tracking-widest mb-3 border-b pb-2 text-left ${
                                isScrolled ? 'text-black border-slate-100' : 'text-white border-white/20'
                              }`}>{category}</h4>
                              <ul className="space-y-2 text-left">
                                {products.map(product => (
                                  <li key={product.id}>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleProductClick(product.id);
                                      }}
                                      className={`text-sm font-bold transition-all w-full text-left block ${
                                        isScrolled 
                                          ? 'text-slate-500 hover:text-[#FF6600]' 
                                          : 'text-white/70 hover:text-white'
                                      }`}
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
                  className={`nav-link text-sm font-bold hover:text-[#FF6600] transition-colors relative group ${isScrolled ? 'text-slate-500' : 'text-white'}`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6600] transition-all group-hover:w-full" />
                </button>
              );
            })}
          </nav>

          {/* Action Button & Toggle */}
          <div className="flex items-center gap-4 relative z-20">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`nav-action hidden lg:flex h-10 items-center rounded-full group overflow-hidden ${
                isScrolled 
                  ? 'text-slate-500 hover:bg-black hover:text-white' 
                  : 'text-white hover:bg-white hover:text-black'
              }`}
              style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <SearchIcon size={22} />
              </div>
              <span className="max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 whitespace-nowrap font-bold text-sm pr-0 group-hover:pr-4" style={expansionTransition}>
                SEARCH
              </span>
            </button>

            <div className={`nav-action hidden lg:block w-px h-6 ${isScrolled ? 'bg-slate-200' : 'bg-white/30'}`} />

            <a
              href={headerWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`nav-action h-10 flex items-center rounded-full group overflow-hidden ${
                isScrolled 
                  ? 'text-slate-500 hover:bg-black hover:text-white' 
                  : 'text-white hover:bg-white hover:text-black'
              }`}
              style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <WhatsAppLogo size={22} />
              </div>
              <span className="max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 whitespace-nowrap font-bold text-sm pr-0 group-hover:pr-4" style={expansionTransition}>
                WHATSAPP
              </span>
            </a>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`nav-action lg:hidden w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isScrolled ? 'text-black hover:bg-slate-50' : 'text-white hover:bg-white/10'}`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

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

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { SearchIcon, Menu, X } from 'lucide-react';
import Text3DFlip from './Text3DFlip';
import RadialRevealButton from './RadialRevealButton';
import Search from './Search';

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledState, setIsScrolledState] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const isBlog = location.pathname.startsWith('/blog');
  const isScrolled = isBlog ? false : isScrolledState;

  useEffect(() => {
    let rafId: number | null = null;
    let cachedSections: HTMLElement[] | null = null;
    let lastFetch = 0;

    const fetchSections = () => {
      return ['our-craft', 'service-dark', 'digital-dark', 'cta-section', 'footer-section', 'faq-section']
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        
        const scrollY = window.scrollY;
        const threshold = window.innerHeight - 50;

        // Fast path: Before hero ends, header is transparent
        if (scrollY <= threshold && !isBlog) {
          setIsScrolledState(false);
          return;
        }

        // Fetch sections once every 2 seconds if not all are loaded yet (due to React.lazy)
        const now = Date.now();
        if (!cachedSections || cachedSections.length < 6) {
          if (now - lastFetch > 2000) {
            cachedSections = fetchSections();
            lastFetch = now;
          }
        }

        const sections = cachedSections || [];
        let inDark = false;
        
        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= 64 && rect.bottom >= 64) {
            inDark = true;
            break;
          }
        }

        setIsScrolledState(!inDark);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    // If not on the homepage, immediately show the nav (no hero entrance delay)
    if (location.pathname !== '/') {
      setIsNavVisible(true);
      return;
    }

    const handleEntrance = () => setIsNavVisible(true);
    window.addEventListener('hero-entrance-start', handleEntrance);
    
    // Fallback: just in case the event was already fired or missed
    const timeout = setTimeout(() => setIsNavVisible(true), 2500);

    return () => {
      window.removeEventListener('hero-entrance-start', handleEntrance);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

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

  const handleNavClick = (item: string) => {
    if (item === 'Blog') {
      navigate('/blog');
      setIsMenuOpen(false);
      return;
    }
    
    if (item === 'Shop') {
      window.open('https://shop.guruprintingpress.com', '_blank');
      setIsMenuOpen(false);
      return;
    }
    
    let targetId = item.toLowerCase().replace(/ /g, '-');
    if (item === 'Product') targetId = 'featured-products';
    if (item === 'About') targetId = 'about-section';
    if (item === 'Services') targetId = 'service-intro';
    if (item === 'Showcase') targetId = 'our-work';
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollTo(targetId), 150);
      setIsMenuOpen(false);
    } else {
      scrollTo(targetId);
    }
  };

  const handleProductClick = (productId: string) => {
    handleNavClick('Product');
    // Dispatch a custom event to open the product modal
    setTimeout(() => {
      const event = new CustomEvent('open-product-modal', { detail: productId });
      window.dispatchEvent(event);
    }, 600); // Slight delay to allow scrolling to finish
  };

  const navItems = ['Home', 'Shop', 'About', 'Services', 'Product', 'Contact', 'Showcase', 'Blog'];
  const headerWhatsappLink = `https://wa.me/919341749399?text=${encodeURIComponent("Hi GPP, I found your website and want to discuss a printing project.")}`;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Shared transition styles for expansion
  const expansionTransition = { transition: "max-width 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), padding-right 0.4s cubic-bezier(0.25, 1, 0.5, 1)" };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full max-w-[100vw] z-[1000] transition-all duration-300 h-16 flex items-center ${
          isScrolled ? 'bg-white border-b border-slate-100 shadow-sm' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
          {/* Logo */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={isNavVisible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
            className={`nav-logo flex items-center gap-2 cursor-pointer group px-2 py-1 rounded-[30px] transition-all relative z-20 ${isScrolled ? 'bg-transparent' : ''}`} 
            onClick={() => scrollTo('home')}
          >
             <BrandLogo isWhite={!isScrolled} className="h-7 md:h-8 w-auto group-hover:scale-105 transition-transform" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navItems.map((item, i) => {
              return (
                <motion.button
                  initial={{ y: -30, opacity: 0 }}
                  animate={isNavVisible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 + i * 0.05 }}
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="nav-link relative group"
                >
                  <Text3DFlip
                    text={item}
                    font={{ fontSize: '14px', fontWeight: 500, fontFamily: "'Helvetica Now Display', sans-serif", lineHeight: "1em" }}
                    color={isScrolled ? '#64748b' : '#ffffff'}
                    animation="hover"
                  />
                </motion.button>
              );
            })}
          </nav>

          {/* Action Button & Toggle */}
          <div className="flex items-center gap-3 relative z-20">
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={isNavVisible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="nav-action hidden lg:block group"
            >
              <RadialRevealButton
                label={
                  <div className="flex items-center gap-2 overflow-hidden w-4 group-hover:w-[76px] transition-all duration-500 ease-out">
                    <SearchIcon size={16} className="shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap">SEARCH</span>
                  </div>
                }
                onClick={() => setIsSearchOpen(true)}
                padding="6px 16px"
                rounded={100}
                colors={{
                  fill: "transparent",
                  textColor: isScrolled ? "#64748b" : "#FFFFFF",
                  hoverFill: isScrolled ? "#000000" : "#FFFFFF",
                  hoverTextColor: isScrolled ? "#FFFFFF" : "#000000",
                }}
                border={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: isScrolled ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
                }}
                font={{
                  fontFamily: "'Helvetica Now Display', sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                }}
              />
            </motion.div>

            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={isNavVisible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
              className={`nav-action hidden lg:block w-px h-4 ${isScrolled ? 'bg-slate-200' : 'bg-white/20'}`} 
            />

            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={isNavVisible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="nav-action hidden lg:block group"
            >
              <RadialRevealButton
                label={
                  <div className="flex items-center gap-2 overflow-hidden w-4 group-hover:w-[85px] transition-all duration-500 ease-out">
                    <WhatsAppLogo className="w-3.5 h-3.5 shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap">WHATSAPP</span>
                  </div>
                }
                link={headerWhatsappLink}
                newTab={true}
                padding="6px 16px"
                rounded={100}
                colors={{
                  fill: "transparent",
                  textColor: isScrolled ? "#64748b" : "#FFFFFF",
                  hoverFill: "#25D366",
                  hoverTextColor: "#FFFFFF",
                }}
                border={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: isScrolled ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
                }}
                font={{
                  fontFamily: "'Helvetica Now Display', sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                }}
              />
            </motion.div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`nav-action lg:hidden w-10 h-10 flex items-center justify-center rounded-[30px] transition-colors ${isScrolled ? 'text-black hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="fixed inset-0 z-[105] bg-black text-white flex flex-col items-center justify-center gap-5 lg:hidden"
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
              className="flex items-center gap-4 text-xl font-normal text-slate-400 hover:text-white transition-colors mb-4"
              style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}
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
                  onClick={() => handleNavClick(item)}
                className="text-3xl font-normal hover:text-[#FF6600] transition-colors"
                style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}
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

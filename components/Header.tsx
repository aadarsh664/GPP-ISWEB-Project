import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search as SearchIcon } from 'lucide-react';
import WhatsAppLogo from './WhatsAppLogo';
import BrandLogo from './BrandLogo';
import { PRODUCTS } from '../constants';
import Search from './Search';
import RadialRevealButton from './RadialRevealButton';
import Text3DFlip from './Text3DFlip';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const craftSection = document.getElementById('our-craft');
        let inCraft = false;
        if (craftSection) {
          const rect = craftSection.getBoundingClientRect();
          inCraft = rect.top <= 64 && rect.bottom >= 64;
        }

        const serviceDarkSection = document.getElementById('service-dark');
        let inServiceDark = false;
        if (serviceDarkSection) {
          const rect = serviceDarkSection.getBoundingClientRect();
          inServiceDark = rect.top <= 64 && rect.bottom >= 64;
        }

        const digitalDarkSection = document.getElementById('digital-dark');
        let inDigitalDark = false;
        if (digitalDarkSection) {
          const rect = digitalDarkSection.getBoundingClientRect();
          inDigitalDark = rect.top <= 64 && rect.bottom >= 64;
        }

        const ctaSection = document.getElementById('cta-section');
        let inCta = false;
        if (ctaSection) {
          const rect = ctaSection.getBoundingClientRect();
          inCta = rect.top <= 64 && rect.bottom >= 64;
        }

        const footerSection = document.getElementById('footer-section');
        let inFooter = false;
        if (footerSection) {
          const rect = footerSection.getBoundingClientRect();
          inFooter = rect.top <= 64 && rect.bottom >= 64;
        }

        const faqSection = document.getElementById('faq-section');
        let inFaq = false;
        if (faqSection) {
          const rect = faqSection.getBoundingClientRect();
          inFaq = rect.top <= 64 && rect.bottom >= 64;
        }

        // Trigger change ONLY after scrolling past the hero video (approx 100vh), and NOT in our-craft, service-dark, digital-dark, faq, cta, or footer sections
        setIsScrolled(window.scrollY > window.innerHeight - 50 && !inCraft && !inServiceDark && !inDigitalDark && !inFaq && !inCta && !inFooter);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
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

  const handleNavClick = (item: string) => {
    if (item === 'Blog') {
      navigate('/blog');
      setIsMenuOpen(false);
      return;
    }
    
    let targetId = item.toLowerCase().replace(/ /g, '-');
    if (item === 'Shop' || item === 'Product') targetId = 'featured-products';
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

  const location = useLocation();
  const navigate = useNavigate();

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
          <div className={`nav-logo flex items-center gap-2 cursor-pointer group px-2 py-1 rounded-[30px] transition-all relative z-20 ${isScrolled ? 'bg-transparent' : ''}`} onClick={() => scrollTo('home')}>
             <BrandLogo isWhite={!isScrolled} className="h-7 md:h-8 w-auto group-hover:scale-105 transition-transform" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navItems.map((item) => {
              return (
                <button
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
                </button>
              );
            })}
          </nav>

          {/* Action Button & Toggle */}
          <div className="flex items-center gap-3 relative z-20">
            <div className="nav-action hidden lg:block group">
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
            </div>

            <div className={`nav-action hidden lg:block w-px h-4 ${isScrolled ? 'bg-slate-200' : 'bg-white/20'}`} />

            <div className="nav-action hidden lg:block group">
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
            </div>

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

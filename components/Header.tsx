
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import WhatsAppLogo from './WhatsAppLogo';
import BrandLogo from './BrandLogo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const navItems = ['Home', 'About', 'Service', 'Products', 'Contact'];
  const headerWhatsappLink = `https://wa.me/919341749399?text=${encodeURIComponent("Hi GPP, I found your website and want to discuss a printing project.")}`;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[110] bg-white/95 backdrop-blur-md border-b border-slate-100 h-20 flex items-center shadow-sm"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('home')}>
             <BrandLogo className="h-14 w-auto group-hover:scale-105 transition-transform" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-bold text-slate-500 hover:text-black transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6600] transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action Button & Toggle */}
          <div className="flex items-center gap-4">
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
            {navItems.map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-4xl font-black hover:text-[#FF6600] transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

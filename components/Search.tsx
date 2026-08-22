import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { PRODUCTS } from '../constants';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

const Search: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerCaseQuery = query.toLowerCase();
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery)
    );
  }, [query]);

  // Handle keyboard shortcuts (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Highlight matched text in results
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-[#FF6600] text-white px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex flex-col items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-3xl mt-16 md:mt-24 bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Search Input */}
              <div className="relative">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, services..."
                  className="w-full bg-black/80 border border-slate-700 text-white rounded-[30px] py-5 pl-16 pr-8 text-lg focus:ring-2 focus:ring-[#FF6600] outline-none transition-all shadow-2xl backdrop-blur-xl"
                />
              </div>

              {/* Search Results */}
              {query && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-lenis-prevent
                  className="mt-6 bg-black/90 border border-white/10 rounded-[30px] max-h-[60vh] overflow-y-auto overscroll-contain shadow-2xl backdrop-blur-xl"
                >
                  {searchResults.length > 0 ? (
                    <ul className="p-4 space-y-2">
                      {searchResults.map((result, idx) => (
                        <motion.li
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <a 
                            href="#" 
                            onClick={(e) => { 
                              e.preventDefault(); 
                              onClose(); 
                              const element = document.getElementById('products');
                              if (element) element.scrollIntoView({ behavior: 'smooth' });
                              setTimeout(() => {
                                window.dispatchEvent(new CustomEvent('open-product-modal', { detail: result.id }));
                              }, 600);
                            }} 
                            className="flex items-center gap-4 p-3 rounded-[30px] hover:bg-white/10 transition-colors"
                          >
                            <img src={result.imageUrl} alt={result.name} className="w-16 h-16 rounded-[30px] object-cover bg-slate-700" />
                            <div>
                              <p className="font-bold text-white text-lg">{highlightMatch(result.name)}</p>
                              <p className="text-slate-400 text-sm">{highlightMatch(result.category)}</p>
                            </div>
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-10 text-center text-slate-400">
                      <p className="font-bold">No results found for "{query}"</p>
                      <p className="text-sm mt-2">Try searching for something else.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Search;
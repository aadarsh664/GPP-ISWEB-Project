import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "What printing services does Guru Printing Press offer?",
    answer: "GPP provides end-to-end commercial printing — offset, digital, flex, and packaging — alongside a dedicated luxury product line featuring metal visiting cards, gold foil finishes, premium letterpress, pens, and other branded stationery."
  },
  {
    question: "What makes GPP's luxury visiting cards stand out?",
    answer: "Every luxury card is designed and manufactured in-house — from concept to premium finishing like metal, gold foil, and letterpress — giving us full control over quality at every step, so each card reflects genuine craftsmanship."
  },
  {
    question: "Do you handle bulk commercial printing for businesses?",
    answer: "Yes — diaries, letterheads, pamphlets, brochures, booklets, banners/flex, notebooks, packaging, and visiting cards are all part of our core commercial printing services, suited for businesses of any size."
  },
  {
    question: "Can your team design my products, or do I need to provide artwork?",
    answer: "Yes — our in-house creative team designs everything we print, not just cards: logos, packaging, banners, wedding cards, and full brand identities. Bring an idea or nothing at all, we'll build it from scratch."
  },
  {
    question: "What is the typical turnaround time for an order?",
    answer: "Turnaround depends on the product and customization level; our team confirms an exact delivery timeline once your order and finish specifications are finalized."
  },
  {
    question: "Do you ship outside India?",
    answer: "Yes — we're expanding internationally, starting with our premium visiting cards, with more product categories opening up to global shipping as we grow."
  },
  {
    question: "Can I see a sample before placing a bulk order?",
    answer: "Absolutely — for bulk commercial orders, we can share a physical sample or digital proof first, so you know exactly what you're getting before full production begins."
  },
  {
    question: "How do I place an order or get a quote?",
    answer: "Most of our products can be ordered directly online at shop.guruprintingpress.com. For bulk or frequent printing needs, you can also reach out directly via WhatsApp, email, or the contact form on this site for a tailored quote."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="bg-[#050505] py-24 md:py-32 w-full relative z-10 border-t border-white/5 border-b">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl text-white font-normal tracking-tight mb-6" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
            Frequently Asked <span className="text-[#FF6600]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Questions</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-normal max-w-2xl mx-auto">
            Everything you need to know about our luxury cards and commercial printing services.
          </p>
        </motion.div>

        <div className="flex flex-col border-t border-white/10">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left group gap-6"
                >
                  <h3 className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 pr-4 ${isOpen ? 'text-[#FF6600]' : 'text-white group-hover:text-white/80'}`} style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
                    {faq.question}
                  </h3>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${isOpen ? 'border-[#FF6600] bg-[#FF6600]/10' : 'border-white/20 bg-white/5 group-hover:bg-white/10'}`}>
                    {isOpen ? (
                      <Minus size={18} className="text-[#FF6600]" />
                    ) : (
                      <Plus size={18} className="text-white" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 md:pb-10 pr-12 md:pr-24">
                        <p className="text-white/70 text-lg leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

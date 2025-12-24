
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I am the GPP Expert. How can I help you with your printing project today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are an expert printing consultant for Guru Printing Press (GPP). 
          GPP specializes in Precision Offset Printing and Digital Solutions.
          Services: Visiting Cards, Letterheads, Envelopes, Receipt Books, Brochures.
          Tone: Professional, expert, helpful. 
          Suggest contacting via WhatsApp (9341749399) for pricing.`,
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Service temporarily unavailable. Please use WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-24 right-0 w-[350px] md:w-[450px] h-[600px] bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-8 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF6600] rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-black text-xl leading-none">GPP AI Expert</h4>
                  <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest">Active Now</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm flex gap-4 ${
                    msg.role === 'user' ? 'bg-[#4F46E5] text-white rounded-br-none' : 'bg-white text-black rounded-bl-none'
                  }`}>
                    {msg.role === 'bot' && <Bot size={18} className="shrink-0 mt-1 text-[#FF6600]" />}
                    <p className="font-medium">{msg.text}</p>
                    {msg.role === 'user' && <User size={18} className="shrink-0 mt-1 text-white/50" />}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-5 rounded-3xl rounded-bl-none shadow-sm flex items-center gap-3">
                    <Loader2 size={18} className="animate-spin text-[#FF6600]" />
                    <span className="text-xs text-slate-400 font-black uppercase tracking-widest">GPP is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask our expert..."
                className="flex-1 bg-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-black text-white p-4 rounded-2xl hover:bg-[#FF6600] disabled:opacity-50 transition-all shadow-xl"
              >
                <Send size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-black text-white rounded-[30px] flex items-center justify-center shadow-2xl relative overflow-hidden group border-2 border-slate-900"
      >
        <div className="absolute inset-0 bg-[#FF6600] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div className="relative z-10">
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </div>
      </motion.button>
    </div>
  );
};

export default AIAssistant;

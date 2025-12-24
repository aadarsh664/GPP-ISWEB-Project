
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import WhatsAppLogo from './WhatsAppLogo';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const whatsappLink = `https://wa.me/919341749399?text=${encodeURIComponent("Hi GPP, I have a query regarding your services.")}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      mobile: formData.get('mobile'),
      email: formData.get('email'),
      company: formData.get('company'),
      requirement: formData.get('requirement'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset(); // Form clear karein
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <div className="mb-16">
          <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Get in Touch</h3>
          <p className="text-[#FF6600] font-bold uppercase tracking-widest text-sm">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-indigo-50 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</h4>
                  <p className="text-base md:text-xl font-bold text-slate-900">9341749399, 7004138194</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-indigo-50 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-base md:text-xl font-bold text-slate-900">guruprintingp@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-indigo-50 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Address</h4>
                  <p className="text-base md:text-xl font-bold text-slate-900 leading-relaxed">
                    Kazipur Road No. - 4,<br className="md:hidden" /> Near Arvind Mahila College,<br />
                    Patna, Bihar - 800004.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full bg-slate-100 rounded-[32px] overflow-hidden shadow-inner grayscale hover:grayscale-0 transition-all">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3597.749667746408!2d85.1631596!3d25.6135371!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzQ4LjciTiA4NcKwMDknNDcuNCJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-10 md:p-12 rounded-[40px] shadow-sm border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Name</label>
                  <input required name="name" type="text" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Mobile Number</label>
                  <input required name="mobile" type="tel" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="+91 0000000000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
                  <input required name="email" type="email" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Company Name</label>
                  <input name="company" type="text" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Acme Inc." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Requirement</label>
                <textarea required name="requirement" rows={4} className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                  isSuccess ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-indigo-600'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSuccess ? (
                  <>
                    <Send size={20} />
                    <span>SENT SUCCESSFULLY!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>SUBMIT FORM</span>
                  </>
                )}
              </motion.button>
              
              <div className="flex flex-col gap-4 pt-4 border-t border-slate-200 mt-6">
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Or Chat Instantly</p>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-[#25D366] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all"
                >
                  <WhatsAppLogo size={24} />
                  WHATSAPP US
                </a>
              </div>
              
              {isSuccess && (
                <p className="text-center text-sm font-bold text-green-600 mt-4 animate-pulse">
                  Thank you for contacting GPP, our representative will respond shortly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

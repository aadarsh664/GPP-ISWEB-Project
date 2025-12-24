
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 font-bold text-indigo-600 mb-12 hover:gap-4 transition-all">
          <ChevronLeft /> Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg prose-slate"
        >
          <h1 className="text-5xl font-black mb-10">Privacy Policy</h1>
          <p className="text-xl text-slate-600 mb-8">Effective Date: January 1, 2025</p>
          
          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            At Guru Printing Press (GPP), we collect information that you provide directly to us through our contact forms, including your name, email address, phone number, company name, and specific printing requirements.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed">
            We use the information collected to respond to your inquiries, provide printing quotations, manage your orders, and send important updates regarding our services. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">3. Data Security</h2>
          <p className="text-slate-600 leading-relaxed">
            We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">4. Cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            Our website may use cookies to enhance your browsing experience and analyze website traffic. You can choose to disable cookies through your browser settings.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">5. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have any questions about our Privacy Policy, please contact us at guruprintingp@gmail.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
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
          <h1 className="text-5xl font-black mb-10">Terms & Conditions</h1>
          <p className="text-xl text-slate-600 mb-8">Last Updated: January 1, 2025</p>
          
          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">1. Service Agreement</h2>
          <p className="text-slate-600 leading-relaxed">
            By using the services of Guru Printing Press (GPP), you agree to provide accurate information for all printing orders and acknowledge that the final product quality is dependent on the resolution and quality of the digital assets provided by you.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">2. Quotes and Pricing</h2>
          <p className="text-slate-600 leading-relaxed">
            All quotations provided through our website or via WhatsApp are valid for a period of 15 days unless otherwise stated. GPP reserves the right to adjust pricing based on material costs or changes in project scope.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">3. Delivery and Timelines</h2>
          <p className="text-slate-600 leading-relaxed">
            While we strive for fast turnaround, delivery timelines provided are estimates. GPP is not liable for delays caused by third-party logistics or external factors beyond our control.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">4. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed">
            Clients represent that they own the rights to all content provided for printing. GPP reserves the right to showcase completed works on our portfolio and social media unless explicitly requested otherwise in writing.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">5. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed">
            GPP's total liability for any claim arising out of an order shall not exceed the amount paid for that specific order.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

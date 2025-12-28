
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
          
          <p className="text-slate-600 leading-relaxed mb-6">
            At <strong className="text-slate-900">Guru Printing Press (GPP)</strong>, we respect your privacy and are committed to protecting the personal and business information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard information when you interact with our website, services, or communication channels.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            By using our website or services, you agree to the practices described in this policy.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We collect information only when it is voluntarily provided by you, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Business or organization name</li>
            <li>Printing or design requirements</li>
            <li>Any details shared via contact forms, email, WhatsApp, or phone calls</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            We may also collect limited non-personal data such as browser type, device information, IP address, and website usage data for analytics and performance improvement.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The information collected is used strictly for legitimate business purposes, including:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Responding to inquiries and quotation requests</li>
            <li>Processing printing and design orders</li>
            <li>Communicating order updates, approvals, and delivery details</li>
            <li>Improving our services, workflow, and website performance</li>
            <li>Internal record-keeping and operational analysis</li>
          </ul>
          <p className="text-slate-600 leading-relaxed font-bold">
            We do not sell, rent, or trade your personal information to third parties.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">3. Client Design Files & Confidential Business Data</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Guru Printing Press (GPP) understands the sensitive nature of client-provided materials, including printable files, designs, artwork, documents, and business data.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Any files, designs, or content shared with us for printing or design purposes are used <strong className="text-slate-900">strictly for order fulfillment and internal production processes only</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            We <strong className="text-slate-900">do not share, sell, distribute, reuse, or disclose</strong> client files with any third party without explicit permission from the client, except where disclosure is required by law or legal authority.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Client files are stored securely, and access is limited only to authorized personnel involved in production, quality control, or order management.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Upon completion of an order, files may be retained for record-keeping, reprint requests, or customer support purposes unless the client requests deletion in writing.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">4. Cookies & Website Analytics</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our website may use cookies and similar technologies to enhance user experience and analyze website performance.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            We may use tools such as <strong className="text-slate-900">Google Analytics / Google Tag</strong> to understand traffic patterns, visitor behavior, and site effectiveness. These tools collect anonymous usage data and do not personally identify users.
          </p>
          <p className="text-slate-600 leading-relaxed">
            You may choose to disable cookies through your browser settings. However, doing so may affect certain website functionalities.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">5. Data Security Measures</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We implement reasonable technical and organizational safeguards to protect your personal and business information against unauthorized access, misuse, alteration, or loss.
          </p>
          <p className="text-slate-600 leading-relaxed">
            While we take appropriate precautions, no method of internet transmission or electronic storage is completely secure. By using our services, you acknowledge and accept this risk.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">6. Information Sharing & Legal Disclosure</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We do not disclose personal or business information to third parties except:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>When required by law, court order, or government authority</li>
            <li>When necessary to protect our legal rights or comply with legal obligations</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Any such disclosure is limited strictly to what is legally required.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">7. Your Rights & Choices</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Request access to the information we hold about you</li>
            <li>Request correction or deletion of your personal or business data</li>
            <li>Opt out of non-essential communications</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Requests can be made by contacting us using the details below.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">8. Policy Updates</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Guru Printing Press reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page with an updated revision date.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Continued use of our website or services constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">9. Contact Information</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            For questions, concerns, or data-related requests, please contact us at:
          </p>
          <p className="text-xl font-bold text-indigo-600 mb-12">
            <a href="mailto:guruprintingp@gmail.com" className="hover:underline">guruprintingp@gmail.com</a>
          </p>

          <p className="text-slate-500 italic">Last Updated: January 1, 2025</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

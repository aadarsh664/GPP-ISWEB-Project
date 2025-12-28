
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

          <p className="text-slate-600 leading-relaxed mb-6">
            These Terms & Conditions govern the use of services provided by <strong className="text-slate-900">Guru Printing Press (GPP)</strong>. By placing an order, submitting files, or using our website or services, you agree to be bound by the terms outlined below.
          </p>
          
          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">1. Service Agreement</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            By engaging with Guru Printing Press (GPP), the client confirms that all information, specifications, quantities, and files provided for printing or design services are accurate and approved.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Final print output depends heavily on the quality, resolution, color mode, and correctness of the digital files supplied by the client. GPP shall not be responsible for errors resulting from low-resolution files, incorrect dimensions, spelling mistakes, or unapproved designs.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">2. Quotations & Pricing</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            All quotations shared via website, email, WhatsApp, or any other communication channel are valid for <strong className="text-slate-900">15 days</strong> unless stated otherwise.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Prices may vary due to:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Changes in material costs</li>
            <li>Modification in quantity or specifications</li>
            <li>Design revisions after quotation approval</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            GPP reserves the right to revise pricing if the project scope changes after confirmation.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">3. Order Confirmation & Production</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            An order is considered confirmed only after:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Final design approval (where applicable)</li>
            <li>Confirmation of specifications</li>
            <li>Receipt of advance or partial payment (as mutually agreed)</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Once production or design work has started, changes or cancellations may not be possible.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">4. Delivery & Timelines</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Turnaround times provided by GPP are <strong className="text-slate-900">estimated timelines</strong>, not guaranteed delivery dates.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            GPP shall not be held liable for delays caused by:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Third-party logistics or courier services</li>
            <li>Power failures, machine breakdowns, or raw material shortages</li>
            <li>Natural events, strikes, or circumstances beyond reasonable control</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">5. Client Responsibilities</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The client confirms that:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>They own or have legal rights to use all logos, images, text, and content submitted for printing</li>
            <li>Submitted materials do not violate copyright, trademark, or intellectual property laws</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            GPP shall not be responsible for legal claims arising from content provided by the client.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">6. Intellectual Property & Usage Rights</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            All intellectual property rights of client-provided designs remain with the client.
          </p>
          <p className="text-slate-600 leading-relaxed">
            GPP reserves the right to display completed or printed work for portfolio, website, marketing, or social media purposes unless the client submits a written request to restrict such usage before order execution.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">7. Quality & Color Variation Disclaimer</h2>
          <p className="text-slate-600 leading-relaxed">
            Due to differences in screen displays, printing machines, inks, and materials, <strong className="text-slate-900">minor color variations may occur</strong> between digital previews and final printed output. Such variations shall not be considered defects.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">8. Payment Terms (Advance & Balance)</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            To initiate any design or printing project, the client agrees to the following payment structure:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li><strong className="text-slate-900">30%–50% advance payment</strong> is required to start the project or design work</li>
            <li>After completion of design or final approval by the client, an additional <strong className="text-slate-900">30%–50% payment</strong> is required before proceeding further</li>
            <li>The <strong className="text-slate-900">remaining balance amount must be cleared on the same day of delivery</strong></li>
            <li>In exceptional cases, where credit is mutually agreed, payment must be completed within <strong className="text-slate-900">7–8 days</strong>, failing which GPP reserves the right to take necessary recovery action</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            GPP reserves the right to withhold delivery or suspend future work in case of pending or delayed payments.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">9. Refund Policy</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Refunds are applicable <strong className="text-slate-900">only if the project or design work has not started</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Once design, production, or printing work has commenced:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li><strong className="text-slate-900">No refunds shall be provided</strong></li>
            <li>Advance payments are strictly non-refundable</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            This policy applies regardless of order size or project type.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">10. Cancellation Policy</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Order cancellation requests must be submitted in writing.
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>If an order is cancelled <strong className="text-slate-900">before work has started</strong>, refund eligibility will be reviewed as per the Refund Policy</li>
            <li>If cancelled <strong className="text-slate-900">after work has started</strong>, the advance amount paid shall <strong className="text-slate-900">not be refunded</strong></li>
            <li>If the order has been completed or is ready for delivery, <strong className="text-slate-900">up to 100% of the order value may be charged</strong>, even if the client chooses not to accept delivery</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">11. Urgent / Express Job Disclaimer</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Urgent or express jobs are undertaken strictly at the client’s request and risk.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Due to limited processing time, urgent jobs may involve:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Reduced quality checks</li>
            <li>Higher chances of minor or major printing errors</li>
            <li>Possibility of defects, misprints, or finishing inconsistencies</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mb-4">
            By placing an urgent or express order, the client explicitly acknowledges and agrees that <strong className="text-slate-900">any errors, defects, or issues arising in such jobs shall be the sole responsibility of the client</strong>, and <strong className="text-slate-900">Guru Printing Press (GPP) shall not be held liable</strong> for reprints, refunds, replacements, or compensation.
          </p>
          <p className="text-slate-600 leading-relaxed">
            While GPP will make every reasonable effort to prioritize urgent jobs, <strong className="text-slate-900">completion timelines are best-effort commitments and not guaranteed</strong>.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">12. Data & File Retention</h2>
          <p className="text-slate-600 leading-relaxed">
            Client files may be retained for record-keeping, reprints, or customer support purposes. Clients may request file deletion after order completion through written communication.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">13. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            GPP’s total liability for any claim, damage, or loss related to an order shall be limited strictly to the amount paid by the client for that specific order.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Under no circumstances shall GPP be liable for indirect, incidental, or consequential damages.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">14. Governing Law & Jurisdiction</h2>
          <p className="text-slate-600 leading-relaxed">
            These Terms & Conditions shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts located in <strong className="text-slate-900">Patna, Bihar</strong>.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">15. Amendments</h2>
          <p className="text-slate-600 leading-relaxed">
            Guru Printing Press reserves the right to modify these Terms & Conditions at any time. Updated versions will be published on the website and will apply to future orders.
          </p>

          <p className="text-slate-600 leading-relaxed mt-12 mb-4">
            For questions or clarifications, please contact:
          </p>
          <p className="text-xl font-bold text-indigo-600 mb-12">
            <a href="mailto:guruprintingp@gmail.com" className="hover:underline">guruprintingp@gmail.com</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

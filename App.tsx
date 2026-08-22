
import React, { useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/Hero';
// PERF: Lazy load below-the-fold components to reduce initial bundle size
const About = React.lazy(() => import('./components/About'));
const ImageStackSection = React.lazy(() => import('./components/ImageStackSection'));
const StatsSection = React.lazy(() => import('./components/StatsSection'));
const Service = React.lazy(() => import('./components/Service'));
const DigitalServices = React.lazy(() => import('./components/DigitalServices'));
const Products = React.lazy(() => import('./components/Products'));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs'));
const Showcase = React.lazy(() => import('./components/Showcase'));
const Contact = React.lazy(() => import('./components/Contact'));
const CTA = React.lazy(() => import('./components/CTA'));
const Footer = React.lazy(() => import('./components/Footer'));
const FAQ = React.lazy(() => import('./components/FAQ'));

// PERF: Lazy load route pages (separate pages, never needed on initial load)
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const BlogListing = React.lazy(() => import('./pages/BlogListing'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

const HomePage: React.FC = () => {
  return (
    <main className="bg-white w-full">
      <Hero />
      <Suspense fallback={null}>
        <About />
        <ImageStackSection />
        <StatsSection />
        <Service />
        <DigitalServices />
        <Products />
        <WhyChooseUs />
        <Showcase />
        <FAQ />
        <Contact />
        <CTA />
        <Footer />
      </Suspense>
    </main>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Development mode: blockages removed
  }, []);

  return (
    <div className="antialiased">
      <SmoothScroll />
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

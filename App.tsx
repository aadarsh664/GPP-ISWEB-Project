
import React, { useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/Hero';
import CookieConsent from './components/CookieConsent';
import About from './components/About';
import ImageStackSection from './components/ImageStackSection';
import StatsSection from './components/StatsSection';
import Service from './components/Service';
import DigitalServices from './components/DigitalServices';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

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
      <CookieConsent />
    </div>
  );
};

export default App;


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

  // Global Loader Logic (Zero-FOUC Shutter Reveal with 0-100% Counter)
  useEffect(() => {
    const loaderEl = document.getElementById('global-loader');
    if (!loaderEl) return;

    const loaderState = (window as any).__LOADER_STATE;
    
    if (loaderState) {
      // React has mounted, bump to 40%
      loaderState.setTarget(40); 
    }

    // Minimum display time to prevent awkward flashing on fast networks
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 600));
    
    // Wait for all critical assets (images, fonts, stylesheets) to load
    const windowLoadPromise = new Promise(resolve => {
      if (document.readyState === 'complete') {
        if (loaderState) loaderState.setTarget(70);
        resolve(true);
      } else {
        window.addEventListener('load', () => {
          if (loaderState) loaderState.setTarget(70);
          resolve(true);
        });
      }
    });

    Promise.all([minTimePromise, windowLoadPromise]).then(() => {
      if (loaderState) {
        // We are completely ready, trigger the final stretch to 100%
        loaderState.setTarget(100);
        
        // Only shutter up when the counter literally displays 100%
        loaderState.onComplete = () => {
          loaderEl.classList.add('shutter-up');
          setTimeout(() => {
            loaderEl.style.display = 'none';
            window.dispatchEvent(new CustomEvent('hero-entrance-start'));
          }, 600); // 600ms matches the CSS transition duration
        };
      } else {
        // Fallback just in case
        loaderEl.classList.add('shutter-up');
        setTimeout(() => {
          loaderEl.style.display = 'none';
          window.dispatchEvent(new CustomEvent('hero-entrance-start'));
        }, 600);
      }
    });
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

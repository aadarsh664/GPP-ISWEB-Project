
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Service from './components/Service';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

const HomePage: React.FC = () => {
  return (
    <main className="bg-white">
      <Hero />
      <About />
      <Service />
      <Products />
      <WhyChooseUs />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
};

const App: React.FC = () => {
  return (
    <div className="antialiased">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
      </Routes>
    </div>
  );
};

export default App;

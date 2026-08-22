import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ConsentSettings = {
  analytics: boolean;
  advertising: boolean;
};

// GA4 Measurement ID provided by user
const GA_TRACKING_ID = 'G-0K503XM93Z';

// Helper to inject GA script only if consent is given and script doesn't exist
const loadAnalyticsScript = () => {
  if (document.getElementById('ga-script-manager')) return;

  const script1 = document.createElement('script');
  script1.id = 'ga-script-manager';
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.id = 'ga-script-config';
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      'anonymize_ip': true // Added privacy layer
    });
  `;
  document.head.appendChild(script2);
};

// Meta Pixel ID provided by user
const META_PIXEL_ID = '1072990775314621';

const loadAdvertisingScript = () => {
  if (document.getElementById('meta-pixel-script')) return;
  
  const script = document.createElement('script');
  script.id = 'meta-pixel-script';
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
};

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  
  const [settings, setSettings] = useState<ConsentSettings>({
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const savedConsent = localStorage.getItem('gpp_cookie_consent');
    
    if (!savedConsent) {
      timer = setTimeout(() => setIsVisible(true), 1500);
    } else {
      // If already saved, parse it and load scripts if granted
      try {
        const parsed = JSON.parse(savedConsent);
        if (parsed.analytics_storage === 'granted') {
          loadAnalyticsScript();
        }
        if (parsed.ad_storage === 'granted') {
          loadAdvertisingScript();
        }
      } catch (e) {}
    }

    const handleOpenSettings = () => {
      const current = localStorage.getItem('gpp_cookie_consent');
      if (current) {
        try {
          const parsed = JSON.parse(current);
          setSettings({
            analytics: parsed.analytics_storage === 'granted',
            advertising: parsed.ad_storage === 'granted',
          });
        } catch (e) {}
      }
      setShowCustomize(true);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const saveConsent = (analytics: boolean, advertising: boolean) => {
    const consentChoice = {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: advertising ? 'granted' : 'denied',
      ad_user_data: advertising ? 'granted' : 'denied',
      ad_personalization: advertising ? 'granted' : 'denied',
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('gpp_cookie_consent', JSON.stringify(consentChoice));
    setIsVisible(false);
    
    // Conditionally Load Scripts Based on User's Choice Now
    if (analytics) {
      loadAnalyticsScript();
    }
    if (advertising) {
      loadAdvertisingScript();
    }
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleRejectAll = () => saveConsent(false, false);
  const handleSaveCustom = () => saveConsent(settings.analytics, settings.advertising);

  const Toggle = ({ label, description, checked, onChange, disabled = false }: any) => (
    <div className="flex items-start justify-between py-3 md:py-4 border-b border-white/10 last:border-0">
      <div className="pr-4">
        <h4 className="text-white text-sm md:text-base font-medium mb-1">{label}</h4>
        <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed">{description}</p>
      </div>
      <button 
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-[#FF6600]' : 'bg-slate-700'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 w-full z-[9999] p-3 md:p-5 pointer-events-none"
        >
          <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-[14px] shadow-2xl overflow-hidden pointer-events-auto">
            
            {/* Primary Banner View */}
            {!showCustomize ? (
              <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-white text-lg font-medium mb-1 tracking-tight">Your Privacy Matters</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    We use cookies to improve your experience, serve personalized content, and analyze our traffic. 
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 shrink-0">
                  <button 
                    onClick={() => setShowCustomize(true)}
                    className="px-4 py-2 rounded-full text-[11px] md:text-xs font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    Customize
                  </button>
                  <button 
                    onClick={handleRejectAll}
                    className="px-4 py-2 rounded-full text-[11px] md:text-xs font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    Reject Non-Essential
                  </button>
                  <button 
                    onClick={handleAcceptAll}
                    className="px-5 py-2 rounded-full text-[11px] md:text-xs font-medium text-black bg-white hover:bg-slate-200 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              /* Customize View */
              <div className="p-4 md:p-6">
                <div className="mb-4">
                  <h3 className="text-white text-lg font-medium mb-1 tracking-tight">Customize Cookie Preferences</h3>
                  <p className="text-slate-400 text-xs">
                    Essential cookies cannot be disabled as they are required for the website to function properly.
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-3 md:p-4 mb-5">
                  <Toggle 
                    label="Strictly Necessary"
                    description="Essential for the website to function properly. Cannot be disabled."
                    checked={true}
                    disabled={true}
                  />
                  <Toggle 
                    label="Analytics (GA4)"
                    description="Help us understand how visitors interact with our website anonymously."
                    checked={settings.analytics}
                    onChange={(val: boolean) => setSettings(s => ({ ...s, analytics: val }))}
                  />
                  <Toggle 
                    label="Advertising"
                    description="Used to track visitors across websites to display relevant ads."
                    checked={settings.advertising}
                    onChange={(val: boolean) => setSettings(s => ({ ...s, advertising: val }))}
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <button 
                    onClick={handleRejectAll}
                    className="px-4 py-2 rounded-full text-[11px] md:text-xs font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    Reject All
                  </button>
                  <button 
                    onClick={handleSaveCustom}
                    className="px-5 py-2 rounded-full text-[11px] md:text-xs font-medium text-black bg-white hover:bg-slate-200 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

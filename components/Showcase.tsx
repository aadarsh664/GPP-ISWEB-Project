import React, { useEffect, useRef } from 'react';

const Showcase: React.FC = () => {
  const desktopVidRef = useRef<HTMLVideoElement>(null);
  const mobileVidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = (ref: React.RefObject<HTMLVideoElement | null>) => {
      if (ref.current) {
        ref.current.defaultMuted = true;
        ref.current.muted = true;
        ref.current.setAttribute('playsinline', '');
        ref.current.play().catch(e => console.error("Showcase video play failed", e));
      }
    };
    
    // Slight delay to ensure DOM is ready and prioritize hero load
    const timer = setTimeout(() => {
      playVideo(desktopVidRef);
      playVideo(mobileVidRef);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="our-work" className="w-full bg-white pt-16 md:pt-24 flex flex-col items-center">
      {/* Full screen Video Wrapper - No Cropping/Masking, No Text */}
      <div className="w-full relative">
        {/* Desktop Video */}
        <video 
          ref={desktopVidRef}
          className="hidden md:block w-full h-auto" 
          loop 
          muted 
          playsInline
        >
          <source src="/ourwork/showcase_desktop.webm" type="video/webm" />
        </video>
        
        {/* Mobile Video */}
        <video 
          ref={mobileVidRef}
          className="block md:hidden w-full h-auto" 
          loop 
          muted 
          playsInline
        >
          <source src="/ourwork/showcase_mobile.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
};

export default Showcase;

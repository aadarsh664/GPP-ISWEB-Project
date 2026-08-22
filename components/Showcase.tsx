import React from 'react';

const Showcase: React.FC = () => {
  return (
    <section id="our-work" className="w-full bg-white pt-16 md:pt-24 flex flex-col items-center">
      {/* Full screen Video Wrapper - No Cropping/Masking, No Text */}
      <div className="w-full relative">
        {/* Desktop Video */}
        <video 
          className="hidden md:block w-full h-auto" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/ourwork/showcase_desktop.webm" type="video/webm" />
        </video>
        
        {/* Mobile Video */}
        <video 
          className="block md:hidden w-full h-auto" 
          autoPlay 
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

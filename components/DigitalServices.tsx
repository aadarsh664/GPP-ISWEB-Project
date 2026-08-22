import React from 'react';
import HoverImageReveal from './HoverImageReveal';
import FocusReveal from './FocusReveal';

const DIGITAL_SERVICES = [
  {
    title: "Graphic Designing",
    description: "Crafting premium visual layouts that perfectly elevate your global brand identity.",
    image: "/serviceimage/service05/illustrator.jpg"
  },
  {
    title: "Video Editing",
    description: "Cinematic post-production that transforms raw footage into compelling corporate stories.",
    image: "/serviceimage/service05/photoshop.jpg"
  },
  {
    title: "Ads & SEO",
    description: "Data-driven marketing strategies engineered to maximize your international reach and ROI.",
    image: "/serviceimage/service05/coreldraw.jpg"
  },
  {
    title: "Website & CRM",
    description: "Seamless web development and scalable management systems built for enterprise growth.",
    image: "/serviceimage/service05/webdesign.jpg"
  }
];

const DigitalServices: React.FC = () => {
  return (
    <section id="digital-services" className="w-full relative bg-white">
      {/* Dark Section Wrapper for Header Tracking */}
      <div id="digital-dark">
        <div id="digital-intro" className="relative w-full aspect-video bg-[#07247a] flex flex-col items-center justify-center overflow-hidden">
          <img 
            src="/serviceimage/new/digital.png" 
            alt="The Digital Blueprint" 
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          
          <div className="relative z-10 w-full px-4">
            <FocusReveal 
              text="Creative Services"
              className="text-white text-[11vw] sm:text-[13vw] font-medium tracking-tighter leading-[0.8] text-center w-full whitespace-nowrap"
              font={{ fontFamily: "'Helvetica Now Display', sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* Hover Image Reveal List */}
      <div className="w-full bg-[#f6f6f6] py-16 md:py-24">
        <HoverImageReveal 
          items={DIGITAL_SERVICES} 
          textColor="#000000"
          dimColor="rgba(0,0,0,0.3)"
          imageWidth={400}
          imageHeight={300}
        />
      </div>
    </section>
  );
};

export default DigitalServices;

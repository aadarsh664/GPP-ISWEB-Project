import React from 'react';
import HoverImageReveal from './HoverImageReveal';
import FocusReveal from './FocusReveal';

const PRINTING_SERVICES = [
  {
    title: "Offset Printing",
    description: "Absolute uniformity from standard runs to large-format volumes.",
    image: "/serviceimage/service01/heidelberg.jpg"
  },
  {
    title: "Digital Printing",
    description: "Rapid execution with uncompromising clarity for premium short-run assets.",
    image: "/serviceimage/service02/konica-minolta-accurio.jpg"
  },
  {
    title: "Flex Printing",
    description: "High-impact large format solutions engineered for ultimate global brand visibility.",
    image: "/serviceimage/service03/MIMAGE-M18S.jpg"
  },
  {
    title: "Screen Printing",
    description: "Specialized tactile finishes and ultra-durable inks for bespoke physical materials.",
    image: "/serviceimage/service04/1-color-manual-screen.jpg"
  }
];

const Service: React.FC = () => {
  return (
    <section id="service" className="w-full relative bg-white">
      {/* Dark Section Wrapper for Header Tracking */}
      <div id="service-dark">
        <div id="service-intro" className="relative w-full aspect-video bg-black flex flex-col items-center justify-center overflow-hidden">
          <img 
            src="/serviceimage/new/service.png" 
            alt="Tactile Execution Printing Press" 
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          
          <div className="relative z-10 w-full px-4">
            <FocusReveal 
              text="Commercial Printing"
              className="text-white text-[10vw] sm:text-[11vw] font-medium tracking-tighter leading-[0.8] text-center w-full whitespace-nowrap"
              font={{ fontFamily: "'Helvetica Now Display', sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* Hover Image Reveal List */}
      <div className="w-full bg-[#f6f6f6] py-16 md:py-24">
        <HoverImageReveal 
          items={PRINTING_SERVICES} 
          textColor="#000000"
          dimColor="rgba(0,0,0,0.3)"
          imageWidth={400}
          imageHeight={300}
        />
      </div>
    </section>
  );
};

export default Service;
